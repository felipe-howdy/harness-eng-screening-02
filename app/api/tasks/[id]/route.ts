import { NextRequest, NextResponse } from "next/server";
import { deleteTask, updateTask } from "@/lib/taskStore";

const PATCHABLE = ["title", "description", "completed"];

function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await req.json().catch(() => null);
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return badRequest("body must be a JSON object");
  }
  const unknown = Object.keys(body).filter((k) => !PATCHABLE.includes(k));
  if (unknown.length > 0) {
    return badRequest(`fields not allowed: ${unknown.join(", ")}`);
  }
  const patch: { title?: string; description?: string; completed?: boolean } = {};
  if ("title" in body) {
    if (typeof body.title !== "string" || body.title.trim() === "") {
      return badRequest("title must be a non-empty string");
    }
    patch.title = body.title.trim();
  }
  if ("description" in body) {
    if (typeof body.description !== "string") {
      return badRequest("description must be a string");
    }
    patch.description = body.description.trim() || undefined;
  }
  if ("completed" in body) {
    if (typeof body.completed !== "boolean") {
      return badRequest("completed must be a boolean");
    }
    patch.completed = body.completed;
  }
  const updated = updateTask(params.id, patch);
  if (!updated) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const ok = deleteTask(params.id);
  if (!ok) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
