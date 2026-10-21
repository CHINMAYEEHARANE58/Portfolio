import { createHmac } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { contactSchema, contactEnabled } from "@/lib/contact";

export async function POST(request: NextRequest) {
  if (!contactEnabled()) return NextResponse.json({ error: "The contact form is unavailable. Please use the email link." }, { status: 503 });
  const origin = request.headers.get("origin");
  try { if (origin && new URL(origin).host !== request.headers.get("host")) return NextResponse.json({ error: "Invalid origin." }, { status: 403 }); }
  catch { return NextResponse.json({ error: "Invalid origin." }, { status: 403 }); }
  if (Number(request.headers.get("content-length") || 0) > 12000) return NextResponse.json({ error: "Message is too large." }, { status: 413 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please check the form fields.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = `portfolio:contact:${createHmac("sha256", process.env.UPSTASH_REDIS_REST_TOKEN!).update(ip).digest("hex")}`;
  try {
    const limiter = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/pipeline`, { method: "POST", headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`, "Content-Type": "application/json" }, body: JSON.stringify([["INCR", key], ["EXPIRE", key, 3600]]), cache: "no-store" });
    if (!limiter.ok) throw new Error("Rate limit service unavailable");
    const result = await limiter.json() as { result?: number; error?: string }[];
    if (result.some(item => item.error) || typeof result[0]?.result !== "number") throw new Error("Rate limit service unavailable");
    if (result[0].result > 5) return NextResponse.json({ error: "Too many messages. Please try again later or email directly." }, { status: 429 });
  } catch { return NextResponse.json({ error: "The form is temporarily unavailable. Please email directly." }, { status: 503 }); }
  try {
    const sent = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL, to: [process.env.CONTACT_TO_EMAIL], reply_to: parsed.data.email, subject: `Portfolio: ${parsed.data.subject}`, text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\n\n${parsed.data.message}` }), cache: "no-store" });
    if (!sent.ok) return NextResponse.json({ error: "Your message could not be sent. Please use the email link." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Your message could not be sent. Please use the email link." }, { status: 502 }); }
}
