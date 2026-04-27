import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Users, Factory, Heart, Pencil, Printer, Truck, ShieldCheck, Sparkles, Quote } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";
import aboutStory from "@/assets/about-story.jpg";
import aboutMission from "@/assets/about-mission.jpg";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Gitesh Enterprises" },
      { name: "description", content: "Ludhiana's trusted printing partner — premium machinery, sharp design and on-time delivery for shops, schools and businesses." },
      { property: "og:title", content: "About Gitesh Enterprises" },
      { property: "og:description", content: "A decade of premium printing for Ludhiana." },
      { property: "og:image", content: aboutHero },
      { name: "twitter:image", content: aboutHero },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Happy Customers" },
  { icon: Award, value: 10, suffix: "+", label: "Years of Craft" },
  { icon: Factory, value: 12, suffix: "+", label: "Print Categories" },
  { icon: Heart, value: 100, suffix: "%", label: "Satisfaction" },
];

const whyUs = [
  { icon: ShieldCheck, title: "Quality Materials", text: "Premium 440 GSM flex, K9 crystal, brushed brass — sourced and tested in-house." },
  { icon: Sparkles, title: "Sharp Design", text: "Free design refinement on every order — typography that actually reads." },
  { icon: Truck, title: "On-time Delivery", text: "Same-day to 48-hour turnaround across Ludhiana, no excuses." },
  { icon: Heart, title: "Honest Pricing", text: "Transparent per-piece rates. No hidden charges, ever." },
];

const process = [
  { step: "01", icon: Pencil, title: "Design", text: "Share your idea or artwork. Our team refines it for print." },
  { step: "02", icon: Printer, title: "Print", text: "1440 DPI HD output on calibrated machines, supervised by hand." },
  { step: "03", icon: Truck, title: "Deliver", text: "Quality-checked, packaged and dispatched on schedule." },
];

const testimonials = [
  { name: "Harpreet Kaur", role: "Principal, Springfield School", text: "We ordered 800 ID cards for the new session. Quality, delivery, follow-up — everything was exceptional. Now our default printing partner." },
  { name: "Manjit Singh", role: "Owner, Singh Sweets", text: "The LED glow board they made for our shop completely changed our footfall. Three years on, it still looks brand new." },
  { name: "Neha Aggarwal", role: "Event Planner, Ludhiana", text: "I've worked with most printers in the city. Gitesh is the only one I trust with last-minute hoardings and standees. They never miss a deadline." },
  { name: "Vikram Mehta", role: "Marketing Head, Mehta Textiles", text: "From visiting cards to a 30-foot hoarding, every project has been print-perfect. The attention to colour matching is rare in this industry." },
];

function AboutPage() {
  return (
    <div className="bg-cream">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img
          src={aboutHero}
          alt="Inside the Gitesh Enterprises printing workshop"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4 py-28 md:px-8 md:py-44">
          <span className="inline-flex animate-slide-up items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-white/80 backdrop-blur">
            About — Est. since a decade
          </span>
          <h1 className="mt-8 max-w-4xl animate-slide-up delay-100 font-display text-6xl leading-[0.95] tracking-tight text-balance md:text-8xl lg:text-9xl">
            Printing crafted <span className="font-serif-italic text-gold">with passion</span>.
          </h1>
          <p className="mt-8 max-w-2xl animate-slide-up delay-200 text-lg text-white/70 md:text-xl">
            From neighbourhood shop boards to school IDs, we’ve been pressing ink with care across Ludhiana — one job, one customer, one finished piece at a time.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-8 text-center md:p-12">
              <s.icon className="mx-auto h-6 w-6 text-gold" />
              <div className="mt-4 font-display text-5xl tracking-tight md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <img src={aboutStory} alt="Fresh print coming off the press" loading="lazy" width={1280} height={960} className="w-full rounded-2xl object-cover shadow-soft" />
          </Reveal>
          <Reveal delay={120}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Our Story</span>
            <h2 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">
              A decade of <span className="font-serif-italic text-gold">ink, paper</span> and patience.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>What began as a single flex-printer in a Ludhiana lane has grown into a full studio — large-format presses, LED fabrication, ID lamination, trophy engraving and a small team that genuinely cares about how a finished piece looks in your hand.</p>
              <p>We’ve printed shop boards that survived ten monsoons. School IDs handed out to entire generations of students. Wedding hoardings at midnight before the morning baraat. The work is varied — the standard never changes.</p>
              <p>Every job, big or small, gets the same finish, the same proofing, the same on-time promise.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="border-y border-border bg-background py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal delay={120} className="order-2 lg:order-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Mission &amp; Vision</span>
            <h2 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">
              Premium print, <span className="font-serif-italic text-gold">accessible</span> to all.
            </h2>
            <div className="mt-8 grid gap-6">
              <div className="rounded-xl border border-border p-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Mission</div>
                <p className="mt-3 text-base leading-relaxed">To deliver corporate-grade printing — colour accuracy, premium materials, careful finishing — at prices a local shop owner can afford.</p>
              </div>
              <div className="rounded-xl border border-border p-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Vision</div>
                <p className="mt-3 text-base leading-relaxed">To be the printing partner every Ludhiana business calls first — known for craft, honesty and never missing a deadline.</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <img src={aboutMission} alt="Designer reviewing a printed brochure" loading="lazy" width={1280} height={960} className="w-full rounded-2xl object-cover shadow-soft" />
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <Reveal className="mb-14 max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Why choose us</span>
          <h2 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">Built on four <span className="font-serif-italic text-gold">simple</span> commitments.</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w, i) => (
            <Reveal
              key={w.title}
              variant="scale"
              delay={i * 100}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover-glow-gold"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-border text-foreground transition-colors group-hover:border-gold group-hover:text-gold">
                <w.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl leading-tight">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold/10 transition-transform duration-700 group-hover:scale-150" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-border bg-primary py-24 text-primary-foreground md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="mb-16 max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">Our Process</span>
            <h2 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">Three steps. <span className="font-serif-italic text-gold">No fuss.</span></h2>
          </Reveal>
          <div className="grid gap-px bg-white/10 md:grid-cols-3">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 120} className="bg-primary p-8 md:p-12">
                <div className="font-display text-7xl text-gold">{p.step}</div>
                <p.icon className="mt-6 h-7 w-7 text-white/80" />
                <h3 className="mt-4 font-display text-3xl">{p.title}</h3>
                <p className="mt-3 text-sm text-white/60">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <Reveal className="mb-14 max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Customer trust</span>
          <h2 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">Words from people we’ve <span className="font-serif-italic text-gold">printed for</span>.</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              as="figure"
              delay={i * 100}
              className="group relative rounded-2xl border border-border bg-background p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-elevated"
            >
              <Quote className="h-8 w-8 text-gold/40" />
              <blockquote className="mt-4 font-display text-xl leading-relaxed md:text-2xl">“{t.text}”</blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.role}</div>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal variant="scale" className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground md:p-20">
            <div className="absolute inset-0 grid-bg opacity-10" />
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="max-w-2xl font-display text-4xl leading-[1.05] md:text-6xl">Start your printing project <span className="font-serif-italic text-gold">today</span>.</h3>
                <p className="mt-4 max-w-lg text-white/70">Tell us what you need on WhatsApp — we’ll send a quote and timeline within minutes.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={whatsappLink("Hi, I want to start a printing project with Gitesh Enterprises")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-primary transition-all hover:scale-105"
                >
                  Chat on WhatsApp <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  Browse the shop
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
