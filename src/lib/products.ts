import flex from "@/assets/product-flex.jpg";
import led from "@/assets/product-led.jpg";
import idcard from "@/assets/product-idcard.jpg";
import trophy from "@/assets/product-trophy.jpg";
import nameplate from "@/assets/product-nameplate.jpg";
import stickers from "@/assets/product-stickers.jpg";
import poster from "@/assets/product-poster.jpg";
import standee from "@/assets/product-standee.jpg";
import card from "@/assets/product-card.jpg";

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  short: string;
  description: string;
  features: string[];
  defaultSize?: string;
  hasCustomSize?: boolean;
};

export const products: Product[] = [
  {
    slug: "flex-printing",
    name: "Flex Banner Printing",
    category: "Outdoor",
    price: 12,
    unit: "sq ft",
    image: flex,
    short: "HD flex banners with vivid colors and weatherproof finish.",
    description:
      "Premium quality flex printing perfect for shop boards, hoardings, events and outdoor advertising. Vibrant CMYK + spot color reproduction on heavy-duty 440 GSM flex.",
    features: ["HD 1440 DPI print", "Weather & UV resistant", "Eyelets included", "Same-day printing"],
    hasCustomSize: true,
    defaultSize: "6 x 4 ft",
  },
  {
    slug: "led-board",
    name: "LED Glow Sign Board",
    category: "Signage",
    price: 450,
    unit: "sq ft",
    image: led,
    short: "Bright LED signage that turns heads — day and night.",
    description:
      "Custom LED glow sign boards built with branded acrylic, ACP backing and high-output SMD LEDs. Perfect for shopfronts, restaurants and offices.",
    features: ["3D / acrylic letters", "5-year LED warranty", "Energy efficient SMD", "Installation included"],
    hasCustomSize: true,
    defaultSize: "8 x 3 ft",
  },
  {
    slug: "id-cards",
    name: "PVC ID Cards",
    category: "Cards",
    price: 40,
    unit: "piece",
    image: idcard,
    short: "Durable PVC ID cards with photo, barcode & lanyard.",
    description:
      "Professional double-sided PVC ID cards for schools, colleges and businesses. Includes design, lamination and free lanyard.",
    features: ["CR80 standard size", "Double-sided print", "Free lanyard", "Bulk discounts"],
  },
  {
    slug: "trophies",
    name: "Custom Trophies & Awards",
    category: "Awards",
    price: 350,
    unit: "piece",
    image: trophy,
    short: "Premium metal, crystal & acrylic awards — engraved.",
    description:
      "Bespoke trophies and momentos for sports, corporate events and ceremonies. Choose metal, crystal or acrylic with custom engraving.",
    features: ["Custom engraving", "Multiple sizes", "Velvet box packaging", "Bulk orders welcome"],
  },
  {
    slug: "name-plates",
    name: "Designer Name Plates",
    category: "Signage",
    price: 250,
    unit: "piece",
    image: nameplate,
    short: "Brass, steel & acrylic name plates for home & office.",
    description:
      "Elegant engraved name plates in brass, stainless steel, wood and acrylic — perfect for residences, cabins and clinics.",
    features: ["Multiple materials", "Custom typography", "Mounting hardware", "Long-lasting finish"],
    hasCustomSize: true,
    defaultSize: "12 x 4 inch",
  },
  {
    slug: "stickers",
    name: "Vinyl Stickers",
    category: "Stickers",
    price: 8,
    unit: "piece",
    image: stickers,
    short: "Die-cut vinyl stickers in any shape or quantity.",
    description:
      "Premium glossy/matte vinyl stickers with precise die-cut shapes. Ideal for branding, packaging and product labels.",
    features: ["Glossy / matte finish", "Custom die-cut", "Waterproof vinyl", "Min order 50 pcs"],
    hasCustomSize: true,
    defaultSize: "3 x 3 inch",
  },
  {
    slug: "posters",
    name: "Posters & Brochures",
    category: "Print",
    price: 15,
    unit: "piece",
    image: poster,
    short: "High-resolution posters and tri-fold brochures.",
    description:
      "Sharp 300 DPI offset and digital prints on premium 170-300 GSM art paper. Available matte, glossy and lamination.",
    features: ["A4, A3, A2, A1 sizes", "Glossy / matte paper", "Lamination available", "Fast turnaround"],
    hasCustomSize: true,
    defaultSize: "A3",
  },
  {
    slug: "standee",
    name: "Roll-Up Standee",
    category: "Display",
    price: 950,
    unit: "piece",
    image: standee,
    short: "Portable 6x3 ft roll-up standees with carry bag.",
    description:
      "Lightweight roll-up standees with sturdy aluminium base and printed flex panel. Perfect for events, exhibitions and stores.",
    features: ["6 x 3 ft standard", "Carry bag included", "Replaceable graphic", "Quick setup"],
  },
  {
    slug: "business-cards",
    name: "Premium Business Cards",
    category: "Cards",
    price: 3,
    unit: "piece",
    image: card,
    short: "Luxe matte, spot UV and foil-stamped business cards.",
    description:
      "Make a memorable first impression with thick 350 GSM cards. Options for spot UV, foil stamping and round corners.",
    features: ["350 GSM stock", "Spot UV / foil", "Round corners", "Min 100 pcs"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
