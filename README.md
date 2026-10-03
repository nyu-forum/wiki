# NYU Forum — Docs

Documentation site for NYU Forum. This repository is **completely independent** from the forum
application repository: separate source, separate `package.json`, separate Vercel project, no git
submodules. The two are connected only by an HTTP reverse proxy.

Built with [VitePress](https://vitepress.dev/).

## URLs

| URL                              | Served by                                        |
| -------------------------------- | ------------------------------------------------ |
| `https://nyuforum.com/`           | forum app (other repo)                           |
| `https://nyuforum.com/docs/`      | this project, proxied by the forum's `vercel.json` |
| `https://nyuforum.com/docs/guide/getting-started` | this project, proxied            |
| `https://<this-project>.vercel.app/docs/` | this project, directly                  |

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

Two settings cooperate so that every URL under `/docs/` means exactly the same thing on the forum's
domain and on this project's own domain:

1. **`base: '/docs/'`** in `docs/.vitepress/config.mts` — every asset URL and every internal link is
   emitted with the `/docs/` prefix.
2. **`outDir: './.vitepress/dist/docs'`** in the same file — the built pages are nested inside a
   `docs/` folder of the output directory, and `vercel.json` publishes `docs/.vitepress/dist`.

Because of (2), the hosting platform resolves `/docs/...` against the real files, so this project
serves the docs correctly at `https://<this-project>.vercel.app/docs/` on its own — including on
preview deployments — and needs no path rewriting. The forum then only has to forward
`/docs/(.*)` to the same `/docs/(.*)` path here, and both sides agree.

`cleanUrls: true` (VitePress) plus `"cleanUrls": true` (`vercel.json`) are what turn
`/docs/guide/getting-started` into `docs/guide/getting-started.html` without a redirect.

## Vercel project settings

`vercel.json` pins these, so the dashboard can stay on defaults:

- **Build Command:** `npm run docs:build`
- **Output Directory:** `docs/.vitepress/dist`
- **Install Command:** `npm install`
- **Node:** 20 or newer

`/` on this project's own domain redirects to `/docs/` so that the bare deployment URL is usable.

## Related

The forum repository's `vercel.json` owns the `/docs/(.*)` rewrite. If this project's domain ever
changes, update the rewrite destination there — that is the single coupling point between the two
repositories.
