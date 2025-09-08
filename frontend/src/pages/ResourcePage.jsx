import React, { useState, useEffect, useCallback } from 'react';
import ResourceList from '../components/ResourceList';
import ResourceForm from '../components/ResourceForm';
import Modal from '../Modal'; 

import ConfirmationDialog from '../components/ConfirmationDialog';

const ResourcePage = ({ resourceName, apiService, columns, formFields, onDataChange }) => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null); 

  const fetchData = useCallback(async () => {
    try {
      const response = await apiService.getAll();
      console.log(`Data received for ${resourceName}:`, response);
      setData(response); 
    } catch (error) {
      console.error(`Error fetching ${resourceName}:`, error);
      setData([]); 
    }
  }, [apiService, resourceName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFormSubmit = async (formData) => {
    try {
      const dataToSubmit = { ...formData };

      // Frontend validation for 'numero_sillas'
      if (resourceName === 'Salas' && dataToSubmit.numero_sillas && parseInt(dataToSubmit.numero_sillas, 10) < 0) {
        alert('El número de sillas no puede ser negativo.');
        return;
      }
      
      // Ensure numeric fields are numbers
      if (resourceName === 'Salas' && dataToSubmit.numero_sillas) {
        dataToSubmit.numero_sillas = parseInt(dataToSubmit.numero_sillas, 10);
      }
      if (resourceName === 'Películas' && dataToSubmit.duracion) {
        dataToSubmit.duracion = parseInt(dataToSubmit.duracion, 10);
      }

      if (resourceName === 'Películas' && typeof dataToSubmit.reparto === 'string') {
        dataToSubmit.reparto = dataToSubmit.reparto.trim() === '' ? [] : dataToSubmit.reparto.split(',').map(actor => actor.trim());
      }

      if (editingItem) {
        await apiService.update(editingItem._id, dataToSubmit);
      } else {
        await apiService.create(dataToSubmit);
      }
      fetchData();
      if (onDataChange) onDataChange();
      closeModal();
    } catch (error) {
      console.error(`Error saving ${resourceName}:`, error);
      alert(`Error al guardar: ${error.message}`); // Show error to user
    }
  };

  const handleEdit = (item) => {
    
    const itemToEdit = { ...item };
    if (resourceName === 'Películas' && Array.isArray(itemToEdit.reparto)) {
        itemToEdit.reparto = itemToEdit.reparto.join(', ');
    }
    setEditingItem(itemToEdit);
    setIsModalOpen(true);
  };

  
  const handleDeleteRequest = (id) => {
    setDeleteItemId(id);
  };

  
  const executeDelete = async () => {
    if (!deleteItemId) return;
    try {
      await apiService.delete(deleteItemId);
      fetchData();
      if (onDataChange) onDataChange();
    } catch (error) {
      console.error(`Error deleting ${resourceName}:`, error);
    }
    setDeleteItemId(null); 
  };

  const openModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div>
      <h2>Gestión de {resourceName}</h2>
      <button onClick={openModal}>Crear Nuevo</button>
      <ResourceList data={data || []} columns={columns} onEdit={handleEdit} onDelete={handleDeleteRequest} />
      
      
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <ResourceForm
            fields={formFields}
            onSubmit={handleFormSubmit}
            initialData={editingItem}
            onCancel={closeModal}
          />
        </Modal>
      )}

      
      {deleteItemId && (
        <ConfirmationDialog 
          message="¿Estás seguro de que quieres eliminar este elemento?"
          onConfirm={executeDelete}
          onCancel={() => setDeleteItemId(null)}
        />
      )}
    </div>
  );
};

export default ResourcePage;