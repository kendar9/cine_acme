# Cines Acme - Sistema de Gestión

Este es un sistema de gestión completo (Full-Stack) para la cadena de cines "Cines Acme". La plataforma permite a los administradores gestionar sucursales, salas, películas, funciones y usuarios, incluyendo un sistema de autenticación y autorización basado en roles.

## Características Principales

-   **Gestión de Cines:** CRUD completo para las sucursales de la cadena.
-   **Gestión de Salas:** Creación y asignación de salas a un cine específico.
-   **Gestión de Películas:** CRUD completo para el catálogo de películas.
-   **Gestión de Funciones:** Programación de funciones asociando una película, sala y horario.
-   **Gestión de Usuarios:** Manejo de usuarios administradores con autenticación segura mediante JSON Web Tokens (JWT).
-   **Sistema de Reportes:** Generación de reportes dinámicos como:
    -   Funciones disponibles por cine y película.
    -   Películas vigentes en un cine para una fecha específica.
    -   Películas proyectadas en un rango de fechas.

## Tecnologías Utilizadas

El proyecto está dividido en un backend y un frontend, utilizando las siguientes tecnologías:

### **Backend**

-   **Node.js:** Entorno de ejecución para JavaScript.
-   **Express.js:** Framework para la construcción de la API REST.
-   **MongoDB:** Base de datos NoSQL para el almacenamiento de datos, utilizando el driver oficial `mongodb`.
-   **JSON Web Tokens (JWT):** Para la implementación de la autenticación y protección de rutas.
-   **`express-validator`:** Middleware para la validación de los datos de entrada en la API.
-   **`dotenv`:** Para la gestión de variables de entorno.

### **Frontend**

-   **React:** Biblioteca para la construcción de la interfaz de usuario.
-   **Vite:** Herramienta de desarrollo y empaquetado de alta velocidad.
-   **Styled Components:** Para la estilización de los componentes de React.

## Arquitectura

El backend sigue una estructura inspirada en el patrón MVC (Modelo-Vista-Controlador):

-   **`routes/`**: Define los endpoints de la API y los asocia a sus respectivos controladores.
-   **`controllers/`**: Contiene la lógica de negocio y la interacción con la base de datos para cada ruta.
-   **`database/`**: Gestiona la conexión con MongoDB y la configuración inicial de colecciones.
-   **`middleware/`**: Incluye middlewares para la autenticación (`auth.middleware.js`) y validaciones (`validators.js`).

El frontend es una aplicación independiente (SPA) desarrollada en React que se encuentra en el directorio `frontend/` y se comunica con el backend a través de la API REST.

## Instalación y Puesta en Marcha

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### **1. Requisitos Previos**

-   Node.js y npm (o un gestor de paquetes compatible).
-   Una instancia de MongoDB en ejecución (local o en un servicio en la nube).

### **2. Configuración del Entorno**

El proyecto utiliza un archivo `.env` para las variables de entorno. Como este archivo no se incluye en el repositorio, debes crearlo manualmente en la raíz del proyecto.

Crea un archivo llamado `.env` y añade las siguientes variables, reemplazando los valores con tu configuración local:

```
MONGO_URI="mongodb://localhost:27017"
DB_NAME="cines_acme"
PORT=3000
HOSTNAME="127.0.0.1"
JWT_SECRET="TU_CLAVE_SECRETA_PARA_JWT"
```

### **3. Instalación de Dependencias**

1.  **Instalar dependencias del Backend:**
    ```bash
    npm install
    ```

2.  **Instalar dependencias del Frontend:**
    ```bash
    npm install --prefix frontend
    ```

### **4. Ejecución de la Aplicación**

-   **Modo de Desarrollo:**
    Para ejecutar tanto el backend como el frontend simultáneamente con recarga en caliente (hot-reloading):
    ```bash
    npm run dev
    ```

-   **Modo de Producción:**
    1.  Construir la aplicación de frontend para producción:
        ```bash
        npm run build:frontend
        ```
    2.  Iniciar el servidor de backend, que también servirá los archivos estáticos del frontend:
        ```bash
        npm start
        ```

## Scripts Adicionales

El proyecto incluye scripts útiles para la configuración inicial:

-   **Crear Usuario Administrador:** Al iniciar la aplicación por primera vez, se ejecuta automáticamente el script `scripts/create_admin.js` para asegurar que exista al menos un usuario administrador. Puedes configurar sus credenciales en dicho archivo si lo deseas.
-   **Sembrar Base de Datos (Seed):** El archivo `scripts/seed_database.js` contiene lógica para poblar la base de datos con datos de ejemplo. Puedes ejecutarlo manualmente si es necesario.
```bash
node scripts/seed_database.js
```
