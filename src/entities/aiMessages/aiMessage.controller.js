import { generateResponse } from '../../lib/responseFormate.js';
import {
  createAiMessageService,
  getAllAiMessagesService,
  getAiMessageByIdService,
  updateAiMessageService,
  deleteAiMessageService
} from './aiMessage.service.js';

export const createAiMessage = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return generateResponse(res, 400, false, 'Title and content are required', null);
    }
    const message = await createAiMessageService({ title, content }, req.user._id);
    generateResponse(res, 201, true, 'AI Message created successfully', message);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to create AI message', null);
  }
};

export const getAllAiMessages = async (req, res) => {
  try {
    const messages = await getAllAiMessagesService(req.user._id);
    generateResponse(res, 200, true, 'AI Messages fetched successfully', messages);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to fetch AI messages', null);
  }
};

export const getAiMessageById = async (req, res) => {
  try {
    const message = await getAiMessageByIdService(req.params.id, req.user._id);
    if (!message) {
      return generateResponse(res, 404, false, 'AI Message not found or unauthorized', null);
    }
    generateResponse(res, 200, true, 'AI Message fetched successfully', message);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to fetch AI message', null);
  }
};

export const updateAiMessage = async (req, res) => {
  try {
    const { title, content, isRead } = req.body;
    if (!title && !content && isRead === undefined) {
      return generateResponse(res, 400, false, 'At least one field is required to update', null);
    }
    const message = await updateAiMessageService(req.params.id, req.body, req.user._id);
    if (!message) {
      return generateResponse(res, 404, false, 'AI Message not found or unauthorized', null);
    }
    generateResponse(res, 200, true, 'AI Message updated successfully', message);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to update AI message', null);
  }
};

export const deleteAiMessage = async (req, res) => {
  try {
    const message = await deleteAiMessageService(req.params.id, req.user._id);
    if (!message) {
      return generateResponse(res, 404, false, 'AI Message not found or unauthorized', null);
    }
    generateResponse(res, 200, true, 'AI Message deleted successfully', null);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to delete AI message', null);
  }
};