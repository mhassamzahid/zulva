// Checkout adapter.
//
// The store already runs on Shopify, which owns payment methods, delivery
// rates and order handling. Rather than re-implementing any of that, we hand
// the cart to Shopify using a cart permalink:
//   https://zulva.pk/cart/<variantId>:<qty>,<variantId>:<qty>
// Whatever payment options the merchant enables in Shopify (cards, wallets,
// cash on delivery, etc.) then appear there. Nothing here assumes which ones.
//
// To swap providers, keep this signature and change the implementation.

import { site } from "@/lib/site";

export type CheckoutLine = { shopifyVariantId: string; quantity: number };

export function buildCheckoutUrl(lines: CheckoutLine[]) {
  const path = lines
    .filter((l) => l.quantity > 0)
    .map((l) => `${l.shopifyVariantId}:${l.quantity}`)
    .join(",");
  return `https://${site.domain}/cart/${path}`;
}
