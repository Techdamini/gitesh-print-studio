import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { MessageCircle, Send, Upload, X, FileText, User, Package, Pencil } from "lucide-react";
import { products } from "@/lib/products";
import { whatsappLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/site/Reveal";
import heroOrder from "@/assets/hero-order.jpg";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Place Your Order — Gitesh Enterprises" },
      { name: "description", content: "Custom printing made easy — share your requirements and place your order instantly via WhatsApp." },
      { property: "og:title", content: "Place Your Order — Gitesh Enterprises" },
      { property: "og:description", content: "Submit your printing requirements and get instant pricing on WhatsApp." },
    ],
  }),
  component: OrderPage,
});

const SIZE_PRESETS = ["Small", "Medium", "Large", "Custom"] as const;

function OrderPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    product: products[0].name,
    sizePreset: "Medium" as (typeof SIZE_PRESETS)[number],
    width: "",
    height: "",
    qty: "1",
    notes: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeText =
    form.sizePreset === "Custom" && (form.width || form.height)
      ? `Custom ${form.width || "?"} x ${form.height || "?"}`
      : form.sizePreset;

  const message = `Hello Gitesh Enterprises,
I want to place an order:

Name: ${form.name || "—"}
Phone: ${form.phone || "—"}
Email: ${form.email || "—"}
Product: ${form.product}
Size: ${sizeText}
Quantity: ${form.qty || "—"}
Details: ${form.notes || "—"}
${files.length ? `Files: ${files.map((f) => f.name).join(", ")}` : ""}

Please share payment QR code.`;

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    setFiles((prev) => [...prev, ...Array.from(incoming)].slice(0, 5));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Save order to database (fire-and-forget; user still continues to WhatsApp)
    void supabase.from("orders").insert({
      customer_name: form.name,
      phone: form.phone,
      email: form.email || null,
      product: form.product,
      size: sizeText,
      quantity: form.qty,
      notes: form.notes || null,
    });
    window.open(whatsappLink(message), "_blank");
  };

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border bg-ink py-24 text-white md:py-36">
        <img
          src={heroOrder}
          alt="Print order workstation"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
        <div className="absolute -right-32 -top-20 h-96 w-96 rounded-full bg-gold/25 blur-[140px]" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="relative mx-auto max-w-5xl px-4 md:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur">
              Order / Quote
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              Place Your <em className="font-display italic text-gold">Order</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-lg text-white/70">
              Custom printing made easy — share your requirements and get started instantly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-20">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1 */}
          <Reveal>
            <FormCard step="01" icon={<User className="h-4 w-4" />} title="Customer details">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="ge-input"
                    placeholder="Rajesh Sharma"
                  />
                </Field>
                <Field label="Phone" required>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="ge-input"
                    placeholder="+91 98xxxxxxxx"
                  />
                </Field>
                <Field label="Email" className="md:col-span-2">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="ge-input"
                    placeholder="you@example.com"
                  />
                </Field>
              </div>
            </FormCard>
          </Reveal>

          {/* Section 2 */}
          <Reveal>
            <FormCard step="02" icon={<Package className="h-4 w-4" />} title="Product selection">
              <div className="grid gap-5">
                <Field label="Product">
                  <select
                    value={form.product}
                    onChange={(e) => setForm({ ...form, product: e.target.value })}
                    className="ge-input"
                  >
                    {products.map((p) => (
                      <option key={p.slug} value={p.name}>
                        {p.name} — ₹{p.price}/{p.unit}
                      </option>
                    ))}
                    <option value="Other / Custom">Other / Custom</option>
                  </select>
                </Field>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Size
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {SIZE_PRESETS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, sizePreset: s })}
                        className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                          form.sizePreset === s
                            ? "border-foreground bg-foreground text-background shadow-soft"
                            : "border-border bg-background hover:border-foreground hover:-translate-y-0.5"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {form.sizePreset === "Custom" && (
                  <div className="grid animate-fade-in gap-5 sm:grid-cols-2">
                    <Field label="Width">
                      <input
                        value={form.width}
                        onChange={(e) => setForm({ ...form, width: e.target.value })}
                        className="ge-input"
                        placeholder="e.g. 6 ft"
                      />
                    </Field>
                    <Field label="Height">
                      <input
                        value={form.height}
                        onChange={(e) => setForm({ ...form, height: e.target.value })}
                        className="ge-input"
                        placeholder="e.g. 4 ft"
                      />
                    </Field>
                  </div>
                )}

                <Field label="Quantity">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, qty: String(Math.max(1, Number(form.qty) - 1)) })}
                      className="h-11 w-11 rounded-full border border-border text-lg font-semibold transition-all hover:border-foreground hover:-translate-y-0.5"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={form.qty}
                      onChange={(e) => setForm({ ...form, qty: e.target.value })}
                      className="ge-input w-24 text-center"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, qty: String(Number(form.qty) + 1) })}
                      className="h-11 w-11 rounded-full border border-border text-lg font-semibold transition-all hover:border-foreground hover:-translate-y-0.5"
                    >
                      +
                    </button>
                  </div>
                </Field>
              </div>
            </FormCard>
          </Reveal>

          {/* Section 3 */}
          <Reveal>
            <FormCard step="03" icon={<Upload className="h-4 w-4" />} title="Upload your design">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`group relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
                  dragActive
                    ? "border-[oklch(0.74_0.12_80)] bg-[oklch(0.74_0.12_80/0.06)]"
                    : "border-border hover:border-foreground hover:bg-muted/40"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <Upload className="mx-auto h-8 w-8 text-muted-foreground transition-transform group-hover:-translate-y-1" />
                <p className="mt-3 font-display text-2xl">Drop files here</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  or <span className="underline underline-offset-4">browse</span> — PDF, JPG, PNG · max 5 files
                </p>
              </div>

              {files.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {files.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-sm"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{f.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(f.size / 1024).toFixed(0)} KB)
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </FormCard>
          </Reveal>

          {/* Section 4 */}
          <Reveal>
            <FormCard step="04" icon={<Pencil className="h-4 w-4" />} title="Additional notes">
              <Field label="Instructions, colors, deadline">
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="ge-input min-h-32 resize-y"
                  placeholder="Share design references, color codes, deadline, delivery preference…"
                />
              </Field>
            </FormCard>
          </Reveal>

          {/* Actions */}
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-semibold uppercase tracking-widest text-background transition-all hover:scale-[1.02] hover:shadow-elevated"
              >
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                Submit Order
              </button>
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-foreground bg-background px-7 py-4 text-sm font-semibold uppercase tracking-widest text-foreground transition-all hover:scale-[1.02] hover:bg-[oklch(0.65_0.18_145)] hover:text-white hover:border-[oklch(0.65_0.18_145)]"
              >
                <MessageCircle className="h-4 w-4" />
                Order via WhatsApp
              </a>
            </div>
            {submitted && (
              <p className="mt-4 animate-fade-in text-center text-sm text-muted-foreground">
                ✓ Opening WhatsApp with your order details…
              </p>
            )}
          </Reveal>
        </form>
      </section>

      <style>{`
        .ge-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          background: var(--background);
          padding: 0.85rem 1rem;
          font-size: 0.9rem;
          font-family: var(--font-body);
          outline: none;
          transition: all 0.25s ease;
        }
        .ge-input:hover { border-color: oklch(0.55 0 0); }
        .ge-input:focus {
          border-color: var(--foreground);
          box-shadow: 0 0 0 4px oklch(0 0 0 / 0.06);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}

function FormCard({
  step,
  icon,
  title,
  children,
}: {
  step: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-background/80 p-6 shadow-soft backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-elevated md:p-9">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative mb-6 flex items-center gap-4 border-b border-border pb-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-foreground to-neutral-700 text-background shadow-soft">
          {icon}
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
            Step {step}
          </div>
          <h2 className="font-display text-2xl leading-tight md:text-3xl">{title}</h2>
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-[oklch(0.74_0.12_80)]">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
