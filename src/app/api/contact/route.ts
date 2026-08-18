import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contactSchema";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_CONTACT_EMAIL = "ac.ajiteshchanna@gmail.com";
const DEFAULT_FROM_EMAIL = "Portfolio Contact <onboarding@resend.dev>";

function logConfigStatus() {
  const hasResendApiKey = Boolean(process.env.RESEND_API_KEY);
  const hasContactEmail = Boolean(process.env.CONTACT_EMAIL);
  const hasContactFromEmail = Boolean(process.env.CONTACT_FROM_EMAIL);

  console.info("[CONTACT API] RESEND_API_KEY configured:", hasResendApiKey);
  console.info("[CONTACT API] CONTACT_EMAIL configured:", hasContactEmail);
  console.info("[CONTACT API] CONTACT_FROM_EMAIL configured:", hasContactFromEmail);

  return { hasResendApiKey, hasContactEmail, hasContactFromEmail };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sanitizeForText(value: string): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

export async function POST(request: Request) {
  try {
    const configStatus = logConfigStatus();
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please provide valid contact details and message.",
        },
        { status: 400 },
      );
    }

    const data = {
      ...parsed.data,
      name: sanitizeForText(parsed.data.name),
      email: sanitizeForText(parsed.data.email),
      subject: sanitizeForText(parsed.data.subject),
      message: sanitizeForText(parsed.data.message),
    };

    if (data.website && data.website.trim().length > 0) {
      return NextResponse.json({ message: "Request could not be processed." }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL ?? DEFAULT_CONTACT_EMAIL;
    const fromAddress = process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM_EMAIL;

    if (!resendApiKey) {
      console.error("[CONTACT API] Missing required env variable: RESEND_API_KEY");
      return NextResponse.json(
        {
          message: "Email service is not configured yet. Please contact directly by email.",
        },
        { status: 500 },
      );
    }

    if (!configStatus.hasContactEmail) {
      console.warn("[CONTACT API] CONTACT_EMAIL not set; using default recipient.");
    }

    if (!configStatus.hasContactFromEmail) {
      console.warn("[CONTACT API] CONTACT_FROM_EMAIL not set; using default sender.");
    }

    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeSubject = escapeHtml(data.subject);
    const safeMessage = escapeHtml(data.message).replaceAll("\n", "<br />");

    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [contactEmail],
        reply_to: data.email,
        subject: `[Portfolio Contact] ${data.subject}`,
        text: [
          "NEW PORTFOLIO CONTACT",
          "",
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Subject: ${data.subject}`,
          "",
          "Message:",
          data.message,
          "",
          "Submitted from: Ajitesh Channa Portfolio",
        ].join("\n"),
        html: `
          <div style=\"font-family:Arial,sans-serif;background:#060606;color:#ffffff;padding:24px;line-height:1.55;\">
            <h2 style=\"margin:0 0 16px 0;color:#df2531;letter-spacing:0.06em;\">NEW PORTFOLIO CONTACT</h2>
            <p style=\"margin:0 0 8px 0;\"><strong>Name:</strong> ${safeName}</p>
            <p style=\"margin:0 0 8px 0;\"><strong>Email:</strong> ${safeEmail}</p>
            <p style=\"margin:0 0 8px 0;\"><strong>Subject:</strong> ${safeSubject}</p>
            <p style=\"margin:16px 0 8px 0;\"><strong>Message:</strong></p>
            <div style=\"border:1px solid rgba(223,37,49,0.35);border-radius:10px;padding:12px;background:#0b0b0b;\">${safeMessage}</div>
            <p style=\"margin:18px 0 0 0;color:#c8c8c8;\">Submitted from: Ajitesh Channa Portfolio</p>
          </div>
        `,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const safeErrorText = await response.text();
      console.error("[CONTACT API] Resend request failed", {
        status: response.status,
        statusText: response.statusText,
        error: safeErrorText,
      });

      return NextResponse.json(
        {
          message: "Something went wrong while sending your message. Please try again or contact me directly by email.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "Message sent successfully. I'll get back to you soon.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[CONTACT API] Unexpected error while sending contact email", {
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      {
        message: "Something went wrong while sending your message. Please try again or contact me directly by email.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
