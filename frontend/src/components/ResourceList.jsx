import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #2a3a5a; /* Darker table background */
  color: #ffffff; /* White text */

  th, td {
    border: 1px solid #4a5a7a; /* Lighter border for contrast */
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #3a4a6a; /* Slightly different header background */
  }
`;

const ActionsTd = styled.td`
  button {
    margin-right: 5px;
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button:first-of-type {
      background-color: #ffc107;
  }
  button:last-of-type {
      background-color: #dc3545;
      color: white;
  }
`;


const getNestedValue = (obj, path) => {
  if (!path) return '';
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};


const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return 'Fecha inválida';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const ResourceList = ({ data, columns, onEdit, onDelete }) => {
  return (
    <Table>
      <thead>
        <tr>
          {columns.map(col => <th key={col.key}>{col.header}</th>)}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(col => {
              const value = getNestedValue(item, col.key);
              const displayValue = col.type === 'datetime' ? formatDateTime(value) : String(value ?? '');
              return <td key={col.key}>{displayValue}</td>;
            })}
            <ActionsTd>
              <button onClick={() => onEdit(item)}>Editar</button>
              <button onClick={() => onDelete(item._id)}>Eliminar</button>
            </ActionsTd>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ResourceList;