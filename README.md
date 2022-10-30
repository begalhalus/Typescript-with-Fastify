# Restapps Typescript

Restapps Typescript with Fastify

## Feature

- TypeOrm
- Typescript
- Fastify
- Migration With Data Schema
- Postgresql
- Auto Sync database
- Search (title, status, topic)

## Start Apps / Project

```
npm install

edit config database on ormconfig.json

npm run start or nodemon
```

## Auto Migrate Data To Postgresql

```
typeorm migration:create -n CreateAdminUser
npm start or nodemon
npm run migration:run

it's a magic :)
```

## Build Apps / Project

```
npm run prod
```

## Guideline-API

```
1. sort => sort=news_id (sample)
2. dir => dir=ASC => sort news_id ASC (sample)
3. dir => dir=DESC => sort news_id DESC (sample)
4. limit => default 10 => limit=10 (sample)
5. page => default 1 => page=1 (sample)
6. search => search=rahmadz (sample)


```

## Note: Status On API

```
API POST AND PATCH TOPIC OR NEWS can't if it's already available

1. status news (1 = draft, 2 = deleted, 3 = published)

```
