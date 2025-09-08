import "dotenv/config";
import { connectDB } from "../database/connection.js";

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://kendar9.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

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
}