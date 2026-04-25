import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Printer, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { ADDRESS, EMAIL, GSTIN, PHONE_DISPLAY } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="relative mt-24 bg-primary text-primary-foreground">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-primary">
              <Printer className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-bold">Gitesh Enterprises</span>
          </div>
          <p className="mt-4 text-sm text-white/60">
            All printing solutions in one place — flex, LED boards, ID cards, trophies, and more.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-white hover:bg-white hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-5 text-xs text-white/40">GSTIN: {GSTIN}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/80">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
            <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/80">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /> {PHONE_DISPLAY}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /> {EMAIL}</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> {ADDRESS}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/80">Hours</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li>Mon – Sat · 9:00 AM – 9:00 PM</li>
            <li>Sunday · By appointment</li>
          </ul>
        </div>
      </div>
      {/* Payments + Partners strip */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 md:flex-row md:px-8">
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/50">We accept</span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["VISA", "Mastercard", "UPI", "GPay", "Paytm", "RuPay", "COD"].map((p) => (
                <span
                  key={p}
                  className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold tracking-wide text-white/80"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/50">Trusted by</span>
            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold text-white/60">
              <span className="rounded border border-white/15 px-2.5 py-1">DAV School</span>
              <span className="rounded border border-white/15 px-2.5 py-1">Sharma Electronics</span>
              <span className="rounded border border-white/15 px-2.5 py-1">Singh Garments</span>
              <span className="rounded border border-white/15 px-2.5 py-1">+500 more</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-white/40 md:px-8">
        © {new Date().getFullYear()} Gitesh Enterprises. All rights reserved. · Made with care in Ludhiana.
      </div>
    </footer>
  );
}
