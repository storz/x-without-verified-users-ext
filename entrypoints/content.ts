import { hideVerifiedUsers } from "../lib/domain/verified-user-filter";

const isScanRoot = (node: Node): node is ParentNode =>
  node instanceof Element || node instanceof DocumentFragment;

export default defineContentScript({
  matches: ["*://x.com/*"],
  runAt: "document_idle",
  main() {
    const pendingRoots = new Set<ParentNode>();
    let rafId: number | undefined;

    const flush = () => {
      rafId = undefined;
      const roots = Array.from(pendingRoots);
      pendingRoots.clear();

      for (const root of roots) {
        hideVerifiedUsers(root);
      }
    };

    const enqueueScan = (root: ParentNode) => {
      pendingRoots.add(root);
      if (rafId !== undefined) return;
      rafId = window.requestAnimationFrame(flush);
    };

    enqueueScan(document);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes) {
          if (isScanRoot(addedNode)) {
            enqueueScan(addedNode);
          }
        }
      }
    });

    const startObserver = () => {
      if (!document.body) return;
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    };

    if (document.body) {
      startObserver();
    } else {
      window.addEventListener("DOMContentLoaded", startObserver, { once: true });
    }

    window.addEventListener(
      "beforeunload",
      () => {
        observer.disconnect();
        if (rafId !== undefined) {
          window.cancelAnimationFrame(rafId);
        }
      },
      { once: true },
    );
  },
});
