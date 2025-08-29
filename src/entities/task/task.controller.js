import { generateResponse } from '../../lib/responseFormate.js';
import { createTaskService, deleteTaskService, getAllTasksService, getTaskByIdService, updateTaskService } from './task.service.js';


export const createTask = async (req, res) => {
  try {
    const task = await createTaskService(req.body, req.user._id);
    generateResponse(res, 201, true, 'Task created successfully', task);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to create task', null);
  }
};


export const getAllTasks = async (req, res) => {
  try {
    const tasks = await getAllTasksService();
    generateResponse(res, 200, true, 'Tasks fetched successfully', tasks);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to fetch tasks', null);
  }
};


export const getTaskById = async (req, res) => {
  try {
    const task = await getTaskByIdService(req.params.id);
    if (!task) {
      return generateResponse(res, 404, false, 'Task not found', null);
    }
    generateResponse(res, 200, true, 'Task fetched successfully', task);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to fetch task', null);
  }
};


export const updateTask = async (req, res) => {
  try {
    const task = await updateTaskService(req.params.id, req.body, req.user._id);

    if (!task) {
      return generateResponse(res, 404, false, 'Task not found or unauthorized', null);
    }

    generateResponse(res, 200, true, 'Task updated successfully', task);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to update task', null);
  }
};


export const deleteTask = async (req, res) => {
  try {
    const task = await deleteTaskService(req.params.id, req.user._id);
    if (!task) {
      return generateResponse(res, 404, false, 'Task not found or unauthorized', null);
    }
    generateResponse(res, 200, true, 'Task deleted successfully', task);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, false, 'Failed to delete task', null);
  }
};
