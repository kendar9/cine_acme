import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { connectDB } from "./database/connection.js";
import { configurarBaseDeDatos } from "./database/setup_schemas.js";
import userRoutes from "./routes/user.routes.js";
import { createAdminUser } from "./scripts/create_admin.js";
import { seedDatabase } from "./scripts/seed_database.js";
import peliculaRoutes from "./routes/pelicula.routes.js";
import cineRoutes from "./routes/cine.routes.js";
import salaRoutes from "./routes/sala.routes.js";
import funcionRoutes from "./routes/funcion.routes.js";
import reportesRoutes from "./routes/reportes.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";

async function main() {
  try {
    await connectDB();
    await configurarBaseDeDatos();

    await createAdminUser();
    await seedDatabase();

    const app = express();
    const PORT = process.env.PORT;
    const hostname = process.env.HOSTNAME;

    app.use(express.json());

    if (process.env.NODE_ENV === "production") {
      app.use(express.static("frontend/dist"));
    }

    app.use("/api/users", userRoutes);
    app.use("/api/peliculas", peliculaRoutes);
    app.use("/api/cines", cineRoutes);
    app.use("/api/salas", salaRoutes);
    app.use("/api/funciones", funcionRoutes);
        app.use("/api/reportes", reportesRoutes);
    app.use("/api/clientes", clienteRoutes);

    if (process.env.NODE_ENV === "production") {
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
      });
    }

    app.listen(PORT, hostname, () => {
      console.log(
        `Servidor de Express corriendo ${hostname} en el puerto ${PORT}`
      );
    });
  } catch (error) {
    console.error("Ha ocurrido un error al inicializar la aplicación:", error);
    process.exit(1);
  }
}

main();
