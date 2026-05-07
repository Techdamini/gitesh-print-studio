import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Pencil, Printer, Truck } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { whatsappLink } from "@/lib/whatsapp";

import heroServices from "@/assets/hero-services.jpg";
import svcFlex from "@/assets/services/flex-printing.jpg";
import svcCustom from "@/assets/services/custom-prints.jpg";
import catSignage from "@/assets/cat-signage.jpg";
import catCards from "@/assets/cat-cards.jpg";
import catAwards from "@/assets/cat-awards.jpg";
import catStickers from "@/assets/cat-stickers.jpg";
import catPrint from "@/assets/cat-print.jpg";
import productNameplate from "@/assets/product-nameplate.jpg";
import productPoster from "@/assets/product-poster.jpg";
import productCard from "@/assets/product-card.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Gitesh Enterprises" },
      { name: "description", content: "Premium flex, LED boards, ID cards, trophies, name plates, stickers, posters, brochures and custom prints in Ludhiana." },
      { property: "og:title", content: "Printing Services — Gitesh Enterprises" },
      { property: "og:description", content: "Full-service printing for shops, schools and businesses in Ludhiana." },
      { property: "og:image", content: svcFlex },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { image: svcFlex, title: "Flex Printing", text: "HD 1440 DPI flex banners on premium 440 GSM media — built for shops, hoardings and outdoor advertising." },
  { image: catSignage, title: "LED Boards", text: "Backlit 3D signage, acrylic faces, SMD lighting and aluminium frames — bright by day, brilliant by night." },
  { image: catCards, title: "ID Cards", text: "CR80 PVC cards for schools, colleges and offices — double-sided print, free lanyards, bulk discounts." },
  { image: catAwards, title: "Trophies", text: "Crystal, acrylic, wood and metal trophies with custom 3D engraving and premium velvet boxes." },
  { image: productNameplate, title: "Name Plates", text: "Brass, stainless steel and acrylic name plates engraved for homes, cabins and clinics." },
  { image: catStickers, title: "Stickers", text: "Die-cut vinyl stickers — glossy, matte and waterproof. Perfect for branding, packaging and labels." },
  { image: productPoster, title: "Posters", text: "300 DPI posters in A4 to A1 sizes on premium 170-300 GSM art paper, with optional lamination." },
  { image: catPrint, title: "Brochures", text: "Tri-fold and bi-fold brochures on 170 GSM art paper — crisp folds, rich colours, fast turnaround." },
  { image: productCard, title: "Business Cards", text: "Spot UV, foil-stamped and matte cards on 350 GSM stock — make a memorable first impression." },
  { image: svcCustom, title: "Custom Prints", text: "Mugs, t-shirts, packaging, anything printable — bring an idea, we’ll bring it to life." },
];

const steps = [
  { icon: MessageCircle, title: "Enquire", text: "Send your brief or artwork on WhatsApp." },
  { icon: Pencil, title: "Design", text: "We refine and proof your file for print." },
  { icon: Printer, title: "Print", text: "Calibrated machines, supervised every minute." },
  { icon: Truck, title: "Deliver", text: "Quality-checked and dispatched on schedule." },
];

function ServicesPage() {
  return (
    <div className="bg-cream">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-border bg-ink text-white">
        <img
          src={heroServices}
          alt="Large format printing press in motion"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-50 [transform:scale(1.05)] motion-safe:animate-[float_18s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-gold/20 blur-[120px]" />
        <div className="relative mx-auto max-w-6xl px-4 py-28 md:px-8 md:py-40">
          <span className="inline-flex animate-slide-up items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-white/80 backdrop-blur">
            Services
          </span>
          <h1 className="mt-6 animate-slide-up delay-100 font-display text-6xl leading-[0.95] tracking-tight md:text-8xl">
            Everything <span className="font-serif-italic text-gold">printable</span>.
          </h1>
          <p className="mt-6 max-w-2xl animate-slide-up delay-200 text-lg text-white/70 md:text-xl">
            One studio, every printing solution. Browse our full range below — or jump straight to the shop to see prices and order.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 60}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-elevated"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6 md:p-7">
                <h3 className="font-display text-3xl leading-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                <Link
                  to="/shop"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-gold"
                >
                  Order this <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MID BANNER */}
      <section className="border-y border-border bg-primary py-16 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-px bg-white/10 px-4 sm:grid-cols-3 md:px-0">
          {[
            { k: "High Quality", v: "1440 DPI HD output" },
            { k: "Fast Delivery", v: "Same-day & next-day" },
            { k: "Affordable Pricing", v: "Transparent per-piece rates" },
          ].map((b) => (
            <div key={b.k} className="bg-primary px-6 py-10 text-center md:px-12">
              <div className="font-display text-4xl tracking-tight md:text-5xl">{b.k}</div>
              <div className="mt-3 text-xs uppercase tracking-[0.3em] text-white/60">{b.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <Reveal className="mb-14 max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">How our service works</span>
          <h2 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">From idea to <span className="font-serif-italic text-gold">delivery</span> in 4 steps.</h2>
        </Reveal>
        <div className="grid gap-px bg-border md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 100} className="group bg-background p-8 transition-colors hover:bg-cream">
              <div className="font-display text-6xl text-gold/70 transition-colors group-hover:text-gold">0{i + 1}</div>
              <s.icon className="mt-5 h-6 w-6 text-foreground" />
              <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 text-center">
          <a
            href={whatsappLink("Hi, I want to discuss a printing service with Gitesh Enterprises")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-glow"
          >
            Get a quote on WhatsApp <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
