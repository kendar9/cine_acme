
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUsers, deleteUser, createUser, updateUser } from './services';
import { Table, Th, Td, Tr, Thead, Tbody, Button, AddButton } from './Users.styles';
import Modal from './Modal';
import UserForm from './UserForm';
import ConfirmationDialog from './ConfirmationDialog'; 

const UserContainer = styled.div`
  color: white;
`;

function User() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = () => {
        setSelectedUser(null);
        setIsFormModalOpen(true);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsFormModalOpen(true);
    };

    const handleDeleteUser = (userId) => {
        setUserToDelete(userId);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (userToDelete) {
            try {
                await deleteUser(userToDelete);
                fetchUsers();
            } catch (err) {
                setError(err.message || 'Failed to delete user');
            } finally {
                setIsConfirmModalOpen(false);
                setUserToDelete(null);
            }
        }
    };

    const handleFormModalClose = () => {
        setIsFormModalOpen(false);
        setSelectedUser(null);
    };

    const handleSaveUser = async (formData) => {
        try {
            const userData = { ...formData, cargo: 'admin' };

            if (selectedUser && !userData.password) {
                delete userData.password;
            }

            if (selectedUser) {
                await updateUser(selectedUser._id, userData);
            } else {
                await createUser(userData);
            }
            handleFormModalClose();
            fetchUsers();
        } catch (err) {
            setError(err.message || 'No se pudo guardar el usuario');
        }
    };

    if (loading) {
        return <p>Cargando usuarios...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <UserContainer>
            <h2>Gestión de Usuarios</h2>
            <AddButton onClick={handleAddUser}>Añadir Usuario</AddButton>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Nombre</Th>
                        <Th>Email</Th>
                        <Th>Cargo</Th>
                        <Th>Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user) => (
                        <Tr key={user._id}>
                            <Td>{user.nombre_completo}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.cargo}</Td>
                            <Td>
                                <Button onClick={() => handleEditUser(user)}>Editar</Button>
                                <Button className="delete" onClick={() => handleDeleteUser(user._id)}>Eliminar</Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {isFormModalOpen && (
                <Modal onClose={handleFormModalClose} title={selectedUser ? 'Editar Usuario' : 'Añadir Usuario'}>
                    <UserForm onSave={handleSaveUser} user={selectedUser} />
                </Modal>
            )}
            {isConfirmModalOpen && (
                <Modal onClose={() => setIsConfirmModalOpen(false)} title="Confirmar Eliminación">
                    <ConfirmationDialog
                        message="¿Estás seguro de que quieres eliminar este usuario?"
                        onConfirm={handleConfirmDelete}
                        onCancel={() => setIsConfirmModalOpen(false)}
                    />
                </Modal>
            )}
        </UserContainer>
    );
}

export default User;
