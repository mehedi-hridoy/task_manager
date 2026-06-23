import mongoose from "mongoose";

/**
 * Mongoose schema for a Task document.
 *
 * Fields:
 *  - title:       Name of the task
 *  - description: Brief details about what the task involves
 *  - status:      Current progress — one of "To Do", "In Progress", or "Done"
 *
 * The `timestamps` option automatically adds createdAt and updatedAt fields.
 */
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
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

/**
 * Reuses an existing compiled model if one exists (hot-reload safe),
 * otherwise compiles a new model from the schema.
 */
export default mongoose.models.Task ||
  mongoose.model("Task", taskSchema);