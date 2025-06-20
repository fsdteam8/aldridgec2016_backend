import mongoose, { Schema } from "mongoose";

const subTaskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    order: { type: Number, default: 0 }
  },
  { _id: false }
);

const taskSchema = new Schema(
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

const Task = mongoose.model("Task", taskSchema);
export default Task;
