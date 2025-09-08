import { getDB } from "../database/connection.js";
import { ObjectId } from "mongodb";

class SalaModel {
  static async #getCollection() {
    const db = getDB();
    return db.collection("salas");
  }

  static async create(sala) {
    const collection = await this.#getCollection();
    const newSala = {
      ...sala,
      cine_id: new ObjectId(sala.cine_id),
    };
    const result = await collection.insertOne(newSala);
    return result.insertedId;
  }

  static async getAll() {
    const collection = await this.#getCollection();
    return await collection
      .aggregate([
        {
          $lookup: {
            from: "cines",
            localField: "cine_id",
            foreignField: "_id",
            as: "cineInfo",
          },
        },
        {
          $unwind: "$cineInfo",
        },
        {
          $project: {
            codigo: 1,
            numero_sillas: 1,
            cine_id: 1,
            "cineInfo.nombre": 1,
          },
        },
      ])
      .toArray();
  }

  static async getById(id) {
    const collection = await this.#getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  static async update(id, sala) {
    const collection = await this.#getCollection();

    const updateData = { ...sala };
    if (updateData.cine_id) {
      updateData.cine_id = new ObjectId(updateData.cine_id);
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    return result.matchedCount > 0;
  }

  static async delete(id) {
    const collection = await this.#getCollection();
    const db = getDB();
    const funcionesCount = await db
      .collection("funciones")
      .countDocuments({ sala_id: new ObjectId(id) });
    if (funcionesCount > 0) {
      throw new Error(
        "No se puede eliminar la sala porque tiene funciones asociadas."
      );
    }
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

export default SalaModel;
