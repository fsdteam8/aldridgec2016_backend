import AiMessage from './aiMessage.model.js';

export const createAiMessageService = async (messageData, userId) => {
  return await AiMessage.create({ ...messageData, createdBy: userId });
};

export const getAllAiMessagesService = async (userId) => {
  return await AiMessage.find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .select('title content isRead createdAt');
};

export const getAiMessageByIdService = async (messageId, userId) => {
  return await AiMessage.findOne({ _id: messageId, createdBy: userId })
    .select('title content isRead createdAt');
};

export const updateAiMessageService = async (messageId, updateData, userId) => {
  const message = await AiMessage.findOne({ _id: messageId, createdBy: userId });
  if (!message) return null;

  if (updateData.title !== undefined) message.title = updateData.title;
  if (updateData.content !== undefined) message.content = updateData.content;
  if (updateData.isRead !== undefined) message.isRead = updateData.isRead;

  return await message.save();
};

export const deleteAiMessageService = async (messageId, userId) => {
  return await AiMessage.findOneAndDelete({ _id: messageId, createdBy: userId });
};