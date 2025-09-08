import FuncionModel from "../models/funcion.model.js";
import {
  FuncionResponseDTO,
  CreateFuncionDTO,
} from "../dtos/funcion.dto.js";

class FuncionController {
  static async createFuncion(req, res) {
    try {
      const createFuncionDTO = new CreateFuncionDTO(req.body);
      const funcionId = await FuncionModel.create(createFuncionDTO);
      res
        .status(201)
        .json({ message: "Función creada exitosamente", funcionId });
    } catch (error) {
      if (error.message.includes("cruce")) {
        return res.status(400).json({ message: error.message });
      }
      res
        .status(500)
        .json({ message: "Error al crear la función", error: error.message });
    }
  }

  static async getFunciones(req, res) {
    try {
      const funciones = await FuncionModel.getAll();
      const funcionResponseDTOs = funciones.map(
        (funcion) => new FuncionResponseDTO(funcion)
      );
      res.status(200).json(funcionResponseDTOs);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al obtener las funciones",
          error: error.message,
        });
    }
  }

  static async getFuncionById(req, res) {
    try {
      const funcion = await FuncionModel.getById(req.params.id);
      if (!funcion) {
        return res.status(404).json({ message: "Función no encontrada" });
      }
      const funcionResponseDTO = new FuncionResponseDTO(funcion);
      res.status(200).json(funcionResponseDTO);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al obtener la función",
          error: error.message,
        });
    }
  }

  static async updateFuncion(req, res) {
    try {
      const wasUpdated = await FuncionModel.update(req.params.id, req.body);
      if (!wasUpdated) {
        return res.status(404).json({ message: "Función no encontrada" });
      }
      res.status(200).json({ message: "Función actualizada exitosamente" });
    } catch (error) {
      if (error.message.includes("cruce")) {
        return res.status(400).json({ message: error.message });
      }
      res
        .status(500)
        .json({
          message: "Error al actualizar la función",
          error: error.message,
        });
    }
  }

  static async deleteFuncion(req, res) {
    try {
      const wasDeleted = await FuncionModel.delete(req.params.id);
      if (!wasDeleted) {
        return res.status(404).json({ message: "Función no encontrada" });
      }
      res.status(200).json({ message: "Función eliminada exitosamente" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al eliminar la función",
          error: error.message,
        });
    }
  }

  static async getFuncionesDisponibles(req, res) {
    try {
      const { cineId, peliculaId } = req.query;
      if (!cineId || !peliculaId) {
        return res.status(400).json({
          message: "Los parámetros 'cineId' y 'peliculaId' son requeridos.",
        });
      }
      const funciones = await FuncionModel.getFuncionesDisponibles(
        cineId,
        peliculaId
      );
      const funcionResponseDTOs = funciones.map(
        (funcion) => new FuncionResponseDTO(funcion)
      );
      res.status(200).json(funcionResponseDTOs);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las funciones disponibles.",
        error: error.message,
      });
    }
  }
}

export default FuncionController;