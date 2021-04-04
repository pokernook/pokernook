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
