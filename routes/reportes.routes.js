import express from "express";
import ReportesController from "../controllers/reportes.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/funciones-disponibles",
  verifyToken,
  ReportesController.getFuncionesDisponibles
);
router.get(
  "/peliculas-vigentes",
  verifyToken,
  ReportesController.getPeliculasVigentes
);
router.get("/ocupacion-salas", verifyToken, ReportesController.getOcupacionSalas);
router.get(
  "/peliculas-mas-vistas",
  verifyToken,
  ReportesController.getPeliculasMasVistas
);
router.get("/horarios-pico", verifyToken, ReportesController.getHorariosPico);

export default router;
