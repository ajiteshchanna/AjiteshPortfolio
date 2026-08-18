"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import {
  contactSchema,
  type ContactField,
  type ContactFormValues,
  type FieldErrors,
} from "@/lib/contactSchema";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type SubmitState = "idle" | "submitting" | "success" | "error";
type SuccessPhase = "idle" | "line" | "revealed";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

const TRANSMISSION_DURATION_MS = 560;

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [focusedField, setFocusedField] = useState<ContactField | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [successPhase, setSuccessPhase] = useState<SuccessPhase>("idle");
  const prefersReducedMotion = useReducedMotion();
  const successTimersRef = useRef<number[]>([]);

  const messageCount = useMemo(() => values.message.length, [values.message]);
  const showSuccessPanel = successPhase === "revealed";

  useEffect(() => {
    return () => {
      successTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      successTimersRef.current = [];
    };
  }, []);

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

    if (successPhase !== "idle") {
      setSuccessPhase("idle");
      successTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      successTimersRef.current = [];
    }
  }

  function startSuccessSequence() {
    successTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    successTimersRef.current = [];

    if (prefersReducedMotion) {
      setSuccessPhase("revealed");
      return;
    }

    setSuccessPhase("line");

    const revealTimer = window.setTimeout(() => {
      setSuccessPhase("revealed");
    }, TRANSMISSION_DURATION_MS);

    successTimersRef.current.push(revealTimer);
  }

  function resetAfterSuccess() {
    successTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    successTimersRef.current = [];
    setSuccessPhase("idle");
    setSubmitState("idle");
    setSubmitMessage("");
    setErrors({});
    setValues(initialValues);
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

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const result = await response.json().catch(() => ({ message: "" }));

      if (!response.ok) {
        throw new Error(
          typeof result.message === "string" && result.message
            ? result.message
            : "Something went wrong while sending your message. Please try again or contact me directly by email.",
        );
      }

      setSubmitState("success");
      setSubmitMessage("Message sent successfully. I'll get back to you soon.");
      setValues(initialValues);
      setErrors({});
      startSuccessSequence();
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong while sending your message. Please try again or contact me directly by email.",
      );
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
    <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <AnimatePresence>
        {successPhase === "line" && !prefersReducedMotion && (
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 0.95, boxShadow: "0 0 0 rgba(223,37,49,0)" }}
            animate={{
              scaleX: [0, 1, 1],
              opacity: [0.95, 1, 0.78],
              boxShadow: ["0 0 0 rgba(223,37,49,0)", "0 0 10px rgba(223,37,49,0.38)", "0 0 0 rgba(223,37,49,0)"],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute left-0 right-0 top-[52%] z-20 h-px origin-left bg-accent"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        {showSuccessPanel ? (
          <motion.section
            key="success"
            role="status"
            aria-live="polite"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.992 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 1.004 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="py-2 sm:py-3"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">Signal Status</p>
            <h2 className="mt-2 font-mono text-[clamp(1.05rem,2.4vw,1.45rem)] font-semibold uppercase tracking-[0.14em] text-fg">
              Transmission Complete
            </h2>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-3 py-1.5">
              <motion.span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent"
                animate={prefersReducedMotion ? undefined : { scale: [1, 0.7, 1], opacity: [1, 0.7, 1] }}
                transition={prefersReducedMotion ? undefined : { duration: 2, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">Delivered</span>
            </div>

            <div className="mt-6 space-y-1.5 text-center sm:text-left">
              <p className="type-body text-fg-secondary">Your message has reached</p>
              <p className="font-mono text-sm uppercase tracking-[0.13em] text-fg">Ajitesh Channa</p>
              <p className="pt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">Status: Received</p>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                Channel: Contact
                <span className="mx-2 text-white/20">|</span>
                Delivery: Confirmed
              </p>
            </div>

            <button
              type="button"
              onClick={resetAfterSuccess}
              className="group mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.13em] text-fg-secondary transition-colors duration-200 hover:text-fg"
            >
              Send another message
              <ArrowRight
                size={13}
                aria-hidden="true"
                className="translate-x-0 transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </motion.section>
        ) : (
          <motion.div
            key="form"
            initial={prefersReducedMotion ? false : { opacity: 1, y: 0, scale: 1 }}
            animate={
              successPhase === "line" && !prefersReducedMotion
                ? { opacity: 0, y: -5, scale: 0.996 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.996 }}
            transition={
              successPhase === "line" && !prefersReducedMotion
                ? { duration: 0.26, delay: 0.24, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
            }
          >
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

              {submitState === "error" && submitMessage && (
                <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  <AlertCircle size={16} aria-hidden="true" className="mt-0.5" />
                  <span>{submitMessage}</span>
                </p>
              )}

              <div className="pt-2">
                <Button type="submit" size="lg" loading={submitState === "submitting"} className="w-full sm:w-auto">
                  {submitState === "submitting" ? "Sending message" : "Send inquiry"}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
