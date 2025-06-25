import { io } from "../../app.js";
import ChatRoom from "./chatRoom.model.js";
import Message from "./message.model.js";


export const createChatRoomService = async (participantIds, name, isGroup, avatar) => {
  if (!participantIds || participantIds.length < 2) {
    throw new Error("At least 2 participants are required.");
  }

  const room = await ChatRoom.create({
    name: isGroup ? name : null,
    isGroup,
    avatar: isGroup ? avatar : null,
    participants: participantIds
  });

  return room;
};


export const updateChatRoomService = async (roomId, updates) => {
  const room = await ChatRoom.findByIdAndUpdate(roomId, updates, {
    new: true
  });

  if (!room) throw new Error("Room not found");
  return room;
};


export const joinParticipantsService = async (roomId, userIds, currentUserId) => {
  const room = await ChatRoom.findById(roomId);
  if (!room) throw new Error("Room not found");

  const isParticipant = room.participants.some(id =>
    id.toString() === currentUserId.toString()
  );
  if (!isParticipant) throw new Error("Only room participants can add users");

  const existingSet = new Set(room.participants.map(id => id.toString()));

  const newUsers = userIds.filter(id => !existingSet.has(id.toString()));

  if (newUsers.length === 0) throw new Error("No new users to add");

  room.participants.push(...newUsers);
  await room.save();

  return room;
};


export const kickParticipantService = async (roomId, userIdToKick) => {
  const room = await ChatRoom.findById(roomId);
  if (!room) throw new Error("Room not found");

  const index = room.participants.findIndex(
    id => id.toString() === userIdToKick.toString()
  );

  if (index === -1) throw new Error("User is not a participant of this room");

  room.participants.splice(index, 1);
  await room.save();

  return room;
};


export const leaveChatRoomService = async (roomId, userId) => {
  const room = await ChatRoom.findById(roomId);
  if (!room) throw new Error("Room not found");

  const index = room.participants.findIndex(
    (id) => id.toString() === userId.toString()
  );

  if (index === -1) throw new Error("User is not in this room");

  room.participants.splice(index, 1);
  await room.save();
};



export const getUserChatRoomsService = async (userId) => {
  const rooms = await ChatRoom.find({ participants: userId }).populate("participants", "name email");
  return rooms;
};


export const sendMessageService = async (roomId, senderId, messageText) => {
  const chatRoom = await ChatRoom.findById(roomId);
  if (!chatRoom) throw new Error("Chat room not found");

  const message = await Message.create({
    chatRoom: roomId,
    sender: senderId,
    message: messageText,
    readBy: [senderId]
  });

  // emit
  io.to(`room-${roomId}`).emit("newMessage", message);

  return message;
};


export const getRoomMessagesService = async (roomId, skip, limit) => {
  const messages = await Message.find({ chatRoom: roomId })
    .populate("sender", "name email")
    .sort({ createdAt: -1 }) 
    .skip(Number(skip))
    .limit(Number(limit));

  return messages.reverse(); 
};



export const markMessagesAsReadService = async (roomId, userId) => {
  await Message.updateMany(
    {
      chatRoom: roomId,
      readBy: { $ne: userId }
    },
    {
      $push: { readBy: userId }
    }
  );
};


export const editMessageService = async (messageId, newText, userId) => {
  const message = await Message.findOneAndUpdate(
    { _id: messageId, sender: userId },
    { message: newText },
    { new: true }
  );
  

  if (!message) throw new Error("Message not found or not editable by user");
  
  // emit
  io.to(`room-${roomId}`).emit("editMessage", message);

  return message;
};


export const deleteMessageService = async (messageId, userId) => {
  const message = await Message.findOneAndDelete({
    _id: messageId,
    sender: userId
  });

  if (!message) throw new Error("Message not found or not deletable by user");
};
