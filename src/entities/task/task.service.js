import Task from "./task.model.js";


export const createTaskService = async (taskData, userId) => {
  return await Task.create({ ...taskData, createdBy: userId });
};

export const getAllTasksService = async () => {
  return await Task.find().sort({ createdAt: 1 });
};

export const getTaskByIdService = async (taskId) => {
  return await Task.findOne({ _id: taskId });
};

export const updateTaskService = async (taskId, updateData, userId) => {
  const task = await Task.findOne({ _id: taskId, createdBy: userId });
  if (!task) return null;

  if (updateData.title !== undefined) task.title = updateData.title;
  if (updateData.description !== undefined) task.description = updateData.description;
  if (updateData.chapterNumber !== undefined) task.chapterNumber = updateData.chapterNumber;
  if (updateData.actionSteps !== undefined) task.actionSteps = updateData.actionSteps;

  // Process subTasks if provided
  if (Array.isArray(updateData.subTasks)) {
    updateData.subTasks.forEach((incoming) => {
      const existing = task.subTasks.find((s) => s.order === incoming.order);

      if (existing) {
        if (incoming.title !== undefined) existing.title = incoming.title;
        if (incoming.description !== undefined) existing.description = incoming.description;
        if (incoming.order !== undefined) existing.order = incoming.order;
      } else {
        task.subTasks.push(incoming); 
      }
    });

    // sort by order
    task.subTasks.sort((a, b) => a.order - b.order);
  }

  return await task.save();
};


export const deleteTaskService = async (taskId, userId) => {
  return await Task.findOneAndDelete({ _id: taskId, createdBy: userId });
};
