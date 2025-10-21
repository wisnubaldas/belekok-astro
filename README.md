# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Integrated React

Integrated React into the SSR build and wired up a default layout plus component.

- [astro.config.mjs:3](astro.config.mjs) imports @astrojs/react and registers the integration alongside the Node adapter so React islands can render in SSR.
- [src/layouts/BaseLayout.astro:1](src\layouts\BaseLayout.astro) adds a reusable layout providing HTML scaffolding with configurable title/description and slot-based content.
- [src/components/WelcomeBanner.jsx:1](src\components\WelcomeBanner.jsx) introduces an interactive React banner with a counter to validate client-side hydration.
- [src/pages/index.astro:2](src\pages\index.astro) switches the homepage to use the new layout and mounts WelcomeBanner via client:load.

> Tested with npm run build.
>
> Next steps: 1) npm run dev to start the SSR dev server.

## Template

[materialize](https://www.mediafire.com/file/k2dg8p2e97wez94/materialize-1390.rar/file)

## Auth

Menerapkan alur masuk yang didukung FastAPI ditambah perlindungan SSR.

- [src/js/auth.js:1-123](src\js\auth.js) now provides cookie-based auth helpers (login, logout, getAccessToken) with localized error messaging that call the FastAPI /auth endpoints.
- [src/lib/auth/config.ts:1-31](src\lib\auth\config.ts) centralizes auth configuration (API base URL, cookie name/max-age, redirect targets, shared error copy).
- [src/pages/auth/login.astro:1-292](src\pages\auth\login.astro) updates the form to submit email/password, shows inline errors, and adds a module script that calls the new helpers and redirects on success.
- [src/middleware.ts:1-105](src\middleware.ts) introduces an Astro middleware that skips static assets, verifies the JWT via /auth/verify, redirects unauthenticated users to /auth/login, and keeps logged-in users away from the login page.

Tested with npm run build.

Next steps:

1. Set PUBLIC_AUTH_API_BASE_URL in your .env when the FastAPI service isn’t on http://127.0.0.1:8000.
2. Confirm FastAPI CORS settings allow credentials from the Astro origin so the cookie survives cross-origin requests.
