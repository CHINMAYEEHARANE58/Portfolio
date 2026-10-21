import { z } from "zod";
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Name is too long."),
  email: z.email("Please enter a valid email address.").max(254),
  subject: z.string().trim().min(3, "Please enter a subject.").max(120, "Subject is too long.").refine(value => !/[\r\n]/.test(value), "Subject must be one line."),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(5000, "Message is too long."),
  website: z.string().max(200).optional().default("")
});
export function contactEnabled() { return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN); }
