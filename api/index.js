import "dotenv/config";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

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

// Rutas básicas de la API - GET
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

// Rutas CRUD - POST (Crear)
app.post("/users", verifyToken, async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection('users').insertOne(req.body);
    res.status(201).json({ message: "Usuario creado exitosamente", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

app.post("/cines", verifyToken, async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection('cines').insertOne(req.body);
    res.status(201).json({ message: "Cine creado exitosamente", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Error al crear cine" });
  }
});

app.post("/peliculas", verifyToken, async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection('peliculas').insertOne(req.body);
    res.status(201).json({ message: "Película creada exitosamente", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Error al crear película" });
  }
});

app.post("/salas", verifyToken, async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection('salas').insertOne(req.body);
    res.status(201).json({ message: "Sala creada exitosamente", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Error al crear sala" });
  }
});

app.post("/funciones", verifyToken, async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection('funciones').insertOne(req.body);
    res.status(201).json({ message: "Función creada exitosamente", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Error al crear función" });
  }
});

// Rutas CRUD - PUT (Actualizar)
app.put("/users/:id", verifyToken, async (req, res) => {
  try {
    const db = await connectDB();
    const { ObjectId } = await import('mongodb');
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

app.put("/cines/:id", verifyToken, async (req, res) => {
  try {
    const db = await connectDB();
    const { ObjectId } = await import('mongodb');
    const result = await db.collection('cines').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Cine no encontrado" });
    }
    res.json({ message: "Cine actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar cine" });
  }
});

app.put("/peliculas/:id", verifyToken, async (req, res) => {
  try {
    const db = await connectDB();
    const { ObjectId } = await import('mongodb');
    const result = await db.collection('peliculas').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Película no encontrada" });
    }
    res.json({ message: "Película actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar película" });
  }
});

app.put("/salas/:id", verifyToken, async (req, res) => {
  try {
    const db = await connectDB();
    const { ObjectId } = await import('mongodb');
    const result = await db.collection('salas').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Sala no encontrada" });
    }
    res.json({ message: "Sala actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar sala" });
  }
});

app.put("/funciones/:id", verifyToken, async (req, res) => {
  try {
    const db = await connectDB();
    const { ObjectId } = await import('mongodb');
    const result = await db.collection('funciones').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Función no encontrada" });
    }
    res.json({ message: "Función actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar función" });
  }
});

// Rutas CRUD - DELETE (Eliminar)
app.delete("/users/:id", verifyToken, async (req, res) => {
  try {
    const db = await connectDB();
    const { ObjectId } = await import('mongodb');
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

app.delete("/cines/:id", verifyToken, async (req, res) => {
  try {
    const db = await connectDB();
    const { ObjectId } = await import('mongodb');
    const result = await db.collection('cines').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Cine no encontrado" });
    }
    res.json({ message: "Cine eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar cine" });
  }
});

app.delete("/peliculas/:id", verifyToken, async (req, res) => {
  try {
    const db = await connectDB();
    const { ObjectId } = await import('mongodb');
    const result = await db.collection('peliculas').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Película no encontrada" });
    }
    res.json({ message: "Película eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar película" });
  }
});

app.delete("/salas/:id", verifyToken, async (req, res) => {
  try {
    const db = await connectDB();
    const { ObjectId } = await import('mongodb');
    const result = await db.collection('salas').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Sala no encontrada" });
    }
    res.json({ message: "Sala eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar sala" });
  }
});

app.delete("/funciones/:id", verifyToken, async (req, res) => {
  try {
    const db = await connectDB();
    const { ObjectId } = await import('mongodb');
    const result = await db.collection('funciones').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Función no encontrada" });
    }
    res.json({ message: "Función eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar función" });
  }
});

// Rutas de reportes
app.get("/reportes/funciones-disponibles", async (req, res) => {
  try {
    const { cine, pelicula } = req.query;
    const db = await connectDB();
    
    let query = {};
    if (cine) query.cine = cine;
    if (pelicula) query.pelicula = pelicula;
    
    const funciones = await db.collection('funciones').find(query).toArray();
    res.json(funciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener funciones disponibles" });
  }
});

app.get("/reportes/peliculas-vigentes", async (req, res) => {
  try {
    const { cine, fecha } = req.query;
    const db = await connectDB();
    
    let query = {};
    if (cine) query.cine = cine;
    if (fecha) query.fecha = fecha;
    
    const peliculas = await db.collection('peliculas').find(query).toArray();
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener películas vigentes" });
  }
});

app.get("/reportes/peliculas-proyectadas", async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin } = req.query;
    const db = await connectDB();
    
    let query = {};
    if (fecha_inicio && fecha_fin) {
      query.fecha = { $gte: fecha_inicio, $lte: fecha_fin };
    }
    
    const peliculas = await db.collection('peliculas').find(query).toArray();
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener películas proyectadas" });
  }
});

// Ruta de salud
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Servidor de Cines Acme funcionando correctamente",
    timestamp: new Date().toISOString(),
    database: dbConnected ? "Conectada" : "No conectada",
    version: "1.0.6",
    mongodb: "Atlas",
    login: "Disponible"
  });
});

