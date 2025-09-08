# 🚀 Guía Completa de Despliegue - Cines Acme

## 📋 Estado Actualizado

✅ **Backend**: Configurado para Vercel con todas las rutas  
✅ **Frontend**: Preparado para GitHub Pages con workflow automático  
✅ **CORS**: Configurado para permitir conexiones desde GitHub Pages  
✅ **Variables de Entorno**: Configuradas para producción  

## 🔗 URLs del Proyecto

- **Backend API**: `https://cines-acme-1a6gkqhng-kendar9s-projects.vercel.app`
- **Frontend**: `https://kendar9.github.io/cine_acme/` (después del despliegue)

## 🛠️ Pasos para Desplegar

### **Paso 1: Configurar Variables de Entorno en Vercel**

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto "cines-acme"
3. Ve a **Settings** → **Environment Variables**
4. Agrega las siguientes variables:

```
MONGO_URI = mongodb+srv://usuario:password@cluster.mongodb.net/
DB_NAME = cines_acme
JWT_SECRET = tu_clave_secreta_muy_larga_y_segura_aqui
NODE_ENV = production
PORT = 3000
HOSTNAME = 0.0.0.0
```

### **Paso 2: Subir Código a GitHub**

```bash
# Navegar al directorio del proyecto
cd /home/christian/Documentos/portafolio/cine_acme

# Inicializar git si no está inicializado
git init

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "feat: Configuración completa para despliegue en Vercel y GitHub Pages"

# Conectar con tu repositorio de GitHub
git remote add origin https://github.com/kendar9/cine_acme.git

# Subir a GitHub
git push -u origin main
```

### **Paso 3: Habilitar GitHub Pages**

1. Ve a tu repositorio: `https://github.com/kendar9/cine_acme`
2. Ve a **Settings** → **Pages**
3. En **Source**, selecciona **GitHub Actions**
4. El workflow se ejecutará automáticamente en cada push

### **Paso 4: Verificar Despliegue**

#### **Backend (Vercel)**
- Visita: `https://cines-acme-1a6gkqhng-kendar9s-projects.vercel.app/health`
- Deberías ver: `{"status":"OK","message":"Servidor de Cines Acme funcionando correctamente"}`

#### **Frontend (GitHub Pages)**
- Visita: `https://kendar9.github.io/cine_acme/`
- Deberías ver la aplicación React funcionando

## 🔧 Configuración Técnica Detallada

### **Backend (Vercel)**
- **Framework**: Express.js con MongoDB
- **Rutas**: Todas las rutas API configuradas en `vercel.json`
- **CORS**: Configurado para GitHub Pages
- **Base de Datos**: MongoDB Atlas (configurar URI en variables de entorno)

### **Frontend (GitHub Pages)**
- **Framework**: React + Vite
- **Base URL**: `/cine_acme/` (configurado en `vite.config.js`)
- **Build**: Automático con GitHub Actions
- **Deploy**: Cada push a `main` activa el despliegue

## 🧪 Pruebas Locales

### **Backend Local**
```bash
cd cine_acme
npm install
npm run dev:backend
```

### **Frontend Local**
```bash
cd cine_acme/frontend
npm install
npm run dev
```

## 🔄 Flujo de Actualizaciones

1. **Hacer cambios** en el código
2. **Commit y push** a GitHub:
   ```bash
   git add .
   git commit -m "feat: Nueva funcionalidad"
   git push origin main
   ```
3. **GitHub Actions** desplegará automáticamente el frontend
4. **Vercel** detectará cambios y redesplegará el backend

## 🎯 Actualizar Portafolio

Una vez que todo esté funcionando, actualiza tu portafolio:

```javascript
// En /home/christian/Documentos/portafolio/app/components/Projects.js
{
  id: 1,
  title: 'Cines Acme - Sistema de Gestión',
  description: 'Sistema completo de gestión para cadena de cines con autenticación, CRUD de recursos y reportes dinámicos.',
  image: '/cine_acme.png',
  technologies: ['React', 'Express.js', 'MongoDB', 'JWT', 'Vercel', 'GitHub Pages'],
  category: 'fullstack',
  github: 'https://github.com/kendar9/cine_acme',
  demo: 'https://kendar9.github.io/cine_acme/',
  featured: true
}
```

## 🚨 Solución de Problemas

### **Error de CORS**
- Verificar que las URLs estén en la configuración CORS del backend
- Asegurar que el frontend use la URL correcta del backend

### **Error de Base de Datos**
- Verificar que `MONGO_URI` esté configurado correctamente en Vercel
- Asegurar que la base de datos MongoDB Atlas esté accesible

### **Error de Build**
- Verificar que todas las dependencias estén en `package.json`
- Revisar los logs de GitHub Actions para errores específicos

## 📱 Resultado Final

- ✅ **Frontend React** desplegado en GitHub Pages
- ✅ **Backend Express** desplegado en Vercel
- ✅ **Base de datos MongoDB** conectada
- ✅ **CORS** configurado correctamente
- ✅ **Despliegue automático** en cada push
- ✅ **Accesible** desde tu portafolio

## 🎉 ¡Listo!

Tu proyecto Cines Acme estará completamente funcional y desplegado. Los usuarios podrán:

1. **Acceder** al frontend desde GitHub Pages
2. **Interactuar** con todas las funcionalidades
3. **Ver datos** desde la base de datos MongoDB
4. **Usar autenticación** y todas las características del sistema

¡Tu proyecto estará listo para mostrar en tu portafolio profesional!