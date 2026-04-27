import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, Clock, Quote, Sparkles, Star, Tag, Truck } from "lucide-react";
import hero from "@/assets/hero-printing.jpg";
import catAwards from "@/assets/cat-awards.jpg";
import catCards from "@/assets/cat-cards.jpg";
import catDisplay from "@/assets/cat-display.jpg";
import catOutdoor from "@/assets/cat-outdoor.jpg";
import catPrint from "@/assets/cat-print.jpg";
import catSignage from "@/assets/cat-signage.jpg";
import catStickers from "@/assets/cat-stickers.jpg";
import { AnimatedTagline } from "@/components/site/AnimatedTagline";
import { Reveal } from "@/components/site/Reveal";
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

const sliderProducts = ["flex-banner-printing", "led-glow-sign-board", "school-id-cards", "trophy-designs"]
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is (typeof products)[number] => Boolean(p));

const categoryCards = [
  { label: "Outdoor", image: catOutdoor, preview: "Flex banners, hoardings, backlit prints" },
  { label: "Signage", image: catSignage, preview: "LED boards, acrylic signs, name plates" },
  { label: "Cards", image: catCards, preview: "School, corporate, PVC and visitor cards" },
  { label: "Awards", image: catAwards, preview: "Trophies, acrylic, wooden and crystal awards" },
  { label: "Stickers", image: catStickers, preview: "Custom, vinyl, logo and waterproof stickers" },
  { label: "Print", image: catPrint, preview: "Posters, brochures, flyers and visiting cards" },
  { label: "Display", image: catDisplay, preview: "Standees, exhibition stands and backdrops" },
];

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % sliderProducts.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = sliderProducts[activeSlide % sliderProducts.length];

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x, y });
  };

  return (
    <div>
      {/* HERO */}
      <section
        ref={heroRef}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setMouse({ x: 0, y: 0 })}
        className="relative isolate overflow-hidden bg-primary text-primary-foreground"
      >
        <img
          src={hero}
          alt="Industrial printing press"
          className="absolute inset-0 h-[115%] w-full object-cover opacity-50 will-change-transform transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${mouse.x * 14}px, ${mouse.y * 14}px, 0) scale(1.05)`,
          }}
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div
          className="pointer-events-none absolute -inset-px opacity-60 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${(mouse.x + 0.5) * 100}% ${(mouse.y + 0.5) * 100}%, rgba(255,255,255,0.08), transparent 60%)`,
          }}
        />

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
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_-5px_rgba(255,255,255,0.6)] active:scale-95 active:duration-75"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Order Now</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] active:scale-95 active:duration-75"
              >
                Browse Shop
                <ArrowRight className="h-4 w-4 opacity-0 -ml-2 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0" />
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
        <Reveal className="mb-14 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Why Choose Us</span>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Print perfection, delivered.
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              variant="scale"
              delay={i * 100}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:rotate-[-6deg]">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRODUCT SLIDER */}
      <section className="bg-muted/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Featured products</span>
              <h2 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">Shop bestsellers</h2>
            </div>
            <Link to="/shop" className="text-sm font-semibold underline underline-offset-4 hover:no-underline">
              View all products →
            </Link>
          </Reveal>
          {currentSlide && (
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                <Link to="/shop/$slug" params={{ slug: currentSlide.slug }} className="group relative min-h-[360px] overflow-hidden bg-muted md:min-h-[520px]">
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.name}
                    width={1200}
                    height={900}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{currentSlide.category}</span>
                  <h3 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">{currentSlide.name}</h3>
                  <p className="mt-4 text-muted-foreground">{currentSlide.description}</p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold">₹{currentSlide.price}</span>
                    <span className="text-sm text-muted-foreground">/ {currentSlide.unit}</span>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={whatsappLink(`Hello Gitesh Enterprises,\nI want to order:\n\nProduct: ${currentSlide.name}\nPlease share payment QR code.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:scale-105 hover:shadow-glow"
                    >
                      Order Now <ArrowRight className="h-4 w-4" />
                    </a>
                    <Link
                      to="/shop/$slug"
                      params={{ slug: currentSlide.slug }}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-semibold transition-all hover:border-primary hover:bg-muted"
                    >
                      View details
                    </Link>
                  </div>
                  <div className="mt-10 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveSlide((s) => (s - 1 + sliderProducts.length) % sliderProducts.length)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
                      aria-label="Previous product"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSlide((s) => (s + 1) % sliderProducts.length)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
                      aria-label="Next product"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <div className="ml-2 flex gap-2">
                      {sliderProducts.map((item, idx) => (
                        <button
                          key={item.slug}
                          type="button"
                          onClick={() => setActiveSlide(idx)}
                          aria-label={`Show ${item.name}`}
                          className={`h-2 rounded-full transition-all ${idx === activeSlide ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CATEGORY IMAGE CARDS */}
      <section className="border-y border-border bg-background py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shop by category</span>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Real product categories
            </h2>
            <p className="mt-3 text-muted-foreground">Open the shop and preview matching products by category.</p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categoryCards.map((c, i) => (
              <Reveal key={c.label} delay={i * 50} className="group">
                <Link to="/shop" className="block overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img src={c.image} alt={`${c.label} category`} loading="lazy" width={700} height={520} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between font-display text-lg font-bold">
                      {c.label}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{c.preview}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <Reveal className="mb-14 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Testimonials</span>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">Loved by 500+ customers</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              as="figure"
              delay={i * 120}
              className="group relative rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
            >
              <Quote className="h-8 w-8 text-muted-foreground/20 transition-colors group-hover:text-muted-foreground/40" />
              <blockquote className="mt-4 text-base leading-relaxed">{t.text}</blockquote>
              <div className="mt-6 flex items-center justify-between">
                <figcaption>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </figcaption>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current text-foreground" />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <Reveal variant="scale" className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground md:p-16">
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
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-primary transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_-5px_rgba(255,255,255,0.6)] active:scale-95"
            >
              Chat on WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
