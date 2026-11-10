import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/tasks/route";
import { PATCH } from "@/app/api/tasks/[id]/route";
import { createTask, getTask } from "@/lib/taskStore";

const url = "http://localhost/api/tasks";

function patch(id: string, body: string) {
  return PATCH(new NextRequest(`${url}/${id}`, { method: "PATCH", body }), {
    params: { id },
  });
}

describe("PATCH /api/tasks/:id", () => {
  it.each([
    ["id overwrite", { id: "hijacked" }],
    ["createdAt overwrite", { createdAt: "1999-01-01T00:00:00.000Z" }],
    ["client-supplied completedAt", { completedAt: "1999-01-01T00:00:00.000Z" }],
    ["blank title", { title: "   " }],
    ["non-string title", { title: 42 }],
    ["non-boolean completed", { completed: "no" }],
    ["non-string description", { description: 1 }],
  ])("rejects %s with 400 and leaves the task unchanged", async (_, body) => {
    const task = createTask({ title: "keep me" });
    const before = { ...task };
    const res = await patch(task.id, JSON.stringify(body));
    expect(res.status).toBe(400);
    expect(getTask(task.id)).toEqual(before);
  });

  it("rejects malformed JSON with 400", async () => {
    const task = createTask({ title: "keep me" });
    expect((await patch(task.id, "not json")).status).toBe(400);
  });

  it("applies a valid patch, trimming the title", async () => {
    const task = createTask({ title: "old" });
    const res = await patch(task.id, JSON.stringify({ title: " new ", completed: true }));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({
      id: task.id,
      title: "new",
      completed: true,
      completedAt: expect.any(String),
    });
  });

  it("returns 404 for an unknown id", async () => {
    expect((await patch("nope", JSON.stringify({ completed: true }))).status).toBe(404);
  });
});

describe("POST /api/tasks", () => {
  it("rejects malformed JSON with 400", async () => {
    const res = await POST(new NextRequest(url, { method: "POST", body: "not json" }));
    expect(res.status).toBe(400);
  });
});
