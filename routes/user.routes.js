import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { validateCreateUser } from "../middleware/validators.js";

const router = Router();

router.post("/login", UserController.loginUser);

router.post("/", validateCreateUser, verifyToken, UserController.createUser);

router.get("/", verifyToken, UserController.getAllUsers);

router
  .route("/:id")
  .get(verifyToken, UserController.getUserById)
  .put(verifyToken, UserController.updateUser)
  .delete(verifyToken, UserController.deleteUser);

export default router;
