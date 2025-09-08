import { getDB } from "../database/connection.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

class UserModel {
  static async #getCollection() {
    const db = getDB();
    return db.collection("usuarios");
  }

  static async create(user) {
    const collection = await this.#getCollection();
    const hashedPassword = await bcrypt.hash(
      user.password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS)
    );
    const result = await collection.insertOne({
      ...user,
      password: hashedPassword,
    });
    return result.insertedId;
  }

  static async getAll() {
    const collection = await this.#getCollection();
    return await collection.find({}, { projection: { password: 0 } }).toArray();
  }

  static async getById(id) {
    const collection = await this.#getCollection();
    return await collection.findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    );
  }

  static async findByEmail(email) {
    const collection = await this.#getCollection();
    return await collection.findOne({ email });
  }

  static async update(id, user) {
    const collection = await this.#getCollection();
    if (user.password) {
      user.password = await bcrypt.hash(
        user.password,
        parseInt(process.env.BCRYPT_SALT_ROUNDS)
      );
    }
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: user }
    );
    return result.matchedCount > 0;
  }

  static async delete(id) {
    const collection = await this.#getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

export default UserModel;
