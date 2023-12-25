# Nuxt 3 Minimal Starter

Look at the
[Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to
learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## End 2 End test with Cypress

First install Cypress, to initialize cypress.config.js:

```bash
# npm
npm i -D cypress
```

Check out the [installing guide](https://docs.cypress.io/guides/getting-started/installing-cypress)

Than open cypress:

```bash
# npx
npx cypress open
```
## ESlint and prettier

Initialize ESlint

```bash
#npm
npm i -D eslint
```

Start linting:

```bash
#npm
npm run lint
```

Start prettier

```bash
#npm
npm run prettier-format
```

Check out the
[deployment documentation](https://nuxt.com/docs/getting-started/deployment) for
more information.

## Test with Vitest

Maybe you have to install Vitest as a devDependency again:

```bash
npm i -D vitest
```

Run unit tests for all test files:

```bash
# npm
npm run vitest
```

Run tests for one or possibly more

```bash
# npm
npm run vitest path/file
```

Check out the [cli guide](https://vitest.dev/guide/cli.html) for more.
