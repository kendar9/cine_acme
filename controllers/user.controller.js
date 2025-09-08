import UserModel from "../models/user.model.js";
import {
  UserResponseDTO,
  CreateUserDTO,
  LoginResponseDTO,
} from "../dtos/user.dto.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserController {
  static async createUser(req, res) {
    try {
      const createUserDTO = new CreateUserDTO(req.body);
      const userId = await UserModel.create(createUserDTO);
      res
        .status(201)
        .json({ message: "Usuario creado exitosamente", userId });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({
          message: `El email '${req.body.email}' o la identificación '${req.body.identificacion}' ya existen.`,
        });
      }
      res
        .status(500)
        .json({ message: "Error al crear el usuario", error: error.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAll();
      const userResponseDTOs = users.map((user) => new UserResponseDTO(user));
      res.status(200).json(userResponseDTOs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los usuarios", error: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await UserModel.getById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      const userResponseDTO = new UserResponseDTO(user);
      res.status(200).json(userResponseDTO);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener el usuario", error: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const wasUpdated = await UserModel.update(req.params.id, req.body);
      if (!wasUpdated) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar el usuario",
        error: error.message,
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const wasDeleted = await UserModel.delete(req.params.id);
      if (!wasDeleted) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al eliminar el usuario", error: error.message });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email y contraseña son requeridos." });
      }

      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      const tokenPayload = {
        id: user._id,
        email: user.email,
        cargo: user.cargo,
      };

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      const loginResponseDTO = new LoginResponseDTO(token);
      res
        .status(200)
        .json({ message: "Login exitoso", token: loginResponseDTO.token });
    } catch (error) {
      res.status(500).json({
        message: "Error en el servidor durante el login",
        error: error.message,
      });
    }
  }
}

export default UserController;