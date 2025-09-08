import CineModel from "../models/cine.model.js";
import { CineResponseDTO, CreateCineDTO } from "../dtos/cine.dto.js";

class CineController {
  static async createCine(req, res) {
    try {
      const createCineDTO = new CreateCineDTO(req.body);
      const cineId = await CineModel.create(createCineDTO);
      res
        .status(201)
        .json({ message: "Cine creado exitosamente", cineId });
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: `El código de cine '${req.body.codigo}' ya existe.` });
      }
      res
        .status(500)
        .json({ message: "Error al crear el cine", error: error.message });
    }
  }

  static async getCines(req, res) {
    try {
      const cines = await CineModel.getAll();
      const cineResponseDTOs = cines.map((cine) => new CineResponseDTO(cine));
      res.status(200).json(cineResponseDTOs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los cines", error: error.message });
    }
  }

  static async getCineById(req, res) {
    try {
      const cine = await CineModel.getById(req.params.id);
      if (!cine) {
        return res.status(404).json({ message: "Cine no encontrado" });
      }
      const cineResponseDTO = new CineResponseDTO(cine);
      res.status(200).json(cineResponseDTO);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener el cine", error: error.message });
    }
  }

  static async updateCine(req, res) {
    try {
      const wasUpdated = await CineModel.update(req.params.id, req.body);
      if (!wasUpdated) {
        return res.status(404).json({ message: "Cine no encontrado" });
      }
      res.status(200).json({ message: "Cine actualizado exitosamente" });
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ message: `El código de cine '${req.body.codigo}' ya existe.` });
      }
      res
        .status(500)
        .json({ message: "Error al actualizar el cine", error: error.message });
    }
  }

  static async deleteCine(req, res) {
    try {
      const wasDeleted = await CineModel.delete(req.params.id);
      if (!wasDeleted) {
        return res.status(404).json({ message: "Cine no encontrado" });
      }
      res.status(200).json({ message: "Cine eliminado exitosamente" });
    } catch (error) {
        if (error.message.includes("salas asociadas")) {
            return res.status(400).json({ message: error.message });
        }
      res
        .status(500)
        .json({ message: "Error al eliminar el cine", error: error.message });
    }
  }
}

export default CineController;