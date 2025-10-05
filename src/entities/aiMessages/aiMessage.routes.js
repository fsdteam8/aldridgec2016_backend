import express from 'express';
import {
  createAiMessage,
  getAllAiMessages,
  getAiMessageById,
  updateAiMessage,
  deleteAiMessage,
  getAiMessageByuid
} from './aiMessage.controller.js';
import { verifyToken, userMiddleware } from '../../core/middlewares/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(verifyToken, userMiddleware, createAiMessage)
  .get(verifyToken, userMiddleware, getAllAiMessages);

router
  .route('/:id')
  .get(verifyToken, userMiddleware, getAiMessageById)
  .put(verifyToken, userMiddleware, updateAiMessage)
  .delete(verifyToken, userMiddleware, deleteAiMessage);

  router.route('/uid/:id')
  .get(verifyToken, userMiddleware, getAiMessageByuid)

export default router;