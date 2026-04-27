import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BadgeCheck, Check, Truck, MessageCircle, ShoppingBag } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { whatsappLink } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop_/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Gitesh Enterprises` },
          { name: "description", content: loaderData.product.short },
          { property: "og:title", content: `${loaderData.product.name} — Gitesh Enterprises` },
          { property: "og:description", content: loaderData.product.short },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [{ title: "Product — Gitesh Enterprises" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="font-display text-4xl font-bold">Product not found</h1>
      <Link to="/shop" className="mt-6 inline-block text-sm underline">← Back to shop</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ProductPage,
});

const SIZE_PRESETS = ["Small", "Medium", "Large", "Custom"] as const;
type Preset = (typeof SIZE_PRESETS)[number];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [preset, setPreset] = useState<Preset>("Medium");
  const [customW, setCustomW] = useState("");
  const [customH, setCustomH] = useState("");
  const [qty, setQty] = useState(1);

  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 4);

  const resolvedSize =
    preset === "Custom"
      ? customW && customH
        ? `${customW} x ${customH}`
        : product.defaultSize ?? "Custom"
      : `${preset}${product.defaultSize ? ` (${product.defaultSize})` : ""}`;

  const buyNowMessage = [
    "Hello Gitesh Enterprises,",
    "I want to order:",
    "",
    `Product: ${product.name}`,
    `Size: ${resolvedSize}`,
    `Quantity: ${qty}`,
    `Price: ₹${product.price * qty} (${product.price} / ${product.unit})`,
    "",
    "Please share payment QR code.",
  ].join("\n");

  const enquiryMessage = `Hi, I want more details about ${product.name}`;

  const handleAddToCart = () => {
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.image,
      size: resolvedSize,
      qty,
    });
  };

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to shop
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-border bg-muted">
            <img
              src={product.image}
              alt={product.name}
              loading="eager"
              width={1024}
              height={1024}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{product.category}</span>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">{product.name}</h1>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-4xl font-bold">₹{product.price}</span>
              <span className="text-sm text-muted-foreground">per {product.unit}</span>
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-whatsapp/10 px-3 py-1 text-xs font-semibold text-whatsapp">
                <Truck className="h-3 w-3" /> Fast Delivery
              </span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Material used</div>
                <div className="mt-2 text-sm font-semibold">{product.material}</div>
              </div>
              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Custom size</div>
                <div className="mt-2 text-sm font-semibold">Available for every order</div>
              </div>
            </div>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <label className="text-sm font-semibold">Size</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {SIZE_PRESETS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setPreset(s)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                      preset === s
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:border-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {preset === "Custom" && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={customW}
                    onChange={(e) => setCustomW(e.target.value)}
                    placeholder="Width (e.g. 8 ft)"
                    className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                  <input
                    type="text"
                    value={customH}
                    onChange={(e) => setCustomH(e.target.value)}
                    placeholder="Height (e.g. 4 ft)"
                    className="rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              )}
              <p className="mt-2 text-xs text-muted-foreground">Selected: {resolvedSize}</p>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <label className="text-sm font-semibold">Quantity</label>
              <div className="flex items-center rounded-full border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2 hover:bg-muted">−</button>
                <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-4 py-2 hover:bg-muted">+</button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={handleAddToCart}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-semibold transition-all hover:border-primary hover:bg-muted"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
              <a
                href={whatsappLink(buyNowMessage)}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:scale-105 hover:shadow-glow"
              >
                <MessageCircle className="h-4 w-4" /> Order Now
              </a>
              <a
                href={whatsappLink(enquiryMessage)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-semibold transition-all hover:border-primary hover:bg-muted"
              >
                Enquiry
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
              <BadgeCheck className="h-5 w-5 text-foreground" />
              No payment online — confirm and pay on delivery / pickup.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-12 grid gap-8 border-y border-border py-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">About this product</span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Built for real business use</h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
            <p>{product.description}</p>
            <p>
              Each {product.name.toLowerCase()} order is prepared with {product.material.toLowerCase()} and checked for print clarity, finishing, and durability before handover.
            </p>
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">More in {product.category}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <Link
              key={p.slug}
              to="/shop/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-muted-foreground">₹{p.price} / {p.unit}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
