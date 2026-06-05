import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  email: z.string().trim().email("Invalid email").max(120).optional().or(z.literal("")),
  product_type: z.string().trim().max(80).optional().or(z.literal("")),
  quantity: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Add a few details").max(1000),
});

export type QuoteFormProps = {
  defaultProduct?: string;
  className?: string;
  compact?: boolean;
};

export function QuoteForm({ defaultProduct, className, compact }: QuoteFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    product_type: defaultProduct ?? "",
    quantity: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("enquiries").insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      product_type: parsed.data.product_type || null,
      quantity: parsed.data.quantity || null,
      message: parsed.data.message,
    });
    setBusy(false);
    if (error) {
      setErrors({ form: "Couldn't submit — please try again." });
      return;
    }
    setDone(true);
    setForm({ name: "", phone: "", email: "", product_type: defaultProduct ?? "", quantity: "", message: "" });
  }

  if (done) {
    return (
      <div className={`rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center ${className ?? ""}`}>
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
        <h3 className="mt-3 font-display text-2xl">Quote request received</h3>
        <p className="mt-1 text-sm text-emerald-900/80">Our team will contact you shortly on WhatsApp or phone.</p>
        <button
          onClick={() => setDone(false)}
          className="mt-5 text-sm font-medium text-emerald-700 hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className ?? ""}`}>
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field label="Your name" error={errors.name}>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} className={inputCls} placeholder="Full name" />
        </Field>
        <Field label="Phone (WhatsApp)" error={errors.phone}>
          <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} placeholder="+91 …" />
        </Field>
        <Field label="Email (optional)" error={errors.email}>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} placeholder="you@example.com" />
        </Field>
        <Field label="Product type" error={errors.product_type}>
          <input value={form.product_type} onChange={(e) => update("product_type", e.target.value)} className={inputCls} placeholder="Flex, LED, ID Card…" />
        </Field>
        <Field label="Quantity / size" error={errors.quantity}>
          <input value={form.quantity} onChange={(e) => update("quantity", e.target.value)} className={inputCls} placeholder="e.g. 10 sqft, 100 pcs" />
        </Field>
      </div>
      <Field label="Project details" error={errors.message}>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={`${inputCls} resize-none`}
          placeholder="Tell us what you need printed — sizes, deadline, artwork status."
        />
      </Field>
      {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}
      <button
        type="submit"
        disabled={busy}
        className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-gold via-amber-400 to-gold bg-[length:200%_100%] px-6 py-3 text-sm font-semibold text-ink shadow-soft transition-all duration-500 hover:bg-[position:100%_0] hover:shadow-glow disabled:opacity-60 sm:w-auto"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
        {busy ? "Sending…" : "Request quote"}
      </button>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-foreground focus:ring-2 focus:ring-foreground/10";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
