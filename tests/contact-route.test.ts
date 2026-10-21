// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";

const valid = { name: "A Person", email: "person@example.com", subject: "Project inquiry", message: "Hello, I would like to talk about a project.", website: "" };
const request = (body: unknown) => new NextRequest("http://localhost:3100/api/contact", { method: "POST", headers: { origin: "http://localhost:3100", host: "localhost:3100", "content-type": "application/json", "x-vercel-forwarded-for": "192.0.2.1" }, body: JSON.stringify(body) });
describe("contact endpoint", () => {
  beforeEach(() => { vi.stubEnv("RESEND_API_KEY", "test"); vi.stubEnv("CONTACT_TO_EMAIL", "to@example.com"); vi.stubEnv("CONTACT_FROM_EMAIL", "from@example.com"); vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example.com"); vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test"); });
  afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
  it("rejects invalid form data before contacting services", async () => { const fetchMock = vi.fn(); vi.stubGlobal("fetch", fetchMock); const response = await POST(request({ ...valid, email: "bad" })); expect(response.status).toBe(400); expect(fetchMock).not.toHaveBeenCalled(); });
  it("fails closed when rate limiting is unavailable", async () => { vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network"))); const response = await POST(request(valid)); expect(response.status).toBe(503); });
  it("reports provider failure without claiming delivery", async () => { vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({ ok: true, json: async () => [{ result: 1 }, { result: 1 }] }).mockResolvedValueOnce({ ok: false })); const response = await POST(request(valid)); expect(response.status).toBe(502); expect((await response.json()).ok).toBeUndefined(); });
  it("reports success only when the provider accepts the message", async () => { vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({ ok: true, json: async () => [{ result: 1 }, { result: 1 }] }).mockResolvedValueOnce({ ok: true })); const response = await POST(request(valid)); expect(response.status).toBe(200); expect((await response.json()).ok).toBe(true); });
  it("rejects a sixth submission in the window", async () => { const fetchMock = vi.fn().mockResolvedValueOnce({ ok: true, json: async () => [{ result: 6 }, { result: 1 }] }); vi.stubGlobal("fetch", fetchMock); const response = await POST(request(valid)); expect(response.status).toBe(429); expect(fetchMock).toHaveBeenCalledTimes(1); });
});
