import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, MessageCircle, Clock, Send, ChevronDown } from "lucide-react";
import { ADDRESS, EMAIL, PHONE_DISPLAY, whatsappLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Get in Touch — Gitesh Enterprises" },
      { name: "description", content: "Visit our Ludhiana studio, call, email or WhatsApp us — we're here to help with all your printing needs." },
      { property: "og:title", content: "Contact Gitesh Enterprises" },
      { property: "og:description", content: "Phone, email, address, map and quick contact form." },
    ],
  }),
  component: ContactPage,
});

const FAQS = [
  {
    q: "How long does printing take?",
    a: "Most orders — flex banners, posters, ID cards — are ready within 24 hours. Bulk and custom signage take 2–4 working days. Same-day printing available on request.",
  },
  {
    q: "Do you offer custom designs?",
    a: "Yes. Our in-house design team creates everything from logos to full signage layouts. Share your idea on WhatsApp and we'll send concepts within a day.",
  },
  {
    q: "What payment methods are accepted?",
    a: "UPI (GPay, PhonePe, Paytm), bank transfer, cash and all major cards. We share a payment QR after confirming your order on WhatsApp.",
  },
  {
    q: "Do you deliver outside Ludhiana?",
    a: "Yes, we ship pan-India via courier. Local Ludhiana delivery is free for orders above ₹2,000.",
  },
];

