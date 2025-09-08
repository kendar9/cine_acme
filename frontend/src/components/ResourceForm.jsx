import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff; /* Default background */
  color: #333; /* Default text color */

  &:disabled {
    background-color: #5a6a8a; /* A slightly different dark background for disabled state */
    color: #ffffff; /* White text for disabled state */
    opacity: 0.7; /* Make it look disabled but readable */
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ResourceForm = ({ fields, onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialState = {};
    fields.forEach(field => {
      // Use initialData if available, otherwise use defaultValue or empty string
      let value = '';
      if (initialData) {
        // Handle nested data for selects, e.g., initialData['cine_id']
        value = initialData[field.name] || '';
      } else {
        value = field.defaultValue || '';
      }
      initialState[field.name] = value;
    });
    setFormData(initialState);
  }, [initialData, fields, JSON.stringify(fields.map(f => f.options))]); // Dependency on options

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {fields.map(field => {
        if (field.type === 'select') {
          return (
            <Select key={field.name} name={field.name} value={formData[field.name] || ''} onChange={handleChange}>
              <option value="">{field.placeholder}</option>
              {field.options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Select>
          );
        }
        return (
          <Input
            key={field.name}
            name={field.name}
            type={field.type || 'text'}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={handleChange}
            disabled={field.disabled || false}
            required
          />
        );
      })}
      <div>
        <Button type="submit">{initialData ? 'Actualizar' : 'Crear'}</Button>
        <Button type="button" onClick={onCancel} style={{ marginLeft: '10px', backgroundColor: '#6c757d' }}>Cancelar</Button>
      </div>
    </FormContainer>
  );
};

export default ResourceForm;
