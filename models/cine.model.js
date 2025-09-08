import { getDB } from "../database/connection.js";
import { ObjectId } from "mongodb";

class CineModel {
  static async #getCollection() {
    const db = getDB();
    return db.collection("cines");
  }

  static async create(cine) {
    const collection = await this.#getCollection();
    const result = await collection.insertOne(cine);
    return result.insertedId;
  }

  static async getAll() {
    const collection = await this.#getCollection();
    return await collection.find().toArray();
  }

  static async getById(id) {
    const collection = await this.#getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  static async update(id, cine) {
    const collection = await this.#getCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: cine }
    );
    return result.matchedCount > 0;
  }

  static async delete(id) {
    const collection = await this.#getCollection();
    const db = getDB();
    const salasCount = await db
      .collection("salas")
      .countDocuments({ cine_id: new ObjectId(id) });
    if (salasCount > 0) {
      throw new Error("No se puede eliminar el cine porque tiene salas asociadas.");
    }
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

export default CineModel;
