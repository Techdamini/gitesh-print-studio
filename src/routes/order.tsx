import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { products } from "@/lib/products";
import { whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order / Quote — Gitesh Enterprises" },
      { name: "description", content: "Request a custom quote for your printing requirements." },
      { property: "og:title", content: "Get a Quote — Gitesh Enterprises" },
      { property: "og:description", content: "Tell us what you need printed and we'll respond on WhatsApp." },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const [form, setForm] = useState({
    name: "",
    product: products[0].name,
    size: "",
    qty: "",
    notes: "",
  });

  const message = `Hi, I'd like a quote from Gitesh Enterprises.
Name: ${form.name || "—"}
Product: ${form.product}
Size: ${form.size || "—"}
Quantity: ${form.qty || "—"}
Notes: ${form.notes || "—"}`;

  return (
    <div>
      <section className="border-b border-border bg-muted/30 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Order / Quote</span>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight md:text-6xl">
            Tell us what you need <span className="text-gradient">printed</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Fill the form and click order — we'll receive your details on WhatsApp and reply with pricing & timeline.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10"
        >
          <Field label="Your name">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
              placeholder="Rajesh Sharma"
            />
          </Field>

          <Field label="Product">
            <select
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
              className="input"
            >
              {products.map((p) => (
                <option key={p.slug} value={p.name}>{p.name}</option>
              ))}
              <option value="Other / Custom">Other / Custom</option>
            </select>
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Size">
              <input
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                className="input"
                placeholder='e.g. 6 x 4 ft'
              />
            </Field>
            <Field label="Quantity">
              <input
                value={form.qty}
                onChange={(e) => setForm({ ...form, qty: e.target.value })}
                className="input"
                placeholder="e.g. 100"
              />
            </Field>
          </div>

          <Field label="Notes / design details">
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="input min-h-32"
              placeholder="Share colors, text, deadline or upload link…"
            />
          </Field>

          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.02] hover:shadow-glow"
          >
            <MessageCircle className="h-4 w-4" /> Send on WhatsApp
          </a>
        </form>
      </section>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.625rem;
          border: 1px solid var(--border);
          background: var(--background);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .input:focus { border-color: var(--primary); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
