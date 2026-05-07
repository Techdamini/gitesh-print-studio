import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";
import { CartDrawer } from "./CartDrawer";
import { CartProvider } from "@/lib/cart";
import { ScrollProgress } from "./ScrollProgress";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-background scroll-smooth">
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
