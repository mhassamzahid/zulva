"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { MAX_QUANTITY, useCart } from "@/components/cart/cart-provider";
import { getProducts } from "@/lib/catalog";
import { buildCheckoutUrl } from "@/lib/checkout";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, setOpen, lines, count, subtotal, setQuantity, remove, close } =
    useCart();
  const reduce = useReducedMotion();

  const checkoutUrl = buildCheckoutUrl(
    lines.map((l) => ({
      shopifyVariantId: l.variant.shopifyVariantId,
      quantity: l.quantity,
    }))
  );

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" aria-describedby={undefined}>
        <SheetHeader className="border-b border-line">
          <SheetTitle>
            Your bag
            {count > 0 && (
              <span className="ml-2 align-middle font-sans text-sm text-ink-soft tabular-nums">
                {count} {count === 1 ? "item" : "items"}
              </span>
            )}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Review the items in your bag and continue to checkout.
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <EmptyBag onNavigate={close} />
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6" aria-label="Items in your bag">
              <AnimatePresence initial={false}>
                {lines.map((line) => (
                  <motion.li
                    key={line.variantId}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, x: 40 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-4 border-b border-line py-5 last:border-b-0"
                  >
                    <Link
                      href={`/products/${line.product.handle}`}
                      onClick={close}
                      className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-concrete"
                    >
                      <Image
                        src={line.product.images[0].src}
                        alt={line.product.images[0].alt}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            href={`/products/${line.product.handle}`}
                            onClick={close}
                            className="font-display text-lg leading-tight link-draw"
                          >
                            {line.product.title}
                          </Link>
                          <p className="mt-1 text-sm text-ink-soft">
                            {line.variant.title}
                          </p>
                        </div>
                        <p className="text-sm tabular-nums">
                          {formatPrice(line.lineTotal)}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <QuantitySelector
                          size="sm"
                          value={line.quantity}
                          max={MAX_QUANTITY}
                          onChange={(q) => setQuantity(line.variantId, q)}
                          label={`Quantity of ${line.product.title}`}
                        />
                        <button
                          type="button"
                          onClick={() => remove(line.variantId)}
                          className="text-sm text-ink-soft link-under hover:text-ink"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <SheetFooter className="border-t border-line bg-stone-2/60">
              <dl className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-base font-medium tabular-nums">
                    {formatPrice(subtotal)}
                  </dd>
                </div>
                <div className="flex justify-between text-ink-soft">
                  <dt>Delivery anywhere in Pakistan</dt>
                  <dd className="tabular-nums">{formatPrice(site.deliveryFee)}</dd>
                </div>
              </dl>
              <p className="text-xs text-ink-soft">
                Delivery and payment options are confirmed at checkout.
              </p>
              <a
                href={checkoutUrl}
                className={cn(buttonVariants({ size: "lg" }), "w-full")}
              >
                Check out
              </a>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function EmptyBag({ onNavigate }: { onNavigate: () => void }) {
  const products = getProducts();
  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
      <p className="font-display text-3xl leading-tight text-balance">
        Your bag is empty.
      </p>
      <p className="mt-3 text-ink-soft">
        Zulva makes two things. Start with either.
      </p>
      <ul className="mt-8 grid grid-cols-2 gap-3">
        {products.map((p) => (
          <li key={p.handle}>
            <Link
              href={`/products/${p.handle}`}
              onClick={onNavigate}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-concrete">
                <Image
                  src={p.images[0].src}
                  alt={p.images[0].alt}
                  fill
                  sizes="200px"
                  className="object-cover transition-transform duration-700 ease-quint group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-3 font-display text-base leading-tight">{p.title}</p>
              <p className="text-sm text-ink-soft tabular-nums">
                {formatPrice(p.variants[0].price)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
