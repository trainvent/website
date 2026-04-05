Example [Next.js](https://nextjs.org) website deployed with GitHub Pages.

## GitHub Actions

This project publishes the static `out/` export with
[GitHub Actions](./.github/workflows/pages.yml).

The workflow:

1. installs dependencies with `npm ci`
1. builds the static site with `npm run build`
1. uploads `out/` as the Pages artifact
1. deploys on pushes to the default branch

## Building locally

To work locally with this project, you'll have to follow the steps below:

1. Fork, clone or download this project
1. Install dependencies: `npm install`
1. Preview your project: `npm run dev`
1. Add content

Read more at the Next.js [documentation](https://nextjs.org/docs).

## Base Path

The build reads an optional `BASE_PATH` environment variable from
[`next.config.mjs`](./next.config.mjs).

In GitHub Actions, `BASE_PATH` comes from the repository variable `BASE_PATH`.

Use:

1. empty `BASE_PATH` for a custom domain like `next.trainvent.com`
1. `BASE_PATH=/repository-name` for a project site like `username.github.io/repository-name`

## Troubleshooting

1. CSS is missing! That means two things:

   Either that you have wrongly set up the CSS URL in your templates, or
   your static generator has a configuration option that needs to be explicitly
   set in order to serve static assets under a relative URL.