// Endpoint para inicializar datos de prueba
app.post("/init-data", async (req, res) => {
  try {
    const db = await connectDB();
    
    // Limpiar datos existentes
    await db.collection('users').deleteMany({});
    await db.collection('cines').deleteMany({});
    await db.collection('peliculas').deleteMany({});
    await db.collection('salas').deleteMany({});
    await db.collection('funciones').deleteMany({});
    
    // Crear usuario de prueba
    const bcrypt = await import('bcrypt');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const users = [
      {
        identificacion: '12345678',
        nombre_completo: 'Administrador Principal',
        telefono: '3001234567',
        email: 'admin@cinesacme.com',
        cargo: 'administrador',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        identificacion: '87654321',
        nombre_completo: 'Empleado Ejemplo',
        telefono: '3007654321',
        email: 'empleado@cinesacme.com',
        cargo: 'empleado',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    
    await db.collection('users').insertMany(users);
    
    // Crear cines
    const cines = [
      {
        codigo: 'CINE001',
        nombre: 'Cine Acme Centro',
        direccion: 'Calle 123 #45-67',
        telefono: '3001234567',
        capacidad_total: 500,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 'CINE002',
        nombre: 'Cine Acme Norte',
        direccion: 'Avenida 456 #78-90',
        telefono: '3002345678',
        capacidad_total: 300,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    
    await db.collection('cines').insertMany(cines);
    
    // Crear películas
    const peliculas = [
      {
        titulo: 'Avengers: Endgame',
        genero: 'Acción/Aventura',
        duracion: 181,
        clasificacion: 'PG-13',
        director: 'Anthony Russo, Joe Russo',
        sinopsis: 'Los Vengadores se unen para enfrentar a Thanos en una batalla épica.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        titulo: 'Spider-Man: No Way Home',
        genero: 'Acción/Aventura',
        duracion: 148,
        clasificacion: 'PG-13',
        director: 'Jon Watts',
        sinopsis: 'Peter Parker enfrenta multiversos y villanos de otras dimensiones.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        titulo: 'Top Gun: Maverick',
        genero: 'Acción/Drama',
        duracion: 131,
        clasificacion: 'PG-13',
        director: 'Joseph Kosinski',
        sinopsis: 'Maverick regresa para entrenar a una nueva generación de pilotos.',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    
    await db.collection('peliculas').insertMany(peliculas);
    
    // Crear salas
    const salas = [
      {
        numero: 1,
        cine: 'CINE001',
        capacidad: 150,
        tipo: '2D',
        equipamiento: 'Proyector 4K, Sonido Dolby Atmos',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 2,
        cine: 'CINE001',
        capacidad: 120,
        tipo: '3D',
        equipamiento: 'Proyector 3D, Gafas 3D',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        numero: 1,
        cine: 'CINE002',
        capacidad: 100,
        tipo: '2D',
        equipamiento: 'Proyector HD, Sonido Surround',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    
    await db.collection('salas').insertMany(salas);
    
    // Crear funciones
    const funciones = [
      {
        pelicula: 'Avengers: Endgame',
        cine: 'CINE001',
        sala: 1,
        fecha: '2025-09-09',
        hora_inicio: '19:00',
        hora_fin: '22:01',
        precio: 15000,
        estado: 'activa',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        pelicula: 'Spider-Man: No Way Home',
        cine: 'CINE001',
        sala: 2,
        fecha: '2025-09-09',
        hora_inicio: '20:30',
        hora_fin: '22:58',
        precio: 18000,
        estado: 'activa',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        pelicula: 'Top Gun: Maverick',
        cine: 'CINE002',
        sala: 1,
        fecha: '2025-09-09',
        hora_inicio: '21:00',
        hora_fin: '23:11',
        precio: 12000,
        estado: 'activa',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    
    await db.collection('funciones').insertMany(funciones);
    
    res.json({ 
      message: "Datos de prueba inicializados correctamente",
      users: users.length,
      cines: cines.length,
      peliculas: peliculas.length,
      salas: salas.length,
      funciones: funciones.length,
      status: "OK"
    });
    
  } catch (error) {
    console.error('Error al inicializar datos:', error);
    res.status(500).json({ 
      error: "Error al inicializar datos de prueba",
      message: error.message
    });
  }
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
    version: "1.0.6",
    status: "Funcionando",
    database: "MongoDB Atlas",
    endpoints: {
      health: "/health",
      login: "/login",
      users: "/users (GET, POST, PUT, DELETE)",
      cines: "/cines (GET, POST, PUT, DELETE)",
      peliculas: "/peliculas (GET, POST, PUT, DELETE)",
      salas: "/salas (GET, POST, PUT, DELETE)",
      funciones: "/funciones (GET, POST, PUT, DELETE)",
      reportes: {
        funciones_disponibles: "/reportes/funciones-disponibles",
        peliculas_vigentes: "/reportes/peliculas-vigentes",
        peliculas_proyectadas: "/reportes/peliculas-proyectadas"
      }
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