# NYU Forum — Docs

Documentation site for NYU Forum. The source lives in this repository. The forum's
deployment workflow checks out this repository, builds the Wiki, and publishes its
static files alongside the forum frontend.

Built with [VitePress](https://vitepress.dev/).

## URLs

| URL                              | Served by                                        |
| -------------------------------- | ------------------------------------------------ |
| `https://nyuforum.com/`           | forum app (other repo)                           |
| `https://nyuforum.com/docs/`      | Wiki files in the forum's static deployment      |
| `https://nyuforum.com/docs/guide/getting-started.html` | Wiki page in that deployment |

## Local development

```sh
npm install
npm run docs:dev        # http://localhost:5174/docs/
```

Start the forum dev server separately, then open `/docs/` on its local address.
The forum proxies this path to the wiki dev server on port 5174; the forum navigation links to `/docs/`.

## Production build

```sh
npm run docs:build      # writes docs/.vitepress/dist
npm run docs:preview    # serve the build locally at http://localhost:4173/docs/
```

## How the `/docs/` mount point works

Two settings make the build usable under `/docs/`:

1. **`base: '/docs/'`** in `docs/.vitepress/config.mts` — every asset URL and every internal link is
   emitted with the `/docs/` prefix.
2. **`outDir: './.vitepress/dist/docs'`** in the same file — the built pages are nested inside a
   `docs/` folder. The forum deployment copies this folder to its own `dist/docs`.

`cleanUrls: false` keeps `.html` in links to document pages. The forum's static
server can then find those files without special rewrite rules. Directory indexes
still serve `/docs/` and `/docs/guide/`.

Changes to this repository reach `nyuforum.com` on the next frontend deployment.
Trigger the frontend workflow manually if the Wiki must update before the next
frontend push.

## Vercel project settings

`vercel.json` pins these, so the dashboard can stay on defaults:

- **Build Command:** `npm run docs:build`
- **Output Directory:** `docs/.vitepress/dist`
- **Install Command:** `npm install`
- **Node:** 20 or newer

`/` on this project's own domain redirects to `/docs/` so that the bare deployment URL is usable.

## Related

The forum repository's `.github/workflows/deploy-frontend.yml` builds and publishes
the Wiki with the frontend.
