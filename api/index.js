import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectDB } from "../database/connection.js";
import { configurarBaseDeDatos } from "../database/setup_schemas.js";
import UserController from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://kendar9.github.io',
    'https://kendar9.github.io/cine_acme',
    'https://kendar9.github.io/examen_express',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true
}));
app.use(express.json());

// Conectar a la base de datos
let dbConnected = false;

async function initializeDB() {
  if (!dbConnected) {
    try {
      await connectDB();
      await configurarBaseDeDatos();
      dbConnected = true;
      console.log("Base de datos inicializada correctamente");
    } catch (error) {
      console.error("Error al inicializar la base de datos:", error);
    }
  }
}

// Inicializar DB en el primer request
app.use(async (req, res, next) => {
  await initializeDB();
  next();
});

// Rutas de autenticación
app.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son requeridos." });
    }

    const db = await connectDB();
    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const bcrypt = await import('bcrypt');
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const jwt = await import('jsonwebtoken');
    const tokenPayload = {
      id: user._id,
      email: user.email,
      cargo: user.cargo,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({ 
      message: "Login exitoso", 
      token: token,
      user: {
        id: user._id,
        email: user.email,
        nombre: user.nombre_completo,
        cargo: user.cargo
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      message: "Error en el servidor durante el login",
      error: error.message,
    });
  }
});

// Rutas básicas de la API
app.get("/users", verifyToken, async (req, res) => {
  try {
    const db = await connectDB();
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

app.get("/cines", async (req, res) => {
  try {
    const db = await connectDB();
    const cines = await db.collection('cines').find({}).toArray();
    res.json(cines);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener cines" });
  }
});

app.get("/peliculas", async (req, res) => {
  try {
    const db = await connectDB();
    const peliculas = await db.collection('peliculas').find({}).toArray();
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener películas" });
  }
});

app.get("/salas", async (req, res) => {
  try {
    const db = await connectDB();
    const salas = await db.collection('salas').find({}).toArray();
    res.json(salas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener salas" });
  }
});

app.get("/funciones", async (req, res) => {
  try {
    const db = await connectDB();
    const funciones = await db.collection('funciones').find({}).toArray();
    res.json(funciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener funciones" });
  }
});

// Ruta de salud
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Servidor de Cines Acme funcionando correctamente",
    timestamp: new Date().toISOString(),
    database: dbConnected ? "Conectada" : "No conectada",
    version: "1.0.3",
    mongodb: "Atlas",
    login: "Disponible"
  });
});

// Endpoint de login en la ruta principal
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email y contraseña son requeridos." 
      });
    }

    const db = await connectDB();
    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      return res.status(401).json({ 
        message: "Credenciales inválidas" 
      });
    }

    const bcrypt = await import('bcrypt');
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ 
        message: "Credenciales inválidas" 
      });
    }

    const jwt = await import('jsonwebtoken');
    const tokenPayload = {
      id: user._id,
      email: user.email,
      cargo: user.cargo,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({ 
      message: "Login exitoso", 
      token: token,
      user: {
        id: user._id,
        email: user.email,
        nombre: user.nombre_completo,
        cargo: user.cargo
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      message: "Error en el servidor durante el login",
      error: error.message,
    });
  }
});

// Ruta raíz
app.get("/", (req, res) => {
  res.json({
    message: "API de Cines Acme",
    version: "1.0.4",
    status: "Funcionando",
    database: "MongoDB Atlas",
    endpoints: {
      health: "/health",
      login: "/login",
      users: "/users",
      cines: "/cines",
      peliculas: "/peliculas",
      salas: "/salas",
      funciones: "/funciones"
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Error interno del servidor",
    message: process.env.NODE_ENV === "development" ? err.message : "Algo salió mal"
  });
});

export default app;