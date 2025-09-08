import { Router } from 'express';
import {
    createCliente,
    getClientes,
    getClienteById,
    updateCliente,
    deleteCliente,
    addPuntos,
    getFidelityReport
} from '../controllers/cliente.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', [verifyToken], createCliente);
router.get('/', [verifyToken], getClientes);
router.get('/reporte-fidelidad', [verifyToken], getFidelityReport);
router.get('/:id', [verifyToken], getClienteById);
router.put('/:id', [verifyToken], updateCliente);
router.delete('/:id', [verifyToken], deleteCliente);
router.post('/:id/puntos', [verifyToken], addPuntos);


export default router;
