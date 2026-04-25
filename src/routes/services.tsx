import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Image as ImageIcon, Lightbulb, IdCard, Trophy, Tag, Sticker,
  FileText, Layers, CreditCard, Megaphone, Palette, Box,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Gitesh Enterprises" },
      { name: "description", content: "Flex, LED boards, ID cards, trophies, name plates, stickers, posters and custom prints." },
      { property: "og:title", content: "Printing Services — Gitesh Enterprises" },
      { property: "og:description", content: "Full-service printing for shops, schools and businesses." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: ImageIcon, title: "Flex Printing", text: "HD flex banners for shops, hoardings and events." },
  { icon: Lightbulb, title: "LED Glow Boards", text: "Backlit signage built to be seen day and night." },
  { icon: IdCard, title: "PVC ID Cards", text: "Photo ID cards for schools, colleges and offices." },
  { icon: Trophy, title: "Trophies & Awards", text: "Engraved trophies in metal, crystal and acrylic." },
  { icon: Tag, title: "Name Plates", text: "Brass, steel and acrylic — for homes & cabins." },
  { icon: Sticker, title: "Vinyl Stickers", text: "Die-cut, glossy and waterproof vinyl stickers." },
  { icon: FileText, title: "Posters & Flyers", text: "Sharp 300 DPI offset and digital posters." },
  { icon: Layers, title: "Brochures", text: "Tri-fold and bi-fold brochures with lamination." },
  { icon: CreditCard, title: "Business Cards", text: "Spot UV, foil-stamped and matte cards." },
  { icon: Megaphone, title: "Roll-Up Standees", text: "Portable banners for events & exhibitions." },
  { icon: Palette, title: "Custom Designs", text: "Free design help with every print order." },
  { icon: Box, title: "Custom Prints", text: "Mugs, t-shirts, packaging — anything printable." },
];

function ServicesPage() {
  return (
    <div>
      <section className="border-b border-border bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Services</span>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight md:text-7xl">
            Everything <span className="text-gradient">printable</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            One studio, every printing solution. Browse our full range of services below — or jump straight to the shop.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-elevated animate-slide-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:rotate-[-6deg] group-hover:scale-110">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              <div className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-foreground transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-glow"
          >
            Shop printed products →
          </Link>
        </div>
      </section>
    </div>
  );
}
