import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Gitesh Enterprises" },
      { name: "description", content: "Browse our portfolio of printed flex, LED boards, ID cards and more." },
      { property: "og:title", content: "Gallery — Gitesh Enterprises" },
      { property: "og:description", content: "A look at our recent printing work." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  // Build a varied masonry by repeating product images
  const items = [...products, ...products.slice(0, 3)];

  return (
    <div>
      <section className="border-b border-border bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Gallery</span>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight md:text-7xl">
            Our recent <span className="text-gradient">work</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A small slice of the printing we’ve delivered for happy customers across Ludhiana.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((p, i) => (
            <figure
              key={`${p.slug}-${i}`}
              className="group mb-4 overflow-hidden rounded-2xl border border-border bg-card break-inside-avoid"
              style={{ animation: `slide-up 0.7s both ${i * 60}ms` }}
            >
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <figcaption className="flex items-center justify-between p-4">
                <span className="font-semibold">{p.name}</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">{p.category}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
