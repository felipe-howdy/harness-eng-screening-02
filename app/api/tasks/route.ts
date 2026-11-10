import { NextRequest, NextResponse } from "next/server";
import { createTask, getAllTasks } from "@/lib/taskStore";

export async function GET(req: NextRequest) {
  const filter = req.nextUrl.searchParams.get("filter");
  const all = getAllTasks();
  if (filter === "active") {
    return NextResponse.json(all.filter((t) => !t.completed));
  }
  if (filter === "completed") {
    return NextResponse.json(all.filter((t) => t.completed));
  }
  return NextResponse.json(all);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (typeof body?.title !== "string" || body.title.trim() === "") {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }
  const task = createTask({
    title: body.title.trim(),
    description:
      typeof body.description === "string" && body.description.trim() !== ""
        ? body.description.trim()
        : undefined,
  });
  return NextResponse.json(task, { status: 201 });
}
