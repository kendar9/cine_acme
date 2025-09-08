import "dotenv/config";
import { connectDB } from "./database/connection.js";
import bcrypt from "bcrypt";

async function seedDatabase() {
  try {
    console.log("🌱 Iniciando inserción de datos de prueba...");
    
    const db = await connectDB();
    
    // Limpiar datos existentes
    await db.collection('users').deleteMany({});
    await db.collection('cines').deleteMany({});
    await db.collection('peliculas').deleteMany({});
    await db.collection('salas').deleteMany({});
    await db.collection('funciones').deleteMany({});
    console.log("🧹 Datos existentes eliminados");
    
    // 1. Crear usuarios
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
    console.log("👥 Usuarios creados:", users.length);
    
    // 2. Crear cines
    const cines = [
      {
        codigo: 'CINE001',
        nombre: 'Cine Acme Centro',
        direccion: 'Calle 100 #15-20, Bogotá',
        telefono: '601-234-5678',
        capacidad_total: 500,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 'CINE002',
        nombre: 'Cine Acme Norte',
        direccion: 'Carrera 15 #93-47, Bogotá',
        telefono: '601-234-5679',
        capacidad_total: 300,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 'CINE003',
        nombre: 'Cine Acme Sur',
        direccion: 'Avenida 68 #25-47, Bogotá',
        telefono: '601-234-5680',
        capacidad_total: 400,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    
    await db.collection('cines').insertMany(cines);
    console.log("🎬 Cines creados:", cines.length);
    
    // 3. Crear películas
    const peliculas = [
      {
        codigo: 'PEL001',
        titulo: 'Spider-Man: No Way Home',
        sinopsis: 'Peter Parker desenmascara a Spider-Man y ya no puede separar su vida normal de los riesgos de ser un superhéroe.',
        clasificacion: 'PG-13',
        duracion: 148,
        genero: 'Acción/Aventura',
        estado: 'vigente',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 'PEL002',
        titulo: 'Encanto',
        sinopsis: 'Una familia colombiana mágica vive en una casa encantada en las montañas de Colombia.',
        clasificacion: 'PG',
        duracion: 102,
        genero: 'Animación/Musical',
        estado: 'vigente',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 'PEL003',
        titulo: 'Dune',
        sinopsis: 'Paul Atreides, un joven brillante y talentoso, debe viajar al planeta más peligroso del universo.',
        clasificacion: 'PG-13',
        duracion: 155,
        genero: 'Ciencia Ficción',
        estado: 'vigente',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    
    await db.collection('peliculas').insertMany(peliculas);
    console.log("🎭 Películas creadas:", peliculas.length);
    
    // 4. Crear salas
    const salas = [
      {
        codigo: 'SALA001',
        nombre: 'Sala 1',
        cine_codigo: 'CINE001',
        capacidad: 150,
        tipo: '2D',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 'SALA002',
        nombre: 'Sala 2',
        cine_codigo: 'CINE001',
        capacidad: 120,
        tipo: '3D',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 'SALA003',
        nombre: 'Sala 1',
        cine_codigo: 'CINE002',
        capacidad: 100,
        tipo: '2D',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 'SALA004',
        nombre: 'Sala 1',
        cine_codigo: 'CINE003',
        capacidad: 200,
        tipo: 'IMAX',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    
    await db.collection('salas').insertMany(salas);
    console.log("🪑 Salas creadas:", salas.length);
    
    // 5. Crear funciones
    const funciones = [
      {
        codigo: 'FUN001',
        pelicula_codigo: 'PEL001',
        sala_codigo: 'SALA001',
        fecha: new Date('2024-09-10'),
        hora_inicio: '14:00',
        hora_fin: '16:28',
        precio: 15000,
        estado: 'disponible',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 'FUN002',
        pelicula_codigo: 'PEL001',
        sala_codigo: 'SALA001',
        fecha: new Date('2024-09-10'),
        hora_inicio: '17:00',
        hora_fin: '19:28',
        precio: 15000,
        estado: 'disponible',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 'FUN003',
        pelicula_codigo: 'PEL002',
        sala_codigo: 'SALA002',
        fecha: new Date('2024-09-10'),
        hora_inicio: '15:00',
        hora_fin: '16:42',
        precio: 12000,
        estado: 'disponible',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        codigo: 'FUN004',
        pelicula_codigo: 'PEL003',
        sala_codigo: 'SALA004',
        fecha: new Date('2024-09-10'),
        hora_inicio: '19:00',
        hora_fin: '21:35',
        precio: 20000,
        estado: 'disponible',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    
    await db.collection('funciones').insertMany(funciones);
    console.log("🎫 Funciones creadas:", funciones.length);
    
    console.log("✅ ¡Datos de prueba insertados exitosamente!");
    console.log("\n📋 Resumen:");
    console.log("- Usuarios: 2 (admin@cinesacme.com / admin123)");
    console.log("- Cines: 3");
    console.log("- Películas: 3");
    console.log("- Salas: 4");
    console.log("- Funciones: 4");
    
  } catch (error) {
    console.error("❌ Error al insertar datos de prueba:", error);
  }
}

seedDatabase();