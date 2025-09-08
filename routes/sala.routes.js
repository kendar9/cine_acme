import { Router } from 'express';
import SalaController from '../controllers/sala.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { validateCreateSala } from '../middleware/validators.js';

const router = Router();

router.get('/', verifyToken, SalaController.getSalas);
router.get('/:id', verifyToken, SalaController.getSalaById);
router.post('/', verifyToken, validateCreateSala, SalaController.createSala);
router.put('/:id', verifyToken, SalaController.updateSala);
router.delete('/:id', verifyToken, SalaController.deleteSala);

export default router;
