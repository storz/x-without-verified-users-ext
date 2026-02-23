# X Without Verified Users

Chrome extension that hides verified users on `x.com`.

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

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev mode (Chrome) |
| `pnpm dev:firefox` | Start dev mode (Firefox) |
| `pnpm build` | Build for Chrome |
| `pnpm build:firefox` | Build for Firefox |
| `pnpm zip` | Create distribution zip |
| `pnpm typecheck` | Run TypeScript check |
| `pnpm lint` | Run Oxlint |

## Adding Entrypoints

WXT automatically detects entrypoints in the `entrypoints/` directory:

- `popup/` - Popup UI
- `options/` - Options page
- `background.ts` - Service worker
- `content.ts` - Content script

See [WXT documentation](https://wxt.dev/) for more details.
