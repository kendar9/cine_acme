import { Router } from 'express';
import CineController from '../controllers/cine.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, CineController.getCines);
router.get('/:id', verifyToken, CineController.getCineById);
router.post('/', verifyToken, CineController.createCine);
router.put('/:id', verifyToken, CineController.updateCine);
router.delete('/:id', verifyToken, CineController.deleteCine);

export default router;
