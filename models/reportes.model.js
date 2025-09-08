import { getDB } from "../database/connection.js";
import { ObjectId } from "mongodb";

class ReportesModel {
  static async #getCollection(collectionName) {
    const db = getDB();
    return db.collection(collectionName);
  }

  static async getOcupacionSalas() {
    const funciones = await this.#getCollection("funciones");
    return await funciones
      .aggregate([
        {
          $lookup: {
            from: "salas",
            localField: "sala_id",
            foreignField: "_id",
            as: "sala",
          },
        },
        { $unwind: "$sala" },
        {
          $group: {
            _id: { sala_id: "$sala._id", sala_codigo: "$sala.codigo" },
            totalFunciones: { $sum: 1 },
          },
        },
        { $sort: { totalFunciones: -1 } },
      ])
      .toArray();
  }

  static async getPeliculasMasVistas() {
    const funciones = await this.#getCollection("funciones");
    return await funciones
      .aggregate([
        {
          $lookup: {
            from: "peliculas",
            localField: "pelicula_id",
            foreignField: "_id",
            as: "pelicula",
          },
        },
        { $unwind: "$pelicula" },
        {
          $group: {
            _id: {
              pelicula_id: "$pelicula._id",
              pelicula_titulo: "$pelicula.titulo",
            },
            vistas: { $sum: 1 },
          },
        },
        { $sort: { vistas: -1 } },
      ])
      .toArray();
  }

  static async getHorariosPico() {
    const funciones = await this.#getCollection("funciones");
    return await funciones
      .aggregate([
        {
          $addFields: {
            hora: { $hour: "$fecha_hora" },
          },
        },
        {
          $group: {
            _id: "$hora",
            cantidad: { $sum: 1 },
          },
        },
        { $sort: { cantidad: -1 } },
      ])
      .toArray();
  }

  static async getFuncionesDisponibles(cineNombre, peliculaTitulo) {
    const funciones = await this.#getCollection("funciones");
    const match = {};
    if (cineNombre) {
      match["cine.nombre"] = cineNombre;
    }
    if (peliculaTitulo) {
      match["pelicula.titulo"] = peliculaTitulo;
    }

    return await funciones
      .aggregate([
        {
          $lookup: {
            from: "peliculas",
            localField: "pelicula_id",
            foreignField: "_id",
            as: "pelicula",
          },
        },
        { $unwind: "$pelicula" },
        {
          $lookup: {
            from: "salas",
            localField: "sala_id",
            foreignField: "_id",
            as: "sala",
          },
        },
        { $unwind: "$sala" },
        {
          $lookup: {
            from: "cines",
            localField: "sala.cine_id",
            foreignField: "_id",
            as: "cine",
          },
        },
        { $unwind: "$cine" },
        { $match: match },
        {
          $project: {
            _id: "$_id",
            pelicula_titulo: "$pelicula.titulo",
            cine_nombre: "$cine.nombre",
            sala_codigo: "$sala.codigo",
            fecha_hora: "$fecha_hora",
          },
        },
      ])
      .toArray();
  }

  static async getPeliculasVigentes(cineNombre, fecha) {
    const funciones = await this.#getCollection("funciones");
    const fechaObj = new Date(fecha);

    return await funciones
      .aggregate([
        {
          $lookup: {
            from: "salas",
            localField: "sala_id",
            foreignField: "_id",
            as: "sala",
          },
        },
        { $unwind: "$sala" },
        {
          $lookup: {
            from: "cines",
            localField: "sala.cine_id",
            foreignField: "_id",
            as: "cine",
          },
        },
        { $unwind: "$cine" },
        {
          $match: {
            "cine.nombre": cineNombre,
            fecha_hora: {
              $gte: new Date(fechaObj.setHours(0, 0, 0, 0)),
              $lt: new Date(fechaObj.setHours(23, 59, 59, 999)),
            },
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
        { $unwind: "$pelicula" },
        {
          $group: {
            _id: "$pelicula_id",
            titulo: { $first: "$pelicula.titulo" },
            genero: { $first: "$pelicula.genero" },
            duracion: { $first: "$pelicula.duracion" },
            en_cartelera: { $first: "$pelicula.en_cartelera" },
          },
        },
      ])
      .toArray();
  }
}

export default ReportesModel;
