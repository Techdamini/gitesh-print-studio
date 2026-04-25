export const WHATSAPP_NUMBER = "918146632476";
export const PHONE_DISPLAY = "+91 8146632476";
export const EMAIL = "giteshenterprises240@gmail.com";
export const ADDRESS =
  "Ground Floor, B-XXXIV, 592/3, Near Chitti Kothi, Peeru Banda, Chander Nagar, Ludhiana – 141001";
export const GSTIN = "03AFHPK0347Q2ZA";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function orderMessage(productName: string, size?: string, qty?: number): string {
  const parts = [`Hi, I want to order ${productName} from Gitesh Enterprises`];
  if (size) parts.push(`Size: ${size}`);
  if (qty) parts.push(`Quantity: ${qty}`);
  return parts.join("\n");
}
