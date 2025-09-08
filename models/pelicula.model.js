import { getDB } from "../database/connection.js";
import { ObjectId } from "mongodb";

class PeliculaModel {
  static async #getCollection() {
    const db = getDB();
    return db.collection("peliculas");
  }

  static async create(pelicula) {
    const collection = await this.#getCollection();
    const result = await collection.insertOne(pelicula);
    return result.insertedId;
  }

  static async getAll() {
    const collection = await this.#getCollection();
    return await collection.find({}).toArray();
  }

  static async getById(id) {
    const collection = await this.#getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  static async update(id, pelicula) {
    const collection = await this.#getCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: pelicula }
    );
    return result.matchedCount > 0;
  }

  static async delete(id) {
    const collection = await this.#getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

export default PeliculaModel;
