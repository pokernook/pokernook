# PokerNook

## App deployment

```bash
doctl apps create --spec .do/app.yaml
```

## Monorepo structure

| Project            | Description     |
| ------------------ | --------------- |
| [graphql](graphql) | GraphQL API     |
| [web](web)         | Next.js web app |

## Development setup

Install

- Node.js
- Docker Desktop
- VS Code

Then run

```bash
npm install # From the root directory
```

## Contributing

- Pushes to `main` will get deployed to production, so all development should be done in dedicated branches.

- Checkout a topic branch from the relevant branch (i.e. `main`), and merge back against that branch.
