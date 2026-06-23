import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";

/**
 * PATCH /api/tasks/:id
 * Updates a task by ID. Typically used to change the status field.
 * Accepts any partial task fields in the JSON body.
 * Returns the updated task document.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const body = await request.json();
    const { id } = await params;

    const task = await Task.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tasks/:id
 * Deletes a task by ID. Returns a confirmation message.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    await Task.findByIdAndDelete(id);

    return NextResponse.json({ message: "Task deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}