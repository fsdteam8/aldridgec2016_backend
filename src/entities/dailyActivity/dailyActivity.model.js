import mongoose, { Schema } from "mongoose";

const dailyActivitySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: String,
      required: true 
    },
    subTasksCompleted: [
      {
        taskId: { type: Schema.Types.ObjectId, ref: "Task" },
        subTaskIndex: { type: Number }
      }
    ]
  },
  {
    timestamps: true
  }
);

dailyActivitySchema.index({ user: 1, date: 1 }, { unique: true });

const DailyActivity = mongoose.model("DailyActivity", dailyActivitySchema);
export default DailyActivity;
