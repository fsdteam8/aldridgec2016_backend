import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} from './task.controller.js';
import { userMiddleware, verifyToken } from '../../core/middlewares/authMiddleware.js';


const router = express.Router();

router
  .route('/')
  .post(verifyToken, userMiddleware, createTask)
  .get(getAllTasks);

router
  .route('/:id')
  .get(getTaskById)
  .put(verifyToken, userMiddleware, updateTask)
  .delete(verifyToken, userMiddleware, deleteTask);

export default router;