function ContactPage() {
  const mapQuery = encodeURIComponent(ADDRESS);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const formMessage = `Hi Gitesh Enterprises, this is ${form.name || "—"} (${form.phone || "—"}, ${form.email || "—"}).

${form.message || "I'd like to enquire about your printing services."}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Save enquiry to database (fire-and-forget; UX still opens WhatsApp)
    void supabase.from("enquiries").insert({
      name: form.name,
      phone: form.phone,
      email: form.email || null,
      message: form.message,
      product_type: null,
      quantity: null,
    });
    window.open(whatsappLink(formMessage), "_blank");
  };

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-background py-20 md:py-28">
        <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:radial-gradient(var(--ink)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Contact
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              Get in <em className="font-display italic text-[oklch(0.74_0.12_80)]">Touch</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              We're here to help you with your printing needs. Drop by, call, or send a message — whichever works for you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quick info cards */}
      <section className="mx-auto max-w-7xl px-4 pt-16 md:px-8 md:pt-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={0}>
            <InfoCard
              icon={<Phone className="h-5 w-5" />}
              label="Call us"
              value={PHONE_DISPLAY}
              sub="Mon–Sat · 9 AM – 9 PM"
              href="tel:+918146632476"
            />
          </Reveal>
          <Reveal delay={80}>
            <InfoCard
              icon={<MessageCircle className="h-5 w-5" />}
              label="WhatsApp"
              value={PHONE_DISPLAY}
              sub="Fastest reply · 24/7"
              href={whatsappLink("Hi, I want to enquire from Gitesh Enterprises")}
            />
          </Reveal>
          <Reveal delay={160}>
            <InfoCard
              icon={<Mail className="h-5 w-5" />}
              label="Email"
              value={EMAIL}
              sub="Replies within hours"
              href={`mailto:${EMAIL}`}
            />
          </Reveal>
          <Reveal delay={240}>
            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              label="Working hours"
              value="9 AM – 9 PM"
              sub="Mon–Sat · Sun closed"
            />
          </Reveal>
        </div>
      </section>

      {/* Form + Address */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-background p-7 shadow-soft transition-shadow hover:shadow-elevated md:p-10"
            >
              <div className="mb-7 border-b border-border pb-5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Send a message
                </span>
                <h2 className="mt-2 font-display text-3xl md:text-4xl">
                  Tell us what you <em className="italic text-[oklch(0.74_0.12_80)]">need</em>.
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Your name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="ge-input"
                    placeholder="Rajesh Sharma"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="ge-input"
                    placeholder="+91 98xxxxxxxx"
                  />
                </Field>
                <Field label="Email" className="md:col-span-2">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="ge-input"
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Message" className="md:col-span-2">
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="ge-input min-h-32 resize-y"
                    placeholder="Tell us about your project…"
                  />
                </Field>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-semibold uppercase tracking-widest text-background transition-all hover:scale-[1.02] hover:shadow-elevated"
                >
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  Send message
                </button>
                <a
                  href={whatsappLink("Hi, I want to enquire from Gitesh Enterprises")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-foreground bg-background px-7 py-4 text-sm font-semibold uppercase tracking-widest transition-all hover:scale-[1.02] hover:bg-[oklch(0.65_0.18_145)] hover:text-white hover:border-[oklch(0.65_0.18_145)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </form>
          </Reveal>

          {/* Address card */}
          <Reveal className="lg:col-span-2" delay={120}>
            <div className="flex h-full flex-col rounded-3xl border border-border bg-foreground p-7 text-background shadow-soft md:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[oklch(0.74_0.12_80)] text-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-3xl">Visit our studio</h3>
              <p className="mt-4 text-sm leading-relaxed text-background/75">{ADDRESS}</p>

              <div className="mt-6 space-y-3 border-t border-background/15 pt-6 text-sm">
                <Row icon={<Phone className="h-4 w-4" />} label={PHONE_DISPLAY} />
                <Row icon={<Mail className="h-4 w-4" />} label={EMAIL} />
                <Row icon={<Clock className="h-4 w-4" />} label="Mon–Sat · 9 AM – 9 PM" />
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center justify-between rounded-full border border-background/30 px-5 py-3 text-xs font-semibold uppercase tracking-widest transition-all hover:bg-background hover:text-foreground"
                style={{ marginTop: "auto" }}
              >
                <span>Open in Google Maps</span>
                <span aria-hidden>→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8 md:pb-20">
        <Reveal>
          <div className="mb-6 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Find us
              </span>
              <h2 className="mt-2 font-display text-3xl md:text-5xl">
                Visit Our <em className="italic text-[oklch(0.74_0.12_80)]">Location</em>
              </h2>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-soft transition-shadow hover:shadow-elevated">
            <iframe
              title="Gitesh Enterprises location"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-[450px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 pb-16 md:px-8 md:pb-20">
        <Reveal>
          <div className="text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              FAQ
            </span>
            <h2 className="mt-2 font-display text-4xl md:text-6xl">
              Frequently <em className="italic text-[oklch(0.74_0.12_80)]">asked</em>
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 60}>
              <div
                className={`overflow-hidden rounded-2xl border bg-background transition-all ${
                  openFaq === i ? "border-foreground shadow-soft" : "border-border hover:border-foreground/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg md:text-xl">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="border-t border-border bg-background py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center md:px-8">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl">
              Ready to <em className="italic text-[oklch(0.74_0.12_80)]">start</em>?
            </h2>
            <p className="mt-4 text-muted-foreground">Pick the fastest way to reach us.</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="tel:+918146632476"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-foreground bg-background px-7 py-4 text-sm font-semibold uppercase tracking-widest transition-all hover:-translate-y-0.5 hover:bg-foreground hover:text-background"
              >
                <Phone className="h-4 w-4" /> Call now
              </a>
              <a
                href={whatsappLink("Hi, I want to enquire from Gitesh Enterprises")}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[oklch(0.65_0.18_145)] px-7 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp now
              </a>
              <a
                href="/order"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-semibold uppercase tracking-widest text-background transition-all hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" /> Get quote
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .ge-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          background: var(--background);
          padding: 0.85rem 1rem;
          font-size: 0.9rem;
          font-family: var(--font-body);
          outline: none;
          transition: all 0.25s ease;
        }
        .ge-input:hover { border-color: oklch(0.55 0 0); }
        .ge-input:focus {
          border-color: var(--foreground);
          box-shadow: 0 0 0 4px oklch(0 0 0 / 0.06);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
  sub,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  href?: string;
}) {
  const Tag = (href ? "a" : "div") as React.ElementType;
  return (
    <Tag
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-border bg-background p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-foreground hover:shadow-elevated"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background transition-transform group-hover:rotate-[-6deg]">
        {icon}
      </div>
      <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 truncate font-display text-xl">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </Tag>
  );
}

function Row({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 text-background/80">
      <span className="text-[oklch(0.74_0.12_80)]">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
