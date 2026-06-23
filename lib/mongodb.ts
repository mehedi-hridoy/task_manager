import mongoose from "mongoose";

/**
 * MongoDB connection string from environment variables.
 * Must be defined in .env.local — see README for setup instructions.
 */
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define MONGODB_URI in your .env.local file"
  );
}

/**
 * Connects to MongoDB if not already connected.
 * Uses mongoose's built-in connection state tracking to avoid
 * opening duplicate connections during hot reloads in development.
 */
export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(MONGODB_URI);
}