import "dotenv/config";
import { connectDB } from "./database/connection.js";
import bcrypt from "bcrypt";

async function createTestUser() {
  try {
    const db = await connectDB();
    
    // Verificar si el usuario ya existe
    const existingUser = await db.collection('users').findOne({ email: 'admin@cinesacme.com' });
    
    if (existingUser) {
      console.log('✅ Usuario admin@cinesacme.com ya existe');
      return;
    }
    
    // Crear usuario de prueba
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const testUser = {
      identificacion: '12345678',
      nombre_completo: 'Administrador',
      telefono: '3001234567',
      email: 'admin@cinesacme.com',
      cargo: 'administrador',
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    const result = await db.collection('users').insertOne(testUser);
    console.log('✅ Usuario de prueba creado exitosamente:', result.insertedId);
    
  } catch (error) {
    console.error('❌ Error al crear usuario de prueba:', error);
  }
}

createTestUser();