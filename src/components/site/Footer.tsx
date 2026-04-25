import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Printer } from "lucide-react";
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
          <p className="mt-4 text-xs text-white/40">GSTIN: {GSTIN}</p>
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
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-white/40 md:px-8">
        © {new Date().getFullYear()} Gitesh Enterprises. All rights reserved.
      </div>
    </footer>
  );
}
