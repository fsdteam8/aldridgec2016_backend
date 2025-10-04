import mongoose, { Schema } from 'mongoose';

const AiMessageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const AiMessage = mongoose.models.AiMessage || mongoose.model('AiMessage', AiMessageSchema);
export default AiMessage;