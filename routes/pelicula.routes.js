import { Router } from "express";
import PeliculaController from "../controllers/pelicula.controller.js";
import { validateCreatePelicula, validateUpdatePelicula } from "../middleware/validators.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyToken);

router
  .route("/")
  .post(validateCreatePelicula, PeliculaController.createPelicula)
  .get(PeliculaController.getAllPeliculas);

router
  .route("/:id")
  .get(PeliculaController.getPeliculaById)
  .put(validateUpdatePelicula, PeliculaController.updatePelicula)
  .delete(PeliculaController.deletePelicula);

export default router;
