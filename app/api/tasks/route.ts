import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";

/**
 * GET /api/tasks
 * Returns all tasks sorted by creation date (newest first).
 */
export async function GET() {
  try {
    await connectDB();

    const tasks = await Task.find().sort({ createdAt: -1 });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tasks
 * Creates a new task. Expects JSON body with: title, description, status.
 * Returns 400 if title or description is missing.
 */
export async function POST(request: Request) {
  try {
    await connectDB();

    const { title, description, status } = await request.json();

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!description?.trim()) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    const task = await Task.create({
      title: title.trim(),
      description: description.trim(),
      status,
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}