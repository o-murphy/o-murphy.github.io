# o-murphy.github.io

Personal portfolio site of Dmytro Yaroshenko, built with [Next.js](https://nextjs.org) (App Router, static export) and deployed to GitHub Pages at [o-murphy.net](https://o-murphy.net).

The site is data-driven: page copy, navigation, social links, and project cards live in [`portfolio.json`](portfolio.json), while GitHub activity (pinned repos, contributed organizations, issues, pull requests) is pulled at build time via [`fetcher.mjs`](fetcher.mjs) using the GitHub GraphQL API.

## Tech stack

- Next.js 16 (Turbopack, `output: 'export'` static export)
- React 19, TypeScript
- Tailwind CSS 4
- react-markdown + remark-gfm + rehype-raw (renders project READMEs fetched from GitHub)
- Iconify / FontAwesome / simple-icons for icons, Mermaid for diagrams in markdown content

## Getting Started

1. Install dependencies:

    ```bash
    yarn install
    ```

2. Create a `.env` file in the project root with a GitHub token (used to fetch pinned projects, orgs, issues and PRs via the GraphQL API):

    ```bash
    GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
    GITHUB_USERNAME=your-github-username
    ```

    Any token with public read access works, e.g. `gh auth token` if you use the GitHub CLI.

3. Run the dev server:

    ```bash
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to see the result.

## Available commands

Besides the standard Next.js scripts (`dev`, `build`, `start`, `lint`), this project adds:

| Command             | Description                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------ |
| `yarn fetch:data`   | Runs [`fetcher.mjs`](fetcher.mjs) to pull fresh GitHub data into `public/data/*.json`.     |
| `yarn setup`        | Creates the `public/data` directory (only needed if it was removed, e.g. by `yarn clean`). |
| `yarn clean`        | Removes `.next`, `out`, and `public/data`.                                                 |
| `yarn deploy`       | Fetches fresh GitHub data and builds the static site (`yarn fetch:data && yarn build`).    |
| `yarn format`       | Formats the codebase with Prettier.                                                        |
| `yarn format:check` | Checks formatting without writing changes.                                                 |

`prebuild` and `postbuild` hooks run automatically as part of `yarn build`/`yarn deploy` — you don't need to call them directly:

- **prebuild**: runs `fetch:data`, then copies the root `portfolio.json` into `public/data/portfolio.json` so both the fetched GitHub data and the hand-written content live under `public/data` before the build starts.
- **postbuild**: creates `out/.nojekyll` so GitHub Pages serves the `_next` directory correctly.

Next's static export (`output: 'export'`) automatically copies everything in `public/` — including the generated `public/data/*.json` — into `out/` during `yarn build`; no manual copy step is required.

## Configuring content

- **Site copy, links, projects**: edit [`portfolio.json`](portfolio.json) — sections include `person`, `about`, `navLinks`, `socialLinks`, `contacts`, `artLinks`, and `projects`.
- **Standalone markdown pages**: entries in `portfolio.json`'s `markdown` array (`{ "name", "url" }`) each generate a static page at `/md/<slugified-name>`, which fetches and renders the raw markdown from `url` at runtime (e.g. `/md/ballistics-lab` renders the Ballistics Lab README).
- **GitHub data filtering**: `portfolio.json`'s `githubFetch` section controls what `fetcher.mjs` excludes from the fetched data:

    ```json
    "githubFetch": {
        "hideRepos": ["RepoToHide"],
        "hideOrgs": ["OrgLoginToHide"]
    }
    ```

    `hideRepos` filters out pull requests/issues belonging to those repositories; `hideOrgs` filters out contributed organizations by login.

## Deployment

Pushes to `main`/`master`, a daily cron, or a manual trigger run [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which installs dependencies, runs `yarn build` (fetching fresh GitHub data and producing the static export in `out/`), and publishes `out/` to the `gh-pages` branch via `peaceiris/actions-gh-pages`. The custom domain is set via the `CNAME` file written during the workflow.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## License

[MIT](LICENSE)
