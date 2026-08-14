import type { Metadata } from "next";
import { Mail, MapPin, MessageSquareMore } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/contact";
import { SectionHeading, SocialLinks } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ajitesh Channa to discuss AI systems, automation projects, and creative engineering collaborations.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Ajitesh Channa",
    description:
      "Start a focused conversation around your project goals, technical constraints, and delivery path.",
    url: "/contact",
  },
  twitter: {
    title: "Contact | Ajitesh Channa",
    description:
      "Start a focused conversation around your project goals, technical constraints, and delivery path.",
  },
};

type ContactMethod = {
  id: string;
  title: string;
  value: string;
  description: string;
  href?: string;
  icon: LucideIcon;
};

const CONTACT_METHODS: ContactMethod[] = [
  {
    id: "email",
    title: "Email",
    value: "ac.ajiteshchanna@gmail.com",
    href: "mailto:ac.ajiteshchanna@gmail.com",
    description: "Best for project context, scope, and technical requirements.",
    icon: Mail,
  },
  {
    id: "location",
    title: "Base",
    value: "India",
    description: "Remote collaboration across time zones with async-first workflows.",
    icon: MapPin,
  },
];

export default function ContactPage() {
  return (
    <main>
      <section className="section-gap pb-8" aria-labelledby="contact-heading">
        <div className="container-page">
          <SectionHeading
            number="Contact"
            title="Start a Focused Conversation"
            subtitle="Tell me what you are building, where the bottlenecks are, and what success should look like."
            className="max-w-3xl"
          />
        </div>
      </section>

      <section className="section-gap pt-0" aria-labelledby="contact-form-heading">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
              <p className="type-label text-accent">Direct Contact</p>
              <h2 id="contact-form-heading" className="mt-3 type-h3 text-fg">
                Multiple ways to connect
              </h2>
              <p className="mt-3 type-body text-fg-secondary">
                Choose the channel that fits your workflow. For project inquiries, email with your current stage and constraints.
              </p>

              <div className="mt-6 space-y-4">
                {CONTACT_METHODS.map((method) => {
                  const Icon = method.icon;

                  return (
                    <article
                      key={method.id}
                      className="rounded-2xl border border-border-subtle bg-background/70 p-4"
                    >
                      <div className="mb-2 flex items-center gap-2 text-fg">
                        <Icon size={15} aria-hidden="true" className="text-accent" />
                        <h3 className="type-label text-fg-secondary">{method.title}</h3>
                      </div>

                      {method.href ? (
                        <a href={method.href} className="text-sm font-medium text-fg hover:text-accent transition-colors duration-200">
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-fg">{method.value}</p>
                      )}

                      <p className="mt-2 text-sm text-fg-muted">{method.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-2 text-accent">
                <MessageSquareMore size={15} aria-hidden="true" />
                <p className="type-label">Professional Profiles</p>
              </div>
              <SocialLinks display="icon-label" orientation="vertical" className="w-full" itemClassName="justify-start" />
            </div>
          </aside>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
