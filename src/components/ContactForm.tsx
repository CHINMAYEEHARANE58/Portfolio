"use client";
import { useState } from "react";
import { profile } from "@/content/profile";
type Field = "name" | "email" | "subject" | "message";
type Fields = Partial<Record<Field, string[]>>;
export function ContactForm() {
  const [pending, setPending] = useState(false); const [success, setSuccess] = useState(false); const [error, setError] = useState(""); const [fields, setFields] = useState<Fields>({});
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setError(""); setFields({});
    const form = event.currentTarget; const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json() as { ok?: boolean; error?: string; fields?: Fields };
      if (!response.ok || !result.ok) { setError(result.error || "The message could not be sent."); setFields(result.fields || {}); return; }
      form.reset(); setSuccess(true);
    } catch { setError("The message could not be sent. Please email directly."); } finally { setPending(false); }
  }
  if (success) return <div className="form-success" role="status"><h2>Message sent.</h2><p>Thank you for reaching out. I&apos;ll get back to you when I can.</p><button type="button" className="text-link" onClick={() => setSuccess(false)}>Send another message ↗</button></div>;
  return <form className="contact-form" onSubmit={submit} noValidate><div className="form-row"><div className="field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100} aria-invalid={!!fields.name} aria-describedby={fields.name ? "name-error" : undefined}/>{fields.name && <span id="name-error" className="field-error">{fields.name[0]}</span>}</div><div className="field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" required aria-invalid={!!fields.email} aria-describedby={fields.email ? "email-error" : undefined}/>{fields.email && <span id="email-error" className="field-error">{fields.email[0]}</span>}</div></div><div className="field"><label htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" required maxLength={120} aria-invalid={!!fields.subject} aria-describedby={fields.subject ? "subject-error" : undefined}/>{fields.subject && <span id="subject-error" className="field-error">{fields.subject[0]}</span>}</div><div className="field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" required minLength={10} maxLength={5000} rows={6} aria-invalid={!!fields.message} aria-describedby={fields.message ? "message-error" : undefined}/>{fields.message && <span id="message-error" className="field-error">{fields.message[0]}</span>}</div><div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off"/></div>{error && <p className="form-error" role="alert">{error} <a href={`mailto:${profile.email}`}>Email directly ↗</a></p>}<button className="button button-primary" type="submit" disabled={pending}>{pending ? "Sending…" : "Send message ↗"}</button></form>;
}
