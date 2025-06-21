import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} from './task.controller.js';
import { adminMiddleware, verifyToken } from '../../core/middlewares/authMiddleware.js';


const router = express.Router();

router
  .route('/')
  .post(verifyToken, adminMiddleware, createTask)
  .get(getAllTasks);

router
  .route('/:id')
  .get(getTaskById)
  .put(verifyToken, adminMiddleware, updateTask)
  .delete(verifyToken, adminMiddleware, deleteTask);

export default router;
