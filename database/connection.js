import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

const client = new MongoClient(MONGO_URI);

let db;

export async function connectDB() {
  if (db) {
    return db;
  }
  try {
    await client.connect();
    console.log("Conectado a MongoDB");
    db = client.db(DB_NAME);
    return db;
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) {
    throw new Error(
      "La base de datos no ha sido inicializada. Llama a connectDB primero."
    );
  }
  return db;
}
