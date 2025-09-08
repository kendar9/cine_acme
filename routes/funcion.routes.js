import { Router } from "express";
import FuncionController from "../controllers/funcion.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/disponibles", verifyToken, FuncionController.getFuncionesDisponibles);

router.get("/", verifyToken, FuncionController.getFunciones);
router.get("/:id", verifyToken, FuncionController.getFuncionById);
router.post("/", verifyToken, FuncionController.createFuncion);
router.put("/:id", verifyToken, FuncionController.updateFuncion);
router.delete("/:id", verifyToken, FuncionController.deleteFuncion);

export default router;
