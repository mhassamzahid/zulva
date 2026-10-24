# Zulva storefront

Next.js 16 (App Router) storefront for zulva.pk: herbal hair oil and herbal shampoo.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits only, international format (e.g. `923001234567`). Until set, WhatsApp links fall back to `/contact`. |
| `NEWSLETTER_WEBHOOK_URL` | POST endpoint that receives `{ email, source }`. Until set, the form says sign-up isn't connected. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata and the sitemap. Defaults to `https://zulva.pk`. |

## Where things live

- `src/lib/catalog.ts`: products and categories. **Mock data** built from the
  Shopify storefront snapshot in `resources/` and the product labels. Prices,
  handles and Shopify variant IDs match the live store. Swap the getters for
  Storefront API queries returning the same `Product` shape.
- `src/lib/site.ts`: verified store facts (delivery fee, PCSIR, social links, policy URLs).
- `src/lib/checkout.ts`: checkout hands the bag to Shopify via a cart
  permalink (`zulva.pk/cart/<variant>:<qty>`), so payment methods and delivery
  options come from the merchant's Shopify settings.
- `src/components/cart/`: localStorage-backed cart store, drawer, add-to-bag buttons.
- `src/app/globals.css`: palette and type tokens.

## Content rules

Only publish facts the business has confirmed. There are no reviews, ratings,
"best seller" badges, stock counts, delivery-time promises or payment-method
claims, because none were supplied.
