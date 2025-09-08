import PeliculaModel from "../models/pelicula.model.js";
import {
  PeliculaResponseDTO,
  CreatePeliculaDTO,
} from "../dtos/pelicula.dto.js";

class PeliculaController {
  static async createPelicula(req, res) {
    try {
      const createPeliculaDTO = new CreatePeliculaDTO(req.body);
      const peliculaId = await PeliculaModel.create(createPeliculaDTO);
      res
        .status(201)
        .json({ message: "Película creada exitosamente", peliculaId });
    } catch (error) {
      console.error(
        "Error detallado al crear la película:",
        JSON.stringify(error, null, 2)
      ); // Log the full error as a string
      if (error.code === 11000) {
        return res
          .status(409)
          .json({
            message: `El código de película '${req.body.codigo}' ya existe.`,
          });
      }
      res
        .status(500)
        .json({ message: "Error al crear la película", error: error.message });
    }
  }

  static async getAllPeliculas(req, res) {
    try {
      const peliculas = await PeliculaModel.getAll();
      const peliculaResponseDTOs = peliculas.map(
        (pelicula) => new PeliculaResponseDTO(pelicula)
      );
      res.status(200).json(peliculaResponseDTOs);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al obtener las películas",
          error: error.message,
        });
    }
  }

  static async getPeliculaById(req, res) {
    try {
      const pelicula = await PeliculaModel.getById(req.params.id);
      if (!pelicula) {
        return res.status(404).json({ message: "Película no encontrada" });
      }
      const peliculaResponseDTO = new PeliculaResponseDTO(pelicula);
      res.status(200).json(peliculaResponseDTO);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al obtener la película",
          error: error.message,
        });
    }
  }

  static async updatePelicula(req, res) {
    try {
      const wasUpdated = await PeliculaModel.update(req.params.id, req.body);
      if (!wasUpdated) {
        return res.status(404).json({ message: "Película no encontrada" });
      }
      res.status(200).json({ message: "Película actualizada exitosamente" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al actualizar la película",
          error: error.message,
        });
    }
  }

  static async deletePelicula(req, res) {
    try {
      const wasDeleted = await PeliculaModel.delete(req.params.id);
      if (!wasDeleted) {
        return res.status(404).json({ message: "Película no encontrada" });
      }
      res.status(200).json({ message: "Película eliminada exitosamente" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al eliminar la película",
          error: error.message,
        });
    }
  }
}

export default PeliculaController;