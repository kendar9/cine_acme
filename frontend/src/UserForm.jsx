
import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from './UserForm.styles';

const UserForm = ({ onSave, user = {} }) => {
    const [formData, setFormData] = useState({
        identificacion: '',
        nombre_completo: '',
        telefono: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                identificacion: user.identificacion || '',
                nombre_completo: user.nombre_completo || '',
                telefono: user.telefono || '',
                email: user.email || '',
                password: '', 
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Identificación</Label>
                <Input type="text" name="identificacion" value={formData.identificacion} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label>Nombre Completo</Label>
                <Input type="text" name="nombre_completo" value={formData.nombre_completo} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label>Teléfono</Label>
                <Input type="text" name="telefono" value={formData.telefono} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label>Contraseña</Label>
                <Input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder={user?._id ? "Dejar en blanco para no cambiar" : "Mínimo 6 caracteres"} 
                    required={!user?._id} 
                    minLength="6" 
                />
            </FormGroup>
            <Button type="submit">Guardar</Button>
        </Form>
    );
};

export default UserForm;
