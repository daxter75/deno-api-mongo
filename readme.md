# Deno REST API

> This is a simple REST API using Deno.

## Run

```
deno run --allow-net server.ts
```

## Routes

```
BASE     http://localhost:5000

GET      /api/v1/activities
GET      /api/v1/activities/:id
POST     /api/v1/activities
PUT      /api/v1/activities/:id
DELETE   /api/v1/activities/:id
```