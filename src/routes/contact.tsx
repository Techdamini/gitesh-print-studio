import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { ADDRESS, EMAIL, PHONE_DISPLAY, whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Gitesh Enterprises" },
      { name: "description", content: "Visit our store in Ludhiana or call/WhatsApp for printing orders." },
      { property: "og:title", content: "Contact Gitesh Enterprises" },
      { property: "og:description", content: "Phone, email, address and Google Map." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const mapQuery = encodeURIComponent(ADDRESS);

  return (
    <div>
      <section className="border-b border-border bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Contact</span>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight md:text-7xl">
            Let’s <span className="text-gradient">talk</span> printing.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Drop by the store, call us, or send a WhatsApp message — whichever is easier for you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <ContactCard
            icon={<Phone className="h-5 w-5" />}
            title="Call us"
            line1={PHONE_DISPLAY}
            line2="Mon–Sat · 9 AM – 9 PM"
            href={`tel:+918146632476`}
            cta="Call now"
          />
          <ContactCard
            icon={<MessageCircle className="h-5 w-5" />}
            title="WhatsApp"
            line1={PHONE_DISPLAY}
            line2="Fastest reply · 24/7"
            href={whatsappLink("Hi, I want to enquire from Gitesh Enterprises")}
            cta="Chat now"
          />
          <ContactCard
            icon={<Mail className="h-5 w-5" />}
            title="Email"
            line1={EMAIL}
            line2="Replies within a few hours"
            href={`mailto:${EMAIL}`}
            cta="Send email"
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-7 lg:col-span-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">Visit our studio</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{ADDRESS}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-sm font-semibold underline underline-offset-4 hover:no-underline"
            >
              Open in Google Maps →
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border lg:col-span-2">
            <iframe
              title="Gitesh Enterprises location"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-96 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactCard({
  icon, title, line1, line2, href, cta,
}: { icon: React.ReactNode; title: string; line1: string; line2: string; href: string; cta: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group block rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:rotate-[-6deg]">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
      <div className="mt-2 text-sm font-medium">{line1}</div>
      <div className="text-xs text-muted-foreground">{line2}</div>
      <div className="mt-4 text-sm font-semibold underline underline-offset-4 group-hover:no-underline">
        {cta} →
      </div>
    </a>
  );
}
