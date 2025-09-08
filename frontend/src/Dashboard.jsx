import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { handleLogout } from './auth';
import ResourcePage from './pages/ResourcePage';
import ReportesPage from './ReportesPage';
import { cineService, salaService, peliculaService, funcionService, userService, reporteService } from './services';


const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1a1a2e; /* Dark theme */
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #1a1a2e; // Dark blue
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
`;

const SidebarTitle = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const NavButton = styled.button`
  background: ${props => props.active ? '#0f3460' : 'transparent'};
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0f3460;
  }
`;

const LogoutButton = styled.button`
  background-color: #e94560;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c7344e;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 40px;
  overflow-y: auto;
  background-color: #1f2940; /* Dark content background */
`;

const resources = {
  cines: {
    name: 'Cines',
    service: cineService,
    columns: [
      { key: 'codigo', header: 'Código' },
      { key: 'nombre', header: 'Nombre' },
      { key: 'direccion', header: 'Dirección' },
      { key: 'ciudad', header: 'Ciudad' },
    ],
    formFields: [
      { name: 'codigo', placeholder: 'Código' },
      { name: 'nombre', placeholder: 'Nombre' },
      { name: 'direccion', placeholder: 'Dirección' },
      { name: 'ciudad', placeholder: 'Ciudad' },
    ],
  },
  salas: {
    name: 'Salas',
    service: salaService,
    columns: [
        { key: 'numero', header: 'Número' },
        { key: 'cine', header: 'Cine' },
        { key: 'capacidad', header: 'Capacidad' },
        { key: 'tipo', header: 'Tipo' },
        { key: 'equipamiento', header: 'Equipamiento' },
    ],
    formFields: [
        { name: 'numero', placeholder: 'Número de Sala', type: 'number' },
        { name: 'cine', placeholder: 'Código del Cine' },
        { name: 'capacidad', placeholder: 'Capacidad', type: 'number' },
        { name: 'tipo', placeholder: 'Tipo (2D/3D)' },
        { name: 'equipamiento', placeholder: 'Equipamiento' },
    ],
  },
  peliculas: {
    name: 'Películas',
    service: peliculaService,
    columns: [
        { key: 'titulo', header: 'Título' },
        { key: 'genero', header: 'Género' },
        { key: 'duracion', header: 'Duración (min)' },
        { key: 'clasificacion', header: 'Clasificación' },
        { key: 'director', header: 'Director' },
    ],
    formFields: [
        { name: 'codigo', placeholder: 'Código' },
        { name: 'titulo', placeholder: 'Título' },
        { name: 'sinopsis', placeholder: 'Sinopsis' },
        { name: 'reparto', placeholder: 'Reparto (actores separados por coma)' },
        { name: 'clasificacion', placeholder: 'Clasificación' },
        { name: 'idioma', placeholder: 'Idioma' },
        { name: 'director', placeholder: 'Director' },
        { name: 'duracion', placeholder: 'Duración (minutos)', type: 'number' },
        { name: 'genero', placeholder: 'Género' },
        { name: 'fecha_estreno', placeholder: 'Fecha de Estreno', type: 'date' },
        { name: 'trailer', placeholder: 'URL del Trailer' },
        { name: 'poster', placeholder: 'URL del Poster' },
    ],
  },
  funciones: {
    name: 'Funciones',
    service: funcionService,
    columns: [
        { key: 'pelicula', header: 'Película' },
        { key: 'cine', header: 'Cine' },
        { key: 'sala', header: 'Sala' },
        { key: 'fecha', header: 'Fecha' },
        { key: 'hora_inicio', header: 'Hora Inicio' },
        { key: 'precio', header: 'Precio' },
    ],
    formFields: [
        { name: 'pelicula', placeholder: 'Nombre de la Película' },
        { name: 'cine', placeholder: 'Código del Cine' },
        { name: 'sala', placeholder: 'Número de Sala', type: 'number' },
        { name: 'fecha', placeholder: 'Fecha', type: 'date' },
        { name: 'hora_inicio', placeholder: 'Hora de Inicio' },
        { name: 'hora_fin', placeholder: 'Hora de Fin' },
        { name: 'precio', placeholder: 'Precio', type: 'number' },
    ],
  },
  users: {
    name: 'Usuarios',
    service: userService,
    columns: [
        { key: 'identificacion', header: 'Identificación' },
        { key: 'nombre_completo', header: 'Nombre' },
        { key: 'email', header: 'Email' },
        { key: 'cargo', header: 'Cargo' },
    ],
    formFields: [
        { name: 'identificacion', placeholder: 'Identificación' },
        { name: 'nombre_completo', placeholder: 'Nombre Completo' },
        { name: 'telefono', placeholder: 'Teléfono' },
        { name: 'email', placeholder: 'Email', type: 'email' },
        { name: 'cargo', placeholder: 'Administrador', defaultValue: 'Administrador', disabled: true },
        { name: 'password', placeholder: 'Contraseña', type: 'password' },
    ],
  },
  reportes: {
    name: 'Reportes',
    service: reporteService,
  }
};

function Dashboard() {
  const [currentView, setCurrentView] = useState('cines');
  const [formOptions, setFormOptions] = useState({});

  const fetchDropdownData = async () => {
    try {
      const [cinesRes, peliculasRes, salasRes] = await Promise.all([
        cineService.getAll(),
        peliculaService.getAll(),
        salaService.getAll(),
      ]);

      const cineOptions = cinesRes.map(c => ({ value: c._id, label: c.nombre }));
      const peliculaOptions = peliculasRes.map(p => ({ value: p._id, label: p.titulo }));
      const salaOptions = salasRes.map(s => ({ value: s._id, label: `${s.cineInfo.nombre} - ${s.codigo}` }));

      setFormOptions({
        cines: cineOptions,
        peliculas: peliculaOptions,
        salas: salaOptions
      });
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  useEffect(() => {
    fetchDropdownData();
  }, [currentView]);

  const renderView = () => {
    if (currentView === 'reportes') {
      return <ReportesPage />;
    }

    const resource = resources[currentView];
    if (!resource) return <div>Seleccione una opción del menú</div>;

    const hydratedFormFields = resource.formFields.map(field => {
      if (field.name === 'cine_id') return { ...field, options: formOptions.cines || [] };
      if (field.name === 'pelicula_id') return { ...field, options: formOptions.peliculas || [] };
      if (field.name === 'sala_id') return { ...field, options: formOptions.salas || [] };
      return field;
    });

    return (
      <ResourcePage
        key={currentView}
        resourceName={resource.name}
        apiService={resource.service}
        columns={resource.columns}
        formFields={hydratedFormFields}
        onDataChange={fetchDropdownData}
      />
    );
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarTitle>Cines Acme</SidebarTitle>
        <Nav>
          {Object.keys(resources).map(key => (
            <NavButton 
              key={key} 
              active={currentView === key}
              onClick={() => setCurrentView(key)}>
              {resources[key].name}
            </NavButton>
          ))}
        </Nav>
        <LogoutButton onClick={handleLogout}>Salir</LogoutButton>
      </Sidebar>
      <Content>
        {renderView()}
      </Content>
    </DashboardContainer>
  );
}

export default Dashboard;