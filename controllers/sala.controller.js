import SalaModel from "../models/sala.model.js";
import { SalaResponseDTO, CreateSalaDTO } from "../dtos/sala.dto.js";

class SalaController {
  static async createSala(req, res) {
    try {
      const createSalaDTO = new CreateSalaDTO(req.body);
      const salaId = await SalaModel.create(createSalaDTO);
      res.status(201).json({ message: "Sala creada exitosamente", salaId });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          message: `La sala con código '${req.body.codigo}' ya existe en este cine.`,
        });
      }
      res
        .status(500)
        .json({ message: "Error al crear la sala", error: error.message });
    }
  }

  static async getSalas(req, res) {
    try {
      const salas = await SalaModel.getAll();
      const salaResponseDTOs = salas.map((sala) => new SalaResponseDTO(sala));
      res.status(200).json(salaResponseDTOs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener las salas", error: error.message });
    }
  }

  static async getSalaById(req, res) {
    try {
      const sala = await SalaModel.getById(req.params.id);
      if (!sala) {
        return res.status(404).json({ message: "Sala no encontrada" });
      }
      const salaResponseDTO = new SalaResponseDTO(sala);
      res.status(200).json(salaResponseDTO);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener la sala", error: error.message });
    }
  }

  static async updateSala(req, res) {
    try {
      const wasUpdated = await SalaModel.update(req.params.id, req.body);
      if (!wasUpdated) {
        return res.status(404).json({ message: "Sala no encontrada" });
      }
      res.status(200).json({ message: "Sala actualizada exitosamente" });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          message: `La sala con código '${req.body.codigo}' ya existe en este cine.`,
        });
      }
      res
        .status(500)
        .json({ message: "Error al actualizar la sala", error: error.message });
    }
  }

  static async deleteSala(req, res) {
    try {
      const wasDeleted = await SalaModel.delete(req.params.id);
      if (!wasDeleted) {
        return res.status(404).json({ message: "Sala no encontrada" });
      }
      res.status(200).json({ message: "Sala eliminada exitosamente" });
    } catch (error) {
      if (error.message.includes("funciones asociadas")) {
        return res.status(400).json({ message: error.message });
      }
      res
        .status(500)
        .json({ message: "Error al eliminar la sala", error: error.message });
    }
  }
}

export default SalaController;