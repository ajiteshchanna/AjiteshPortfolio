"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter at least 2 characters."),
  email: z.email("Please enter a valid email address."),
  subject: z.string().trim().min(4, "Subject should be at least 4 characters."),
  message: z
    .string()
    .trim()
    .min(20, "Message should be at least 20 characters.")
    .max(2000, "Message should be at most 2000 characters."),
  website: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;
type ContactField = keyof ContactFormValues;
type FieldErrors = Partial<Record<ContactField, string>>;
type SubmitState = "idle" | "submitting" | "success" | "error";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [focusedField, setFocusedField] = useState<ContactField | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const messageCount = useMemo(() => values.message.length, [values.message]);

  function clearFieldError(field: ContactField) {
    setErrors((previous) => {
      if (!previous[field]) {
        return previous;
      }

      const next = { ...previous };
      delete next[field];
      return next;
    });
  }

  function updateValue(field: ContactField, value: string) {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));
    clearFieldError(field);

    if (submitState === "success" || submitState === "error") {
      setSubmitState("idle");
      setSubmitMessage("");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as ContactField;
        if (!nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }
      setErrors(nextErrors);
      setSubmitState("error");
      setSubmitMessage("Please correct the highlighted fields and try again.");
      return;
    }

    if (parsed.data.website && parsed.data.website.trim().length > 0) {
      setSubmitState("error");
      setSubmitMessage("Submission was blocked. Please retry or contact directly by email.");
      return;
    }

    try {
      setSubmitState("submitting");
      setSubmitMessage("");

      // Backend integration is intentionally deferred for this phase.
      await new Promise((resolve) => setTimeout(resolve, 900));

      setSubmitState("success");
      setSubmitMessage(
        "Your message passed validation and is queued for backend wiring. You can also reach me directly by email below.",
      );
      setValues(initialValues);
      setErrors({});
    } catch {
      setSubmitState("error");
      setSubmitMessage("Something unexpected happened. Please try again in a moment.");
    }
  }

  function fieldClass(field: ContactField) {
    return cn(
      "w-full rounded-xl border bg-surface px-4 py-3 text-sm text-fg transition-colors duration-200",
      "placeholder:text-fg-subtle",
      "focus:outline-none",
      errors[field]
        ? "border-red-400/80"
        : focusedField === field
          ? "border-accent"
          : "border-border hover:border-accent/30",
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <h2 className="type-h3 text-fg">Send a message</h2>
      <p className="mt-2 type-body text-fg-secondary">
        Share your context, constraints, and timeline. I will respond with a focused next-step plan.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block type-label text-fg-secondary">Name</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(event) => updateValue("name", event.target.value)}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              className={fieldClass("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span id="name-error" className="mt-2 block text-xs text-red-300">
                {errors.name}
              </span>
            )}
          </label>

          <label className="block">
            <span className="mb-2 block type-label text-fg-secondary">Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => updateValue("email", event.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className={fieldClass("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span id="email-error" className="mt-2 block text-xs text-red-300">
                {errors.email}
              </span>
            )}
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block type-label text-fg-secondary">Subject</span>
          <input
            type="text"
            name="subject"
            value={values.subject}
            onChange={(event) => updateValue("subject", event.target.value)}
            onFocus={() => setFocusedField("subject")}
            onBlur={() => setFocusedField(null)}
            className={fieldClass("subject")}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          />
          {errors.subject && (
            <span id="subject-error" className="mt-2 block text-xs text-red-300">
              {errors.subject}
            </span>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block type-label text-fg-secondary">Message</span>
          <textarea
            name="message"
            rows={7}
            value={values.message}
            onChange={(event) => updateValue("message", event.target.value)}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            className={fieldClass("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : "message-helper"}
          />
          <div className="mt-2 flex items-center justify-between gap-3">
            <span id="message-helper" className="text-xs text-fg-subtle">
              Please include your goals, audience, and constraints.
            </span>
            <span className="text-xs text-fg-subtle">{messageCount}/2000</span>
          </div>
          {errors.message && (
            <span id="message-error" className="mt-2 block text-xs text-red-300">
              {errors.message}
            </span>
          )}
        </label>

        <label className="sr-only" aria-hidden="true">
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => updateValue("website", event.target.value)}
          />
        </label>

        {submitState === "success" && (
          <p role="status" aria-live="polite" className="flex items-start gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            <CheckCircle2 size={16} aria-hidden="true" className="mt-0.5" />
            <span>{submitMessage}</span>
          </p>
        )}

        {submitState === "error" && submitMessage && (
          <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            <AlertCircle size={16} aria-hidden="true" className="mt-0.5" />
            <span>{submitMessage}</span>
          </p>
        )}

        <div className="pt-2">
          <Button type="submit" size="lg" loading={submitState === "submitting"}>
            {submitState === "submitting" ? "Validating message" : "Send inquiry"}
          </Button>
        </div>
      </form>
    </div>
  );
}
