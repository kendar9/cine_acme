import { getDB } from "../database/connection.js";
import { ObjectId } from "mongodb";

class FuncionModel {
  static async #getCollection() {
    const db = getDB();
    return db.collection("funciones");
  }

  static async #verificarCruceFunciones(funcion) {
    const db = getDB();
    const { sala_id, fecha_hora, pelicula_id } = funcion;

    const pelicula = await db
      .collection("peliculas")
      .findOne({ _id: new ObjectId(pelicula_id) });
    if (!pelicula)
      throw new Error("Película no encontrada para verificar cruce.");
    const duracionPelicula = pelicula.duracion;

    const inicioNuevaFuncion = new Date(fecha_hora);
    const finNuevaFuncion = new Date(
      inicioNuevaFuncion.getTime() + duracionPelicula * 60000
    );

    const funcionesExistentes = await db
      .collection("funciones")
      .find({ sala_id: new ObjectId(sala_id) })
      .toArray();

    for (const existente of funcionesExistentes) {
      if (funcion._id && existente._id.equals(funcion._id)) continue;

      const peliculaExistente = await db
        .collection("peliculas")
        .findOne({ _id: new ObjectId(existente.pelicula_id) });
      const duracionExistente = peliculaExistente.duracion;
      const inicioExistente = new Date(existente.fecha_hora);
      const finExistente = new Date(
        inicioExistente.getTime() + duracionExistente * 60000
      );

      if (
        inicioNuevaFuncion < finExistente &&
        finNuevaFuncion > inicioExistente
      ) {
        return true;
      }
    }

    return false;
  }

  static async create(funcion) {
    const collection = await this.#getCollection();
    const newFuncion = {
      ...funcion,
      cine_id: new ObjectId(funcion.cine_id),
      sala_id: new ObjectId(funcion.sala_id),
      pelicula_id: new ObjectId(funcion.pelicula_id),
      fecha_hora: new Date(funcion.fecha_hora),
    };
    if (await this.#verificarCruceFunciones(newFuncion)) {
      throw new Error(
        "Error: La función se cruza con un horario existente en la misma sala."
      );
    }
    const result = await collection.insertOne(newFuncion);
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
            as: "cine",
          },
        },
        {
          $lookup: {
            from: "salas",
            localField: "sala_id",
            foreignField: "_id",
            as: "sala",
          },
        },
        {
          $lookup: {
            from: "peliculas",
            localField: "pelicula_id",
            foreignField: "_id",
            as: "pelicula",
          },
        },
        { $unwind: "$cine" },
        { $unwind: "$sala" },
        { $unwind: "$pelicula" },
        {
          $project: {
            fecha_hora: 1,
            "cine.nombre": 1,
            "sala.codigo": 1,
            "pelicula.titulo": 1,
            cine_id: 1,
            sala_id: 1,
            pelicula_id: 1,
          },
        },
      ])
      .toArray();
  }

  static async getById(id) {
    const collection = await this.#getCollection();
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  static async update(id, funcion) {
    const collection = await this.#getCollection();
    const updatedFuncion = {
      _id: new ObjectId(id),
      ...funcion,
      cine_id: new ObjectId(funcion.cine_id),
      sala_id: new ObjectId(funcion.sala_id),
      pelicula_id: new ObjectId(funcion.pelicula_id),
      fecha_hora: new Date(funcion.fecha_hora),
    };
    if (await this.#verificarCruceFunciones(updatedFuncion)) {
      throw new Error(
        "Error: La función se cruza con un horario existente en la misma sala."
      );
    }
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedFuncion }
    );
    return result.matchedCount > 0;
  }

  static async delete(id) {
    const collection = await this.#getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  static async getFuncionesDisponibles(cineId, peliculaId) {
    const collection = await this.#getCollection();
    return await collection
      .find({
        cine_id: new ObjectId(cineId),
        pelicula_id: new ObjectId(peliculaId),
        fecha_hora: { $gte: new Date() },
      })
      .toArray();
  }
}

export default FuncionModel;
