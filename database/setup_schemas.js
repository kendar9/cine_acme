import { connectDB } from "./connection.js";

const usuarioSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: [
      "identificacion",
      "nombre_completo",
      "telefono",
      "email",
      "cargo",
      "password",
    ],
    properties: {
      identificacion: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
      nombre_completo: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
      telefono: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
      email: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
      cargo: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
      password: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
    },
  },
};

const peliculaSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: [
      "codigo",
      "titulo",
      "sinopsis",
      "clasificacion",
      "idioma",
      "director",
      "duracion",
      "genero",
      "fecha_estreno",
    ],
    properties: {
      codigo: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
      titulo: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
      sinopsis: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
      reparto: { bsonType: "array", items: { bsonType: "string" } },
      clasificacion: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
      idioma: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
      director: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
      duracion: {
        bsonType: "int",
        description: "debe ser un entero en minutos y es obligatorio",
      },
      genero: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
      fecha_estreno: {
        bsonType: "date",
        description: "debe ser una fecha y es obligatorio",
      },
      trailer: {
        bsonType: "string",
        description: "debe ser una URL de string",
      },
      poster: { bsonType: "string", description: "debe ser una URL de string" },
    },
  },
};

const cineSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["codigo", "nombre", "direccion", "ciudad"],
    properties: {
      codigo: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
      nombre: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
      direccion: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
      ciudad: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
    },
  },
};

const salaSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["codigo", "numero_sillas", "cine_id"],
    properties: {
      codigo: {
        bsonType: "string",
        description: "debe ser un string y es obligatorio",
      },
      numero_sillas: {
        bsonType: "int",
        description: "debe ser un entero y es obligatorio",
      },
      cine_id: {
        bsonType: "objectId",
        description: "debe ser un ObjectId de un cine y es obligatorio",
      },
    },
  },
};

const funcionSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["cine_id", "sala_id", "pelicula_id", "fecha_hora"],
    properties: {
      cine_id: {
        bsonType: "objectId",
        description: "debe ser un ObjectId de un cine y es obligatorio",
      },
      sala_id: {
        bsonType: "objectId",
        description: "debe ser un ObjectId de una sala y es obligatorio",
      },
      pelicula_id: {
        bsonType: "objectId",
        description: "debe ser un ObjectId de una pelicula y es obligatorio",
      },
      fecha_hora: {
        bsonType: "date",
        description: "debe ser una fecha y hora y es obligatorio",
      },
    },
  },
};

async function aplicarValidadores(db) {
  console.log("Aplicando/verificando esquemas de validación...");
  const clienteSchema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["identificacion", "nombreCompleto", "email", "telefono"],
    properties: {
      identificacion: { bsonType: "string" },
      nombreCompleto: { bsonType: "string" },
      email: { bsonType: "string" },
      telefono: { bsonType: "string" },
      puntos: {
        bsonType: "array",
        items: {
          bsonType: "object",
          properties: {
            fecha: { bsonType: "date" },
            cantidad: { bsonType: "number" },
          },
        },
      },
    },
  },
};

const collections = {
    usuarios: usuarioSchema,
    peliculas: peliculaSchema,
    cines: cineSchema,
    salas: salaSchema,
    funciones: funcionSchema,
    clientes: clienteSchema,
  };

  for (const [collName, schema] of Object.entries(collections)) {
    try {
      await db.command({ collMod: collName, validator: schema });
    } catch (error) {
      if (error.codeName === "NamespaceNotFound") {
        console.log(`Creando colección '${collName}' con validador...`);
        await db.createCollection(collName, { validator: schema });
      } else {
        throw error;
      }
    }
  }
  console.log("Esquemas de validación aplicados/verificados.");
}

async function crearIndices(db) {
  console.log("Aplicando/verificando índices únicos...");
  await db.collection("usuarios").createIndex({ email: 1 }, { unique: true });
  await db
    .collection("usuarios")
    .createIndex({ identificacion: 1 }, { unique: true });
  await db.collection("peliculas").createIndex({ codigo: 1 }, { unique: true });
  await db.collection("cines").createIndex({ codigo: 1 }, { unique: true });

  await db
    .collection("salas")
    .createIndex({ cine_id: 1, codigo: 1 }, { unique: true });
  console.log("Índices únicos aplicados.");
}

export async function configurarBaseDeDatos() {
  try {
    const db = await connectDB();
    await aplicarValidadores(db);
    await crearIndices(db);
  } catch (error) {
    console.error("Error durante la configuración de la base de datos:", error);
    throw error;
  }
}
