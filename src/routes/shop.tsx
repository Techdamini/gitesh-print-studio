import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { Search } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Gitesh Enterprises" },
      { name: "description", content: "Browse our shop — flex, LED boards, ID cards, trophies, stickers and more with INR pricing." },
      { property: "og:title", content: "Printing Shop — Gitesh Enterprises" },
      { property: "og:description", content: "Order printed products via WhatsApp. Custom sizes available." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const cats = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))], []);
  const [active, setActive] = useState("All");
  const [q, setQ] = useState("");

  const filtered = products.filter(
    (p) =>
      (active === "All" || p.category === active) &&
      (q === "" || p.name.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div>
      <section className="border-b border-border bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shop</span>
          <h1 className="mt-2 font-display text-5xl font-bold tracking-tight md:text-6xl">All products</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Tap any product to see details, pick a custom size and order via WhatsApp.
          </p>

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    active === c
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background hover:border-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => (
            <Link
              key={p.slug}
              to="/shop/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-elevated animate-slide-up"
              style={{ animationDelay: `${i * 50}ms` }}
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
                <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground backdrop-blur">
                  {p.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-semibold">{p.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.short}</p>
                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <span className="font-display text-xl font-bold">₹{p.price}</span>
                    <span className="ml-1 text-xs text-muted-foreground">/ {p.unit}</span>
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground">View →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">No products match your search.</div>
        )}
      </section>
    </div>
  );
}
