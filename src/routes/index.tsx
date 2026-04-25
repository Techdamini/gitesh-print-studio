import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Clock, Sparkles, Tag, Truck, Star, Quote } from "lucide-react";
import hero from "@/assets/hero-printing.jpg";
import { AnimatedTagline } from "@/components/site/AnimatedTagline";
import { products } from "@/lib/products";
import { whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gitesh Enterprises — Premium Printing Services in Ludhiana" },
      {
        name: "description",
        content:
          "Flex printing, LED boards, ID cards, trophies, name plates and more. High quality printing at affordable prices in Ludhiana.",
      },
      { property: "og:title", content: "Gitesh Enterprises — All Printing Solutions in One Place" },
      { property: "og:description", content: "Flex, LED boards, ID cards, trophies & custom prints in Ludhiana." },
    ],
  }),
  component: HomePage,
});

const services = [
  "Flex Printing", "LED Boards", "ID Cards", "Trophies",
  "Name Plates", "Stickers", "Banners", "Posters",
  "Business Cards", "Brochures", "Standees", "Custom Prints",
];

const features = [
  { icon: BadgeCheck, title: "High Quality", text: "1440 DPI HD printing on premium materials." },
  { icon: Truck, title: "Fast Delivery", text: "Same-day & next-day printing across Ludhiana." },
  { icon: Tag, title: "Affordable Pricing", text: "Best rates with transparent per-piece pricing." },
  { icon: Sparkles, title: "Custom Designs", text: "Free design help for every order." },
];

const testimonials = [
  { name: "Rajesh Sharma", role: "Sharma Electronics", rating: 5, text: "Got my LED shop board done — looks stunning at night. Highly professional team." },
  { name: "Priya Verma", role: "DAV School", rating: 5, text: "We ordered 500 ID cards. Quality was top-notch and delivered in 2 days flat." },
  { name: "Amit Singh", role: "Singh Garments", rating: 5, text: "Their flex banners are super crisp. Best printing rates I’ve found in Ludhiana." },
];

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img
          src={hero}
          alt="Industrial printing press"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        <div className="absolute inset-0 grid-bg opacity-20" />

        <div className="relative mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
          <div className="max-w-3xl">
            <span className="inline-flex animate-slide-up items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/80 backdrop-blur">
              <Clock className="h-3.5 w-3.5" /> Fast Delivery · Ludhiana
            </span>
            <h1 className="mt-6 animate-slide-up delay-100 font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-7xl lg:text-8xl">
              Gitesh
              <br />
              <span className="text-gradient-light">Enterprises</span>
            </h1>
            <AnimatedTagline className="mt-6 animate-slide-up delay-200 text-xl font-medium text-white/80 md:text-2xl" />
            <p className="mt-6 max-w-xl animate-slide-up delay-300 text-base text-white/60 md:text-lg">
              Premium flex, LED signage, ID cards, trophies and custom prints — crafted with precision for shops, schools and businesses.
            </p>

            <div className="mt-10 flex animate-slide-up delay-500 flex-wrap items-center gap-4">
              <a
                href={whatsappLink("Hi, I want to place an order with Gitesh Enterprises")}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-glow transition-all hover:scale-105"
              >
                Order Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Browse Shop
              </Link>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative border-y border-white/10 bg-black/40 py-5">
          <div className="flex w-max marquee gap-12 whitespace-nowrap text-sm font-medium uppercase tracking-[0.3em] text-white/40">
            {[...services, ...services].map((s, i) => (
              <span key={i} className="flex items-center gap-12">
                {s}
                <span className="h-1 w-1 rounded-full bg-white/30" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="mb-14 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Why Choose Us</span>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Print perfection, delivered.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:rotate-[-6deg]">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
            </div>
          ))}
        </div>
      </section>

      {/* SHOP PREVIEW */}
      <section className="bg-muted/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Bestsellers</span>
              <h2 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">From our shop</h2>
            </div>
            <Link to="/shop" className="text-sm font-semibold underline underline-offset-4 hover:no-underline">
              View all products →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <Link
                key={p.slug}
                to="/shop/$slug"
                params={{ slug: p.slug }}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">
                    {p.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-semibold">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.short}</p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-display text-lg font-bold">₹{p.price}</span>
                    <span className="text-xs text-muted-foreground">/ {p.unit}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="mb-14 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Testimonials</span>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">Loved by 500+ customers</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="relative rounded-2xl border border-border bg-card p-7">
              <Quote className="h-8 w-8 text-muted-foreground/20" />
              <blockquote className="mt-4 text-base leading-relaxed">{t.text}</blockquote>
              <div className="mt-6 flex items-center justify-between">
                <figcaption>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </figcaption>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-foreground" />
                  ))}
                </div>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground md:p-16">
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-display text-3xl font-bold md:text-5xl">Ready to print?</h3>
              <p className="mt-3 max-w-lg text-white/70">
                Send us your design or describe your idea on WhatsApp — we’ll handle the rest.
              </p>
            </div>
            <a
              href={whatsappLink("Hi, I want to discuss a printing order with Gitesh Enterprises")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-primary transition-all hover:scale-105"
            >
              Chat on WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
