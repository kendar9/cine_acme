# Sistema de Gestión de Cines - Despliegue

## 🚀 Estado del Proyecto

✅ **Backend desplegado en Vercel**: https://cines-acme-9q8wyrzc5-kendar9s-projects.vercel.app
✅ **MongoDB Atlas configurado**
✅ **Variables de entorno configuradas**
✅ **Frontend integrado en portafolio Next.js**

## 🔧 Configuración Actual

### Backend (Vercel)
- **URL**: https://cines-acme-9q8wyrzc5-kendar9s-projects.vercel.app
- **Proyecto**: cines-acme-api
- **Variables de entorno**:
  - `MONGO_URI`: mongodb+srv://<db_username>:<db_password>@duquecampus.uoawf8p.mongodb.net/?retryWrites=true&w=majority&appName=DuqueCampus
  - `DB_NAME`: cine_acme
  - `JWT_SECRET`: tu_jwt_secreto_muy_seguro_aqui_2024
  - `BCRYPT_SALT_ROUNDS`: 10
  - `NODE_ENV`: production

### Frontend (Portafolio Next.js)
- **Página del proyecto**: `/cines`
- **Integrado en**: Componente Projects
- **Categoría**: Full Stack

## ⚠️ Acción Requerida

**IMPORTANTE**: El backend está desplegado pero requiere deshabilitar la protección de autenticación de Vercel:

1. Ve a [vercel.com](https://vercel.com) y inicia sesión
2. Busca el proyecto "cines-acme-api"
3. Ve a **Settings > Security**
4. **Deshabilita "Deployment Protection"**

## 🧪 Pruebas

Una vez deshabilitada la protección, puedes probar:

```bash
# Health check
curl https://cines-acme-9q8wyrzc5-kendar9s-projects.vercel.app/api/health

# Información de la API
curl https://cines-acme-9q8wyrzc5-kendar9s-projects.vercel.app/
```

## 📱 Acceso a la Aplicación

- **Desde el portafolio**: Ve a la sección "Proyectos" y haz clic en "Ver Proyecto" en el Sistema de Gestión de Cines
- **Directo**: https://cines-acme-9q8wyrzc5-kendar9s-projects.vercel.app

## 🔑 Credenciales de Demo

- **Email**: admin@cinesacme.com
- **Contraseña**: admin123

## 📁 Estructura del Proyecto

```
examen_express/
├── api/
│   └── index.js          # Servidor principal para Vercel
├── frontend/
│   ├── src/
│   │   ├── config.js     # Configuración del frontend
│   │   └── services.js   # Servicios API actualizados
│   └── ...
├── vercel.json           # Configuración de Vercel
└── README-DEPLOYMENT.md  # Este archivo
```

## 🛠️ Desarrollo Local

Para desarrollo local:

1. **Backend**:
   ```bash
   cd examen_express
   npm run dev:backend
   ```

2. **Frontend**:
   ```bash
   cd examen_express/frontend
   npm run dev
   ```

3. **Cambiar configuración**:
   - Edita `frontend/src/config.js`
   - Cambia `API_BASE_URL` a `'/api'` para desarrollo local

## 📊 Funcionalidades

- ✅ Gestión de cines y sucursales
- ✅ Administración de salas
- ✅ Catálogo de películas
- ✅ Programación de funciones
- ✅ Sistema de usuarios y autenticación
- ✅ Reportes y estadísticas
- ✅ Interfaz responsive con React
- ✅ API REST con Express.js
- ✅ Base de datos MongoDB Atlas

## 🔄 Próximos Pasos

1. Deshabilitar protección de autenticación en Vercel
2. Probar la aplicación completa
3. Crear usuario administrador si es necesario
4. Documentar funcionalidades adicionales