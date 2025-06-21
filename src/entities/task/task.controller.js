import { generateResponse } from '../../lib/responseFormate.js';
import { createTaskService, deleteTaskService, getAllTasksService, getTaskByIdService, updateTaskService } from './task.service.js';


export const createTask = async (req, res) => {
  try {
    const task = await createTaskService(req.body, req.user._id);
    generateResponse(res, 201, 'success', 'Task created successfully', task);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, 'fail', 'Failed to create task', null);
  }
};


export const getAllTasks = async (req, res) => {
  try {
    const tasks = await getAllTasksService();
    generateResponse(res, 200, 'success', 'Tasks fetched successfully', tasks);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, 'fail', 'Failed to fetch tasks', null);
  }
};


export const getTaskById = async (req, res) => {
  try {
    const task = await getTaskByIdService(req.params.id);
    if (!task) {
      return generateResponse(res, 404, 'fail', 'Task not found', null);
    }
    generateResponse(res, 200, 'success', 'Task fetched successfully', task);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, 'fail', 'Failed to fetch task', null);
  }
};


export const updateTask = async (req, res) => {
  try {
    const task = await updateTaskService(req.params.id, req.body, req.user._id);

    if (!task) {
      return generateResponse(res, 404, 'fail', 'Task not found or unauthorized', null);
    }

    generateResponse(res, 200, 'success', 'Task updated successfully', task);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, 'fail', 'Failed to update task', null);
  }
};


export const deleteTask = async (req, res) => {
  try {
    const task = await deleteTaskService(req.params.id, req.user._id);
    if (!task) {
      return generateResponse(res, 404, 'fail', 'Task not found or unauthorized', null);
    }
    generateResponse(res, 200, 'success', 'Task deleted successfully', task);
  } catch (error) {
    console.error(error);
    generateResponse(res, 500, 'fail', 'Failed to delete task', null);
  }
};
