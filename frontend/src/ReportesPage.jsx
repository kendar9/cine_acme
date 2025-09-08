import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { reporteService, cineService, peliculaService } from './services';

const ReportsContainer = styled.div`
  color: #e0e0e0;
`;

const ReportHeader = styled.h2`
  font-size: 28px;
  color: white;
  margin-bottom: 30px;
  border-bottom: 2px solid #e94560;
  padding-bottom: 10px;
`;

const ReportSection = styled.div`
  background-color: #1a1a2e;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ReportTitle = styled.h3`
  color: #e94560;
  margin-top: 0;
`;

const Input = styled.input`
  padding: 8px;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  padding: 8px;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ReportButton = styled.button`
  background-color: #0f3460;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1a5f9e;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #1f2940;
  color: white;
`;

const Th = styled.th`
  background-color: #0f3460;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #e94560;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #2a2a4e;
`;

const ErrorMessage = styled.p`
  color: #e94560;
`;

const ReportesPage = () => {
  const [reportData, setReportData] = useState(null);
  const [currentReport, setCurrentReport] = useState('');
  const [error, setError] = useState('');
  const [cines, setCines] = useState([]);
  const [peliculas, setPeliculas] = useState([]);
  const [params, setParams] = useState({
    funciones: { cine: '', pelicula: '' },
    vigentes: { cine: '', fecha: '' },
    proyectadas: { fecha_inicio: '', fecha_fin: '' },
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [cinesData, peliculasData] = await Promise.all([
          cineService.getAll(),
          peliculaService.getAll(),
        ]);
        setCines(cinesData);
        setPeliculas(peliculasData);
      } catch (err) {
        console.error("Error fetching dropdown data", err);
        setError('No se pudieron cargar los datos para los filtros.');
      }
    };
    fetchDropdownData();
  }, []);

  const handleParamChange = (report, field, value) => {
    setParams(prev => ({
      ...prev,
      [report]: { ...prev[report], [field]: value },
    }));
  };

  const fetchReport = async (reportName) => {
    setError('');
    setReportData(null);
    setCurrentReport(reportName);
    try {
      let data;
      if (reportName === 'Funciones Disponibles') {
        const { cine, pelicula } = params.funciones;
        if (!cine || !pelicula) {
          setError('Por favor, seleccione un cine y una película.');
          return;
        }
        data = await reporteService.getFuncionesDisponibles(cine, pelicula);
      } else if (reportName === 'Películas Vigentes') {
        const { cine, fecha } = params.vigentes;
        if (!cine || !fecha) {
          setError('Por favor, seleccione un cine e ingrese la fecha.');
          return;
        }
        data = await reporteService.getPeliculasVigentes(cine, fecha);
      } else if (reportName === 'Películas Proyectadas') {
        const { fecha_inicio, fecha_fin } = params.proyectadas;
        if (!fecha_inicio || !fecha_fin) {
          setError('Por favor, ingrese la fecha de inicio y fin.');
          return;
        }
        data = await reporteService.getPeliculasProyectadas(fecha_inicio, fecha_fin);
      }
      setReportData(data);
    } catch (err) {
      console.error(`Error fetching report: ${reportName}`, err);
      setError(err.message || 'Ocurrió un error al generar el reporte.');
    }
  };

  const renderCell = (data, header) => {
    if (header === 'fecha_hora') {
      const date = new Date(data);
      return date.toLocaleString('es-ES', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      });
    }
    if (typeof data === 'object' && data !== null) {
      return JSON.stringify(data);
    }
    if (typeof data === 'boolean') {
        return data ? 'Sí' : 'No';
    }
    if (data === null || data === undefined) {
        return 'N/A';
    }
    return String(data);
  };

  const renderTable = () => {
    if (!reportData) return null;
    if (reportData.length === 0) return <p>No se encontraron resultados.</p>;

    const headers = Object.keys(reportData[0]).filter(h => h !== 'funcion_id');

    return (
      <>
        <h3>{currentReport}</h3>
        <Table>
          <thead>
            <tr>
              {headers.map(header => <Th key={header}>{header.replace(/_/g, ' ').toUpperCase()}</Th>)}
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, index) => (
              <tr key={index}>
                {headers.map(header => <Td key={header}>{renderCell(row[header], header)}</Td>)}
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  };

  return (
    <ReportsContainer>
      <ReportHeader>Reportes</ReportHeader>

      <ReportSection>
        <ReportTitle>Funciones Disponibles</ReportTitle>
        <Select value={params.funciones.cine} onChange={e => handleParamChange('funciones', 'cine', e.target.value)}>
          <option value="">Seleccionar Cine</option>
          {cines.map(cine => <option key={cine._id} value={cine.nombre}>{cine.nombre}</option>)}
        </Select>
        <Select value={params.funciones.pelicula} onChange={e => handleParamChange('funciones', 'pelicula', e.target.value)}>
          <option value="">Seleccionar Película</option>
          {peliculas.map(pelicula => <option key={pelicula._id} value={pelicula.titulo}>{pelicula.titulo}</option>)}
        </Select>
        <ReportButton onClick={() => fetchReport('Funciones Disponibles')}>Generar</ReportButton>
      </ReportSection>

      <ReportSection>
        <ReportTitle>Películas Vigentes</ReportTitle>
        <Select value={params.vigentes.cine} onChange={e => handleParamChange('vigentes', 'cine', e.target.value)}>
          <option value="">Seleccionar Cine</option>
          {cines.map(cine => <option key={cine._id} value={cine.nombre}>{cine.nombre}</option>)}
        </Select>
        <Input type="date" onChange={e => handleParamChange('vigentes', 'fecha', e.target.value)} />
        <ReportButton onClick={() => fetchReport('Películas Vigentes')}>Generar</ReportButton>
      </ReportSection>

      <ReportSection>
        <ReportTitle>Películas Proyectadas</ReportTitle>
        <Input type="date" onChange={e => handleParamChange('proyectadas', 'fecha_inicio', e.target.value)} />
        <Input type="date" onChange={e => handleParamChange('proyectadas', 'fecha_fin', e.target.value)} />
        <ReportButton onClick={() => fetchReport('Películas Proyectadas')}>Generar</ReportButton>
      </ReportSection>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {renderTable()}
    </ReportsContainer>
  );
};

export default ReportesPage;