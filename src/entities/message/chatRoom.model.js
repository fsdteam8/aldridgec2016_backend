import mongoose, { Schema } from "mongoose";

const chatRoomSchema = new Schema(
  {
    name: {
      type: String,  
    },
    isGroup: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      trim: true
    },
    avatar: {
      type: String, 
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
export default ChatRoom;