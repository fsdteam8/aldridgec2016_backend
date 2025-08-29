import { generateResponse } from '../../lib/responseFormate.js';
import { createVisionService, deleteVisionService, getAllVisionsService, getVisionByIdService, updateVisionService } from './vision.service.js';


export const createVision = async (req, res) => {
  try {
    const task = await createVisionService(req.body, req.user._id);
    generateResponse(res, 201, true, 'Vision created successfully', task);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to create vision', null);
  }
};


export const getAllVisions = async (req, res) => {
  try {
    const tasks = await getAllVisionsService();
    generateResponse(res, 200, true, 'Visions fetched successfully', tasks);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to fetch visions', null);
  }
};


export const getVisionById = async (req, res) => {
  try {
    const task = await getVisionByIdService(req.params.id);
    if (!task) {
      return generateResponse(res, 404, false, 'Vision not found', null);
    }
    generateResponse(res, 200, true, 'Vision fetched successfully', task);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to fetch vision', null);
  }
};


export const updateVision = async (req, res) => {
  try {
    const task = await updateVisionService(req.params.id, req.body, req.user._id);

    if (!task) {
      return generateResponse(res, 404, false, 'Vision not found or unauthorized', null);
    }

    generateResponse(res, 200, true, 'Vision updated successfully', task);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to update vision', null);
  }
};


export const deleteVision = async (req, res) => {
  try {
    const task = await deleteVisionService(req.params.id, req.user._id);
    if (!task) {
      return generateResponse(res, 404, false, 'Vision not found or unauthorized', null);
    }
    generateResponse(res, 200, true, 'Vision deleted successfully', task);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to delete vision', null);
  }
};
