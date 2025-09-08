import { connectDB } from "../database/connection.js";
import { ObjectId } from "mongodb";

const CINES = [
  {
    codigo: "C001",
    nombre: "Acme Central",
    direccion: "Calle Falsa 123",
    ciudad: "Metrópolis",
  },
  {
    codigo: "C002",
    nombre: "Acme Norte",
    direccion: "Avenida Siempreviva 742",
    ciudad: "Metrópolis",
  },
];

const PELICULAS = [
  {
    codigo: "P001",
    titulo: "El Viaje del Programador",
    duracion: 120,
    genero: "Drama",
    reparto: ["Actor A", "Actriz B"],
    trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    poster: "https://placehold.co/200x300?text=Pelicula+1",
  },
  {
    codigo: "P002",
    titulo: "Código Sin Fin",
    duracion: 150,
    genero: "Ciencia Ficción",
    reparto: ["Actor C", "Actor D"],
    trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    poster: "https://placehold.co/200x300?text=Pelicula+2",
  },
  {
    codigo: "P003",
    titulo: "La Amenaza del Bug",
    duracion: 95,
    genero: "Acción",
    reparto: ["Actriz E", "Actor F"],
    trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    poster: "https://placehold.co/200x300?text=Pelicula+3",
  },
  {
    codigo: "P004",
    titulo: "Deploy a Medianoche",
    duracion: 88,
    genero: "Suspenso",
    reparto: ["Actor G", "Actriz H"],
    trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    poster: "https://placehold.co/200x300?text=Pelicula+4",
  },
  {
    codigo: "P005",
    titulo: "Una API para Recordar",
    duracion: 110,
    genero: "Romance",
    reparto: ["Actriz I", "Actor J"],
    trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    poster: "https://placehold.co/200x300?text=Pelicula+5",
  },
  {
    codigo: "P006",
    titulo: "El Silencio de los Logs",
    duracion: 135,
    genero: "Terror",
    reparto: ["Actor K", "Actriz L"],
    trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    poster: "https://placehold.co/200x300?text=Pelicula+6",
  },
  {
    codigo: "P007",
    titulo: "Mi Amigo el Compilador",
    duracion: 90,
    genero: "Infantil",
    reparto: ["Actor M", "Actriz N"],
    trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    poster: "https://placehold.co/200x300?text=Pelicula+7",
  },
  {
    codigo: "P008",
    titulo: "Rescate en la Nube",
    duracion: 105,
    genero: "Aventura",
    reparto: ["Actriz O", "Actor P"],
    trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    poster: "https://placehold.co/200x300?text=Pelicula+8",
  },
].map((p) => ({
  ...p,
  sinopsis: `Sinopsis de ${p.titulo}`,
  clasificacion: "PG-13",
  idioma: "Español",
  director: "Juan Dev",
  fecha_estreno: new Date(),
}));

export async function seedDatabase() {
  console.log("Iniciando siembra de la base de datos...");
  const db = await connectDB();

  try {
    const cineCount = await db.collection("cines").countDocuments();
    if (cineCount === 0) {
      console.log("No hay cines, sembrando nuevos...");
      await db.collection("cines").insertMany(CINES);
      console.log("Cines sembrados.");
    } else {
      console.log("Los cines ya existen, omitiendo siembra.");
    }

    const peliculaCount = await db.collection("peliculas").countDocuments();
    if (peliculaCount === 0) {
      console.log("No hay películas, sembrando nuevas...");
      await db.collection("peliculas").insertMany(PELICULAS);
      console.log("Películas sembradas.");
    } else {
      console.log("Las películas ya existen, omitiendo siembra.");
    }

    const cinesActuales = await db.collection("cines").find().toArray();
    const peliculasActuales = await db.collection("peliculas").find().toArray();

    const salaCount = await db.collection("salas").countDocuments();
    if (salaCount === 0 && cinesActuales.length > 0) {
      console.log("No hay salas, sembrando nuevas...");
      const nuevasSalas = [];
      cinesActuales.forEach((cine) => {
        for (let i = 1; i <= 4; i++) {
          nuevasSalas.push({
            codigo: `S${i.toString().padStart(3, "0")}`,
            numero_sillas: 100,
            cine_id: cine._id,
          });
        }
      });
      await db.collection("salas").insertMany(nuevasSalas);
      console.log("Salas sembradas.");
    } else {
      console.log("Las salas ya existen o no hay cines, omitiendo siembra.");
    }

    const salasActuales = await db.collection("salas").find().toArray();

    const funcionCount = await db.collection("funciones").countDocuments();
    if (
      funcionCount === 0 &&
      salasActuales.length > 0 &&
      peliculasActuales.length > 0
    ) {
      console.log("No hay funciones, sembrando nuevas...");
      const nuevasFunciones = [];
      const [cine1, cine2] = cinesActuales;
      const salasCine1 = salasActuales.filter((s) =>
        s.cine_id.equals(cine1._id)
      );
      const salasCine2 = salasActuales.filter((s) =>
        s.cine_id.equals(cine2._id)
      );

      const getShowingTime = (dayOffset) => {
        const date = new Date();
        date.setDate(date.getDate() + dayOffset);
        const hour = 10 + Math.floor(Math.random() * 12);
        const minute = Math.random() > 0.5 ? 30 : 0;
        date.setHours(hour, minute, 0, 0);
        return date;
      };

      for (let i = 0; i < 8; i++) {
        nuevasFunciones.push({
          cine_id: cine1._id,
          sala_id: salasCine1[i % salasCine1.length]._id,
          pelicula_id: peliculasActuales[i % peliculasActuales.length]._id,
          fecha_hora: getShowingTime(i),
        });
      }

      for (let i = 0; i < 8; i++) {
        nuevasFunciones.push({
          cine_id: cine2._id,
          sala_id: salasCine2[i % salasCine2.length]._id,
          pelicula_id:
            peliculasActuales[(i + 4) % peliculasActuales.length]._id,
          fecha_hora: getShowingTime(i),
        });
      }

      await db.collection("funciones").insertMany(nuevasFunciones);
      console.log("Funciones sembradas.");
    } else {
      console.log(
        "Las funciones ya existen o faltan datos (salas/peliculas), omitiendo siembra."
      );
    }

    console.log("Proceso de siembra finalizado.");
  } catch (error) {
    console.error("Error durante la siembra de la base de datos:", error);
  }
}
