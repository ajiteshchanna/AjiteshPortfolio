import { z } from "zod";

export const CONTACT_MESSAGE_MAX = 2000;
export const CONTACT_SUBJECT_MAX = 160;
export const CONTACT_NAME_MAX = 80;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter at least 2 characters.").max(CONTACT_NAME_MAX, "Name is too long."),
  email: z.email("Please enter a valid email address."),
  subject: z.string().trim().min(4, "Subject should be at least 4 characters.").max(CONTACT_SUBJECT_MAX, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(20, "Message should be at least 20 characters.")
    .max(CONTACT_MESSAGE_MAX, `Message should be at most ${CONTACT_MESSAGE_MAX} characters.`),
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export type ContactField = keyof ContactFormValues;

export type FieldErrors = Partial<Record<ContactField, string>>;
