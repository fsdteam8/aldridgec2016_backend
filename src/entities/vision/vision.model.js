import mongoose, { Schema } from "mongoose";

const subTaskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 }
  },
  { _id: false }
);

const visionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    chapterNumber: {
      type: Number,
      default: 0
    },
    subTasks: {
      type: [subTaskSchema],
      default: []
    },
    actionSteps: {
      type: String
    },
    tips: {
      type: String
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Vision = mongoose.model("Vision", visionSchema);
export default Vision;
