"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Markup is identical on server and client. Reduced-motion users are handled
// in globals.css ([data-motion] overrides), which avoids hydration mismatches
// from reading the media query during render.

/**
 * Unmasks an image from the bottom edge as it scrolls into view.
 * Reserved for large photography so the effect stays special.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
  onLoad = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Animate on mount instead of on scroll (for above-the-fold images). */
  onLoad?: boolean;
}) {
  const hidden = { clipPath: "inset(100% 0% 0% 0%)" };
  const shown = { clipPath: "inset(0% 0% 0% 0%)" };
  const viewport = { once: true, margin: "0px 0px -10% 0px" };
  const transition = { duration: 1.2, ease, delay };

  return (
    <motion.div
      data-motion
      className={cn("overflow-hidden", className)}
      initial={hidden}
      {...(onLoad ? { animate: shown } : { whileInView: shown, viewport })}
      transition={transition}
    >
      <motion.div
        data-motion
        className="relative size-full"
        initial={{ scale: 1.12 }}
        {...(onLoad ? { animate: { scale: 1 } } : { whileInView: { scale: 1 }, viewport })}
        transition={{ ...transition, duration: 1.6 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Fades text up once, on mount. Used only by the homepage hero. */
export function RiseIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      data-motion
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
