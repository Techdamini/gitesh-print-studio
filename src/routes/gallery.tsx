import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";
import { Reveal } from "@/components/site/Reveal";
import { Lightbox, type LightboxItem } from "@/components/site/Lightbox";
import heroGallery from "@/assets/hero-gallery.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Gitesh Enterprises" },
      { name: "description", content: "Browse a portfolio of printed flex, LED boards, ID cards, trophies and more from our Ludhiana studio." },
      { property: "og:title", content: "Gallery — Gitesh Enterprises" },
      { property: "og:description", content: "Recent printing projects delivered across Ludhiana." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const items = [...products, ...products.slice(0, 4)];
  const lightboxItems: LightboxItem[] = items.map((p) => ({ src: p.image, caption: `${p.name} — ${p.category}` }));
  const [active, setActive] = useState<number | null>(null);

  const open = (i: number) => setActive(i);
  const close = () => setActive(null);
  const prev = () => setActive((i) => (i === null ? null : (i - 1 + items.length) % items.length));
  const next = () => setActive((i) => (i === null ? null : (i + 1) % items.length));

  return (
    <div className="bg-cream">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-border bg-ink text-white">
        <img
          src={heroGallery}
          alt="Glowing LED signage and printed hoardings at night"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/70 to-ink" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-gold/20 blur-[140px]" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-36">
          <span className="inline-flex animate-slide-up items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-white/80 backdrop-blur">Gallery</span>
          <h1 className="mt-6 animate-slide-up delay-100 font-display text-6xl leading-[0.95] tracking-tight md:text-8xl">
            Our work speaks <span className="font-serif-italic text-gold">for itself</span>.
          </h1>
          <p className="mt-6 max-w-2xl animate-slide-up delay-200 text-lg text-white/70 md:text-xl">
            Explore some of our finest printing projects delivered across Ludhiana — flex hoardings, glow boards, ID cards, trophies and more.
          </p>
          <p className="mt-4 animate-slide-up delay-300 text-xs uppercase tracking-[0.3em] text-gold/80">
            Click any image to open the lightbox
          </p>
        </div>
      </section>

      {/* MASONRY GRID */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((p, i) => (
            <Reveal
              key={`${p.slug}-${i}`}
              as="figure"
              delay={(i % 9) * 60}
              className="mb-5 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => open(i)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-background text-left transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-elevated"
              >
                <div className="overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  />
                </div>
                {/* overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-5 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">{p.category}</div>
                  <div className="mt-1 font-display text-2xl">{p.name}</div>
                </figcaption>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <Lightbox items={lightboxItems} index={active} onClose={close} onPrev={prev} onNext={next} />
    </div>
  );
}
