import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { products } from "@/lib/products";
import { ArrowRight, Search } from "lucide-react";
import catAwards from "@/assets/cat-awards.jpg";
import catCards from "@/assets/cat-cards.jpg";
import catDisplay from "@/assets/cat-display.jpg";
import catOutdoor from "@/assets/cat-outdoor.jpg";
import catPrint from "@/assets/cat-print.jpg";
import catSignage from "@/assets/cat-signage.jpg";
import catStickers from "@/assets/cat-stickers.jpg";

const PAGE_SIZE = 12;

const categoryImages: Record<string, string> = {
  Outdoor: catOutdoor,
  Signage: catSignage,
  Cards: catCards,
  Awards: catAwards,
  Stickers: catStickers,
  Print: catPrint,
  Display: catDisplay,
};

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
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (active === "All" || p.category === active) &&
          (q === "" || p.name.toLowerCase().includes(q.toLowerCase())),
      ),
    [active, q],
  );

  // Reset pagination when filter or query changes
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [active, q]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <div>
      <section className="border-b border-border bg-muted/30 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shop</span>
          <h1 className="mt-2 font-display text-5xl font-bold tracking-tight md:text-6xl">All products</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Tap any product to see details, pick a custom size and order via WhatsApp.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {cats.filter((c) => c !== "All").map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`group overflow-hidden rounded-2xl border bg-card text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated ${
                  active === c ? "border-primary ring-2 ring-ring/10" : "border-border"
                }`}
              >
                <span className="block aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={categoryImages[c]}
                    alt={`${c} products`}
                    loading="lazy"
                    width={600}
                    height={450}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </span>
                <span className="flex items-center justify-between px-4 py-3 text-sm font-semibold">
                  {c}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <button
              type="button"
              onClick={() => setActive("All")}
              className={`w-fit rounded-full px-4 py-2 text-sm font-medium transition-all ${
                active === "All"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background hover:border-primary"
              }`}
            >
              Show all products
            </button>
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
        <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing <span className="font-semibold text-foreground">{shown.length}</span> of{" "}
            <span className="font-semibold text-foreground">{filtered.length}</span> products
          </span>
          {active !== "All" && (
            <span className="hidden sm:inline">
              Category: <span className="font-semibold text-foreground">{active}</span>
            </span>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((p, i) => (
            <Link
              key={p.slug}
              to="/shop/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-elevated animate-slide-up"
              style={{ animationDelay: `${(i % PAGE_SIZE) * 40}ms` }}
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
                  <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground">
                    View →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="group relative overflow-hidden rounded-full border border-border bg-background px-8 py-3 text-sm font-semibold transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground active:scale-95"
            >
              Load more products
              <span className="ml-2 text-muted-foreground group-hover:text-primary-foreground">
                ({filtered.length - visible} left)
              </span>
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No products match your search.
          </div>
        )}
      </section>
    </div>
  );
}
