// Store-wide facts. Everything here was verified against the live zulva.pk
// storefront snapshot in resources/Zulva.html — keep it that way. If a fact
// is not confirmed by the business, leave it out rather than guessing.

export const site = {
  name: "Zulva",
  domain: "zulva.pk",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zulva.pk",
  tagline: "Naturally rooted for your hair",
  description:
    "Zulva herbal hair oil and herbal shampoo for men and women. Delivered across Pakistan.",
  currency: "PKR",
  // "Delivery Charges Rs.300/- All over Pakistan" — storefront announcement bar.
  deliveryFee: 300,
  // "PCSIR TESTED PRODUCTS" — storefront homepage.
  certification: "PCSIR tested",
  social: {
    instagram: "https://www.instagram.com/zulva.pk/",
    facebook: "https://facebook.com/zulva.pk",
  },
  // No WhatsApp number is published on the storefront yet. Set
  // NEXT_PUBLIC_WHATSAPP_NUMBER (international format, digits only, e.g.
  // 923001234567) and every WhatsApp entry point goes live.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  // Existing Shopify policy page; we link to it instead of restating terms.
  returnPolicyUrl: "https://zulva.pk/pages/return-and-refund-policy",
  privacyPolicyUrl: "https://zulva.pk/policies/privacy-policy",
  termsUrl: "https://zulva.pk/policies/terms-of-service",
} as const;

export function whatsappHref(message?: string) {
  if (!site.whatsappNumber) return "/contact";
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.whatsappNumber}${text}`;
}

export const navigation = [
  { label: "Shop all", href: "/collections/all" },
  { label: "Hair oil", href: "/collections/hair-oil" },
  { label: "Shampoo", href: "/collections/shampoo" },
  { label: "About", href: "/about" },
] as const;

export const helpLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Shipping & returns", href: "/shipping-returns" },
  { label: "FAQ", href: "/faq" },
  { label: "Search", href: "/search" },
] as const;
