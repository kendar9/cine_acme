import ReportesModel from "../models/reportes.model.js";
import {
  OcupacionSalasDTO,
  PeliculasMasVistasDTO,
  HorariosPicoDTO,
  FuncionesDisponiblesDTO,
  PeliculasVigentesDTO,
} from "../dtos/reportes.dto.js";

class ReportesController {
  static async getOcupacionSalas(req, res) {
    try {
      const reportes = await ReportesModel.getOcupacionSalas();
      const reportesDTOs = reportes.map(
        (reporte) => new OcupacionSalasDTO(reporte)
      );
      res.status(200).json(reportesDTOs);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el reporte de ocupación de salas",
        error: error.message,
      });
    }
  }

  static async getPeliculasMasVistas(req, res) {
    try {
      const reportes = await ReportesModel.getPeliculasMasVistas();
      const reportesDTOs = reportes.map(
        (reporte) => new PeliculasMasVistasDTO(reporte)
      );
      res.status(200).json(reportesDTOs);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el reporte de películas más vistas",
        error: error.message,
      });
    }
  }

  static async getHorariosPico(req, res) {
    try {
      const reportes = await ReportesModel.getHorariosPico();
      const reportesDTOs = reportes.map(
        (reporte) => new HorariosPicoDTO(reporte)
      );
      res.status(200).json(reportesDTOs);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el reporte de horarios pico",
        error: error.message,
      });
    }
  }

  static async getFuncionesDisponibles(req, res) {
    try {
      const { cine, pelicula } = req.query;
      const funciones = await ReportesModel.getFuncionesDisponibles(
        cine,
        pelicula
      );
      const funcionesDTOs = funciones.map(
        (funcion) => new FuncionesDisponiblesDTO(funcion)
      );
      res.status(200).json(funcionesDTOs);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el reporte de funciones disponibles",
        error: error.message,
      });
    }
  }

  static async getPeliculasVigentes(req, res) {
    try {
      const { cine, fecha } = req.query;
      const peliculas = await ReportesModel.getPeliculasVigentes(cine, fecha);
      const peliculasDTOs = peliculas.map(
        (pelicula) => new PeliculasVigentesDTO(pelicula)
      );
      res.status(200).json(peliculasDTOs);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el reporte de películas vigentes",
        error: error.message,
      });
    }
  }
}

export default ReportesController;
