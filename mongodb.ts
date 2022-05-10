import { MongoClient } from "https://deno.land/x/mongo@v0.29.4/mod.ts";

const MONGO_URL = 'mongodb://127.0.0.1:27017';

const client = new MongoClient();
await client.connect(MONGO_URL);

console.log('mongoDb connected');

const db = client.database('deno');

export default db;