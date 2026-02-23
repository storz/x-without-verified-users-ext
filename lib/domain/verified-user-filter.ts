export const VERIFIED_ICON_SELECTOR = 'svg[data-testid="icon-verified"]' as const;
export const HIDDEN_MARKER_ATTR = "data-xwv-hidden" as const;

const HIDE_TARGET_SELECTORS = [
  "article",
  '[data-testid="UserCell"]',
  '[data-testid="cellInnerDiv"]',
] as const;

const getVerifiedIcons = (root: ParentNode): SVGElement[] => {
  const icons = Array.from(root.querySelectorAll<SVGElement>(VERIFIED_ICON_SELECTOR));

  if (root instanceof Element && root.matches(VERIFIED_ICON_SELECTOR)) {
    icons.unshift(root as SVGElement);
  }

  return icons;
};

export const findHideTarget = (verifiedIcon: Element): HTMLElement | null => {
  for (const selector of HIDE_TARGET_SELECTORS) {
    const target = verifiedIcon.closest<HTMLElement>(selector);
    if (target) return target;
  }

  return null;
};

export const hideVerifiedUsers = (root: ParentNode): number => {
  let hiddenCount = 0;

  for (const icon of getVerifiedIcons(root)) {
    const target = findHideTarget(icon);
    if (!target || target.getAttribute(HIDDEN_MARKER_ATTR) === "1") {
      continue;
    }

    target.style.display = "none";
    target.setAttribute(HIDDEN_MARKER_ATTR, "1");
    hiddenCount += 1;
  }

  return hiddenCount;
};
