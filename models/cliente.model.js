
import { connectDB } from '../database/connection.js';

export const getClientesCollection = async () => {
    const db = await connectDB();
    return db.collection('clientes');
};

export const Cliente = {
    identificacion: { type: 'string' },
    nombreCompleto: { type: 'string' },
    email: { type: 'string' },
    telefono: { type: 'string' },
    puntos: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                fecha: { type: 'date' },
                cantidad: { type: 'number' }
            }
        }
    }
};
