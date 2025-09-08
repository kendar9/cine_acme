import { handleLogout } from './auth'; // Assuming auth functions are moved to auth.js
import config from './config.js';

const API_BASE_URL = config.API_BASE_URL;

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

  if ((response.status === 401 || response.status === 403) && endpoint !== '/users/login') {
    handleLogout();
    window.location.href = '/login'; // Redirect to login
    throw new Error('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
  }

  const data = await response.json();

  if (!response.ok) {
    if (data.errors && Array.isArray(data.errors)) {
      const errorMessages = data.errors.map(err => err.msg).join(' ');
      throw new Error(errorMessages);
    }
    throw new Error(data.message || `Error en la petición a ${endpoint}`);
  }

  return data;
}

// Generic factory for creating a resource service
const createResourceService = (resource) => ({
  getAll: () => request(`/${resource}`),
  getById: (id) => request(`/${resource}/${id}`),
  create: (data) => request(`/${resource}`, { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/${resource}/${id}`, { method: 'DELETE' }),
});

// Create services for each resource
export const userService = createResourceService('users');
export const peliculaService = createResourceService('peliculas');
export const cineService = createResourceService('cines');
export const salaService = createResourceService('salas');
export const funcionService = {
    ...createResourceService('funciones'),
    getDisponibles: (cineId, peliculaId) => request(`/funciones/disponibles?cineId=${cineId}&peliculaId=${peliculaId}`)
};

// Auth-specific services can remain separate
export async function handleLogin(email, password) {
  const data = await request("/login", { // Using correct login endpoint for Vercel API
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem("token", data.token);
  return data;
}

export const reporteService = {
  getFuncionesDisponibles: (cine, pelicula) => 
    request(`/reportes/funciones-disponibles?cine=${encodeURIComponent(cine)}&pelicula=${encodeURIComponent(pelicula)}`),
  getPeliculasVigentes: (cine, fecha) => 
    request(`/reportes/peliculas-vigentes?cine=${encodeURIComponent(cine)}&fecha=${encodeURIComponent(fecha)}`),
  getPeliculasProyectadas: (fecha_inicio, fecha_fin) => 
    request(`/reportes/peliculas-proyectadas?fecha_inicio=${encodeURIComponent(fecha_inicio)}&fecha_fin=${encodeURIComponent(fecha_fin)}`),
};
