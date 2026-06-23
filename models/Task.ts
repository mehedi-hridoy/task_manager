import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Task ||
  mongoose.model("Task", taskSchema);