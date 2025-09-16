import express from 'express';
import {
  createVision,
  getAllVisions,
  getVisionById,
  updateVision,
  deleteVision
} from './vision.controller.js';
import { userMiddleware, verifyToken } from '../../core/middlewares/authMiddleware.js';


const router = express.Router();


router
  .route('/')
  .post(verifyToken, userMiddleware, createVision)
  .get(verifyToken, getAllVisions);

router
  .route('/:id')
  .get(verifyToken, getVisionById)
  .put(verifyToken, userMiddleware, updateVision)
  .delete(verifyToken, userMiddleware, deleteVision);


export default router;
