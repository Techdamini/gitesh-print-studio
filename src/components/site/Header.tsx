import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Printer, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/shop", label: "Shop" },
  { to: "/order", label: "Order" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, open: openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 text-white transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-ink/85 backdrop-blur-2xl shadow-elevated"
          : "border-b border-transparent bg-gradient-to-b from-ink/70 via-ink/40 to-transparent backdrop-blur-md",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 md:px-8",
          scrolled ? "h-14" : "h-16",
        )}
      >
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-amber-600 text-ink shadow-glow transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
            <Printer className="h-4 w-4" />
            <span className="absolute inset-0 rounded-lg bg-gold/50 blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Gitesh<span className="text-gold/80"> Enterprises</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="group relative rounded-md px-3.5 py-2 text-sm font-medium text-white/75 transition-all duration-300 hover:text-white"
              activeProps={{ className: "!text-gold drop-shadow-[0_0_8px_oklch(0.74_0.12_80/0.6)]" }}
            >
              {item.label}
              <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-gold via-amber-400 to-gold transition-transform duration-300 group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:scale-110 hover:border-gold hover:bg-white/10 hover:shadow-glow"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink animate-pop">
                {count}
              </span>
            )}
          </button>
          <Link
            to="/order"
            className="group relative hidden md:inline-flex h-10 items-center overflow-hidden rounded-full bg-gradient-to-r from-gold via-amber-400 to-gold bg-[length:200%_100%] px-5 text-sm font-semibold text-ink shadow-soft transition-all duration-500 hover:scale-105 hover:bg-[position:100%_0] hover:shadow-glow"
          >
            <span className="relative z-10">Get a Quote</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white transition-colors hover:border-gold hover:bg-white/10"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-white/10 bg-ink/95 backdrop-blur-xl transition-[max-height] duration-500",
          open ? "max-h-[28rem]" : "max-h-0",
        )}
      >
        <nav className="flex flex-col p-4">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              activeProps={{ className: "!text-gold bg-white/5" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
