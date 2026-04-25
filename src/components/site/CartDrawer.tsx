import { Link } from "@tanstack/react-router";
import { X, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart";
import { whatsappLink } from "@/lib/whatsapp";

function buildCartMessage(items: ReturnType<typeof useCart>["items"], total: number) {
  const lines = ["Hello Gitesh Enterprises,", "I want to order the following products:", ""];
  items.forEach((it, idx) => {
    lines.push(`${idx + 1}. ${it.name}`);
    lines.push(`   Size: ${it.size || "Standard"}`);
    lines.push(`   Quantity: ${it.qty}`);
    lines.push(`   Price: ₹${it.price} / ${it.unit}`);
    lines.push("");
  });
  lines.push(`Total: ₹${total}`);
  lines.push("", "Please share payment QR code.");
  return lines.join("\n");
}

export function CartDrawer() {
  const { items, isOpen, close, remove, updateQty, total, count } = useCart();

  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-xl font-bold">Your Cart ({count})</h2>
          <button onClick={close} aria-label="Close cart" className="rounded-md p-2 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-muted-foreground">Your cart is empty.</p>
              <Link
                to="/shop"
                onClick={close}
                className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => (
                <li key={it.id} className="flex gap-3 rounded-xl border border-border p-3">
                  <img src={it.image} alt={it.name} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-semibold leading-tight">{it.name}</div>
                        <div className="text-xs text-muted-foreground">{it.size || "Standard"}</div>
                      </div>
                      <button
                        onClick={() => remove(it.id)}
                        aria-label="Remove"
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border text-sm">
                        <button
                          onClick={() => updateQty(it.id, it.qty - 1)}
                          className="px-3 py-1 hover:bg-muted"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">{it.qty}</span>
                        <button
                          onClick={() => updateQty(it.id, it.qty + 1)}
                          className="px-3 py-1 hover:bg-muted"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-sm font-bold">₹{it.price * it.qty}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border bg-muted/40 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-display text-2xl font-bold">₹{total}</span>
            </div>
            <a
              href={whatsappLink(buildCartMessage(items, total))}
              target="_blank"
              rel="noreferrer"
              onClick={close}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" /> Checkout via WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              No online payment — confirm and pay on delivery.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
