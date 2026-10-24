"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ProductImage } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const current = images[index];

  function onScroll() {
    const el = track.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index) setIndex(i);
  }

  function goTo(i: number) {
    setIndex(i);
    track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div>
      {/* Mobile and tablet: swipeable, edge to edge */}
      <div className="relative -mx-4 md:-mx-8 lg:hidden">
        <div
          ref={track}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-roledescription="carousel"
          aria-label="Product images"
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              className="relative aspect-[4/5] w-full shrink-0 snap-center bg-concrete"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                loading={i === 0 ? "eager" : "lazy"}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: img.focus }}
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                className="grid size-6 place-items-center"
              >
                <span
                  className={cn(
                    "block h-[3px] rounded-full bg-stone transition-all duration-500 ease-quint",
                    i === index ? "w-6 opacity-100" : "w-3 opacity-50"
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: thumbnails beside a large crossfading image */}
      <div className="hidden gap-4 lg:grid lg:grid-cols-[4.5rem_1fr]">
        <ul className="flex flex-col gap-3" aria-label="Choose image">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                onMouseEnter={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "relative block aspect-[4/5] w-full overflow-hidden bg-concrete transition-opacity duration-300",
                  i === index ? "opacity-100 ring-1 ring-ink ring-offset-2 ring-offset-stone" : "opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="72px"
                  className="object-cover"
                  style={{ objectPosition: img.focus }}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="relative aspect-[4/5] overflow-hidden bg-concrete">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={current.src}
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                loading="eager"
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
                style={{ objectPosition: current.focus }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
