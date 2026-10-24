"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils";
import type { ProductTone } from "@/lib/catalog";

type Props = {
  handle: string;
  variantId: string;
  quantity?: number;
  tone?: ProductTone | "ink" | "light";
  size?: "default" | "lg";
  className?: string;
  children?: React.ReactNode;
};

const toneVariant = {
  amber: "amber",
  indigo: "indigo",
  ink: "default",
  light: "light",
} as const;

export function AddToCartButton({
  handle,
  variantId,
  quantity = 1,
  tone = "ink",
  size = "lg",
  className,
  children = "Add to bag",
}: Props) {
  const { add, open } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  function handleClick() {
    add(handle, variantId, quantity);
    setAdded(true);
    clearTimeout(timer.current);
    // Let the confirmation register before the drawer slides over it.
    timer.current = setTimeout(() => {
      open();
      setAdded(false);
    }, 650);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        buttonVariants({ variant: toneVariant[tone], size }),
        "relative overflow-hidden",
        className
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={added ? "added" : "idle"}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2"
        >
          {added ? (
            <>
              <Check className="size-4" strokeWidth={1.75} aria-hidden />
              Added
            </>
          ) : (
            children
          )}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {added ? "Added to your bag" : ""}
      </span>
    </button>
  );
}

/** Compact round button used on product cards. */
export function QuickAddButton({
  handle,
  variantId,
  title,
}: {
  handle: string;
  variantId: string;
  title: string;
}) {
  const { add, open } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        add(handle, variantId, 1);
        setAdded(true);
        setTimeout(() => {
          open();
          setAdded(false);
        }, 500);
      }}
      aria-label={`Add ${title} to bag`}
      className="grid size-11 place-items-center rounded-full bg-stone text-ink transition-[background-color,color,transform] duration-300 ease-quint hover:bg-ink hover:text-stone active:scale-95"
    >
      {added ? (
        <Check className="size-4" strokeWidth={1.75} />
      ) : (
        <Plus className="size-4" strokeWidth={1.5} />
      )}
    </button>
  );
}
