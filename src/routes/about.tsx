import { createFileRoute } from "@tanstack/react-router";
import { Award, Users, Factory, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Gitesh Enterprises" },
      { name: "description", content: "Learn about Gitesh Enterprises — Ludhiana's trusted printing partner." },
      { property: "og:title", content: "About Gitesh Enterprises" },
      { property: "og:description", content: "Years of experience delivering premium printing in Ludhiana." },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { icon: Users, value: "500+", label: "Happy Customers" },
  { icon: Award, value: "10+", label: "Years Experience" },
  { icon: Factory, value: "12+", label: "Print Categories" },
  { icon: Heart, value: "100%", label: "Satisfaction" },
];

function AboutPage() {
  return (
    <div>
      <section className="border-b border-border bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">About Us</span>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight md:text-7xl">
            Printing crafted with <span className="text-gradient">passion</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Gitesh Enterprises is Ludhiana’s trusted printing partner — combining premium machinery,
            sharp design sensibility and genuinely affordable rates to serve shops, schools and businesses across the region.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              For over a decade we’ve been printing what businesses need to grow — from glowing LED shop boards
              and weatherproof flex hoardings, to crisp ID cards, brochures, trophies and bespoke name plates.
            </p>
            <p>
              We believe printing is more than ink on a surface. It’s how a shop becomes recognisable from across the street,
              how a student feels proud carrying their school ID, and how a brand earns its first impression.
            </p>
            <p>
              Every job — whether it’s 100 stickers or a 30-foot hoarding — gets the same care, sharp design and on-time delivery.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elevated animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <s.icon className="h-6 w-6 text-muted-foreground" />
                <div className="mt-4 font-display text-4xl font-bold">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
