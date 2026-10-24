"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { MAX_QUANTITY } from "@/components/cart/cart-provider";
import { QuantitySelector } from "@/components/product/quantity-selector";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { site, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ProductPurchase({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [showSticky, setShowSticky] = useState(false);
  const anchor = useRef<HTMLDivElement>(null);

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  // Show the sticky bar once the main button has scrolled above the viewport.
  // The root is stretched far downward so only crossing the top edge counts;
  // otherwise a jump from "below the fold" to "above it" fires no change.
  useEffect(() => {
    const el = anchor.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { rootMargin: "0px 0px 100000px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Lets the floating WhatsApp button move above the bar (see globals.css).
  useEffect(() => {
    document.body.toggleAttribute("data-sticky-bar", showSticky);
    return () => document.body.removeAttribute("data-sticky-bar");
  }, [showSticky]);

  return (
    <div>
      <p className="text-2xl tabular-nums">{formatPrice(variant.price)}</p>

      {product.variants.length > 1 && (
        <fieldset className="mt-8">
          <legend className="text-sm text-ink-soft">Size</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <label
                key={v.id}
                className={cn(
                  "inline-flex h-11 cursor-pointer items-center rounded-full border px-5 text-sm transition-colors",
                  v.id === variantId ? "border-ink bg-ink text-stone" : "border-ink/20 hover:border-ink"
                )}
              >
                <input
                  type="radio"
                  name="variant"
                  value={v.id}
                  checked={v.id === variantId}
                  onChange={() => setVariantId(v.id)}
                  className="sr-only"
                />
                {v.title}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div ref={anchor} className="mt-8 flex gap-3">
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          max={MAX_QUANTITY}
          label="Quantity"
        />
        <AddToCartButton
          handle={product.handle}
          variantId={variant.id}
          quantity={quantity}
          tone={product.tone}
          className="flex-1"
        />
      </div>

      <a
        href={whatsappHref(`Hi Zulva, I have a question about the ${product.title}.`)}
        className="mt-4 inline-block text-[0.9375rem] link-under"
      >
        Ask a question on WhatsApp
      </a>

      <dl className="mt-10 grid gap-4 border-t border-line pt-6 text-[0.9375rem]">
        <div className="grid grid-cols-[8rem_1fr] gap-4">
          <dt className="text-ink-soft">Delivery</dt>
          <dd>
            {formatPrice(site.deliveryFee)} anywhere in Pakistan. Options and timing
            are confirmed at checkout.
          </dd>
        </div>
        <div className="grid grid-cols-[8rem_1fr] gap-4">
          <dt className="text-ink-soft">Size</dt>
          <dd>{product.size}</dd>
        </div>
        <div className="grid grid-cols-[8rem_1fr] gap-4">
          <dt className="text-ink-soft">Made for</dt>
          <dd>Men and women</dd>
        </div>
        <div className="grid grid-cols-[8rem_1fr] gap-4">
          <dt className="text-ink-soft">Testing</dt>
          <dd>{site.certification}</dd>
        </div>
      </dl>

      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-stone/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden"
          >
            <div className="flex items-center gap-3">
              <div className="relative size-12 shrink-0 overflow-hidden bg-concrete">
                <Image src={product.images[0].src} alt="" fill sizes="48px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display leading-tight">{product.title}</p>
                <p className="text-sm text-ink-soft tabular-nums">{formatPrice(variant.price)}</p>
              </div>
              <AddToCartButton
                handle={product.handle}
                variantId={variant.id}
                quantity={quantity}
                tone={product.tone}
                size="default"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
