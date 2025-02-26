# Client Gateway

## Dev

1. Clone the repo
2. Run `npm install` or `pnpm install`
3. Create a `.env` file based on the `.env.template` file
4. Execute `npm run start:dev` or `pnpm run start:dev`

## Nats

```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

## Prod

Execute:

```
docker build -f dockerfile.prod -t client-gateway .
```
