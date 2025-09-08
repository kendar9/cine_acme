import "dotenv/config";
import { connectDB, getDB } from "../database/connection.js";
import bcrypt from "bcrypt";

export const createAdminUser = async () => {
  let db;
  try {
    db = await connectDB();
    const usersCollection = db.collection("usuarios");

    const adminEmail = "admin@cineacme.com";
    const adminPassword = "123";

    const existingAdmin = await usersCollection.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log(
        `El usuario administrador con email '${adminEmail}' ya existe con contraseña ${adminPassword}.`
      );
      return;
    }

    console.log(`Creando usuario administrador con email '${adminEmail}'...`);

    const hashedPassword = await bcrypt.hash(
      adminPassword,
      parseInt(process.env.BCRYPT_SALT_ROUNDS)
    );

    await usersCollection.insertOne({
      identificacion: "000000000",
      nombre_completo: "Administrador del Sistema",
      telefono: "0000000000",
      email: adminEmail,
      cargo: "Administrador",
      password: hashedPassword,
    });

    console.log(" ¡Usuario administrador creado exitosamente!");
    console.log("   Usa estas credenciales para iniciar sesión:");
    console.log(`    Usuario: ${adminEmail}`);
    console.log(`    Contraseña: ${adminPassword}`);
  } catch (error) {
    console.error("Error al crear el usuario administrador:", error);
  }
};
