import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";

export async function GET() {
  try {
    await connectDB();

    const tasks = await Task.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const task = await Task.create(body);

    return NextResponse.json(task, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}