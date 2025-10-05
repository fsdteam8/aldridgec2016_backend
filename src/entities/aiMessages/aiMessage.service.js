import mongoose from 'mongoose';
import AiMessage from './aiMessage.model.js';

export const createAiMessageService = async (messageData, userId) => {
  return await AiMessage.create({ ...messageData, createdBy: userId });
};

export const getAllAiMessagesService = async (userId) => {
return await AiMessage.aggregate([
    {
      $match: { createdBy: new mongoose.Types.ObjectId(userId) }
    },
    {
      $group: {
        _id: "$uid",               // group by Uid
        title: { $first: "$title" } // take the first title for each Uid
      }
    },
    {
      $project: {
        _id: 0,       // remove default _id
        uid: "$_id",  // rename _id to Uid
        title: 1
      }
    },
    {
      $sort: { title: 1 } // optional: sort alphabetically or however you want
    }
  ]);
};

export const getAiMessageByIdService = async (messageId, userId) => {
  return await AiMessage.findOne({ _id: messageId, createdBy: userId })
    .select('title content isRead createdAt');
};
export const getAiMessageByUidService = async (messageId, userId) => {
  return await AiMessage.findOne({ uid: messageId, createdBy: userId })
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