# 🚀 Guía de Despliegue - Cines Acme

## 📋 Estado Actual

✅ **Backend**: Desplegado en Vercel
✅ **Frontend**: Preparado para GitHub Pages
✅ **Configuración**: Conectada entre frontend y backend

## 🔗 URLs

- **Backend API**: https://cines-acme-1a6gkqhng-kendar9s-projects.vercel.app
- **Frontend**: https://kendar9.github.io/examen_express/ (después del despliegue)

## 📝 Pasos para Desplegar en GitHub Pages

### 1. Subir el código a GitHub

```bash
# Si no tienes un repositorio creado
git init
git add .
git commit -m "Initial commit: Cines Acme project"
git branch -M main
git remote add origin https://github.com/kendar9/examen_express.git
git push -u origin main
```

### 2. Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub: https://github.com/kendar9/examen_express
2. Ve a **Settings** → **Pages**
3. En **Source**, selecciona **GitHub Actions**
4. El workflow se ejecutará automáticamente

### 3. Verificar el despliegue

- El frontend estará disponible en: https://kendar9.github.io/examen_express/
- Conectará automáticamente con el backend en Vercel

## 🔧 Configuración Técnica

### Frontend (React + Vite)
- **Base URL**: `/examen_express/` (para GitHub Pages)
- **Backend**: Conectado a Vercel
- **Build**: Automático con GitHub Actions

### Backend (Express + MongoDB)
- **Hosting**: Vercel
- **Database**: MongoDB Atlas
- **API**: REST endpoints

## 🧪 Pruebas

### Local
```bash
# Frontend
cd frontend
npm run dev

# Backend
npm run dev:backend
```

### Producción
- Frontend: https://kendar9.github.io/examen_express/
- Backend: https://cines-acme-1a6gkqhng-kendar9s-projects.vercel.app

## 🔄 Actualizaciones

Para actualizar el proyecto:

1. Haz cambios en el código
2. Commit y push a GitHub
3. GitHub Actions desplegará automáticamente

## 📱 Acceso desde Portafolio

Una vez desplegado, actualiza el enlace en tu portafolio:

```javascript
// En app/components/Projects.js
demo: 'https://kendar9.github.io/examen_express/'
```

## 🎯 Resultado Final

- ✅ Frontend React desplegado en GitHub Pages
- ✅ Backend Express desplegado en Vercel
- ✅ Conectados y funcionando
- ✅ Accesible desde tu portafolio