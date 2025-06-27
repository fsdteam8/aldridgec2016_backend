import Vision from "./vision.model.js";


export const createVisionService = async (taskData, userId) => {
  return await Vision.create({ ...taskData, createdBy: userId });
};

export const getAllVisionsService = async () => {
  return await Vision.find().sort({ createdAt: 1 });
};

export const getVisionByIdService = async (taskId) => {
  return await Vision.findOne({ _id: taskId });
};

export const updateVisionService = async (taskId, updateData, userId) => {
  const task = await Vision.findOne({ _id: taskId, createdBy: userId });
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


export const deleteVisionService = async (taskId, userId) => {
  return await Vision.findOneAndDelete({ _id: taskId, createdBy: userId });
};
