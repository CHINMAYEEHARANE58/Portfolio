import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact";
const valid = { name: "A Person", email: "person@example.com", subject: "Project inquiry", message: "Hello, I would like to talk about a project.", website: "" };
describe("contact validation", () => {
  it("accepts a valid message", () => expect(contactSchema.safeParse(valid).success).toBe(true));
  it("rejects invalid email and short message", () => expect(contactSchema.safeParse({ ...valid, email: "bad", message: "Hi" }).success).toBe(false));
  it("rejects header newlines and very long values", () => expect(contactSchema.safeParse({ ...valid, subject: "Hello\nBcc: hidden@example.com" }).success).toBe(false));
});
