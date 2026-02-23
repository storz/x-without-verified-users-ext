# X Without Verified Users

Browser extension that hides verified users on `x.com`.

## Behavior

- Runs only on `https://x.com/*`
- Uses `svg[data-testid="icon-verified"]` as the only verified signal
- Hides the closest user/post container that includes the icon
- No popup, no options page, no settings

## Quick Start

```bash
pnpm install
pnpm dev
```

## Scripts

| Command              | Description              |
| -------------------- | ------------------------ |
| `pnpm dev`           | Start dev mode (Chrome)  |
| `pnpm dev:firefox`   | Start dev mode (Firefox) |
| `pnpm build`         | Build for Chrome         |
| `pnpm build:firefox` | Build for Firefox        |
| `pnpm zip`           | Create distribution zip  |
| `pnpm typecheck`     | Run TypeScript check     |
| `pnpm lint`          | Run Oxlint               |
| `pnpm format`        | Run Oxfmt                |

## Structure

```
entrypoints/
└── content.ts                  # Router layer: content script
lib/
└── domain/
    └── verified-user-filter.ts # Domain layer: detection and hide logic
assets/
└── icon.svg
```

## Manual Validation

1. Open `https://x.com/home` with the extension enabled.
2. Check that verified users are hidden.
3. Scroll to load more posts and verify newly added verified users are hidden too.
