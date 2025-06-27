import express from 'express';
import {
  createVision,
  getAllVisions,
  getVisionById,
  updateVision,
  deleteVision
} from './vision.controller.js';
import { adminMiddleware, verifyToken } from '../../core/middlewares/authMiddleware.js';


const router = express.Router();


router
  .route('/')
  .post(verifyToken, adminMiddleware, createVision)
  .get(verifyToken, getAllVisions);

router
  .route('/:id')
  .get(verifyToken, getVisionById)
  .put(verifyToken, adminMiddleware, updateVision)
  .delete(verifyToken, adminMiddleware, deleteVision);


export default router;
