import Image from "next/image";
import Link from "next/link";
import { ImageReveal, RiseIn } from "@/components/motion/reveal";
import { getProducts, priceOf, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Diptych hero: the two studio shots side by side, so both bottles stand on
 * one stretch of concrete. On desktop the tagline (taken from the labels)
 * stands in the gap between the bottles, where the two photos' vignettes
 * meet and the wall is darkest. Below lg the headline sits on stone above
 * a shorter diptych, so the photos are not over-enlarged.
 */
export function Hero() {
  const products = getProducts();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate lg:h-[min(calc(100svh-6.75rem),56rem)] lg:min-h-[40rem] lg:overflow-hidden lg:bg-concrete"
    >
      <div className="container-page pt-10 pb-8 text-center md:pt-14 md:pb-10 lg:pointer-events-none lg:absolute lg:inset-0 lg:flex lg:max-w-none lg:items-center lg:justify-center lg:p-0">
        <RiseIn delay={0.25} className="lg:text-stone">
          <h1
            id="hero-heading"
            className="mx-auto max-w-[14ch] font-display text-[clamp(2.6rem,1.6rem+4.4vw,4.5rem)] leading-[1] tracking-[-0.015em] text-balance lg:max-w-[9ch] lg:text-[clamp(3rem,5.6vw,6rem)] lg:leading-[0.98]"
          >
            Naturally rooted for your hair.
          </h1>
          <p className="mx-auto mt-5 max-w-[30ch] text-base text-ink-soft md:text-lg lg:mt-7 lg:max-w-[22ch] lg:text-stone/80">
            Herbal hair oil and herbal shampoo, for men and women.
          </p>
        </RiseIn>
      </div>

      <div className="grid grid-cols-2 lg:absolute lg:inset-0 lg:-z-10 lg:block">
        {products.map((product, i) => (
          <HeroPanel key={product.handle} product={product} index={i} />
        ))}
      </div>
      {/* Blends the seam between the photos and seats the tagline. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-[radial-gradient(ellipse_22%_55%_at_50%_52%,rgb(22_26_43/0.5),transparent)] lg:block"
      />
    </section>
  );
}

function HeroPanel({ product, index }: { product: Product; index: number }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/7] sm:aspect-[3/4]",
        // Desktop: the panels overlap and the right one fades in from its left
        // edge, so the two shots read as one continuous wall.
        "lg:absolute lg:inset-y-0 lg:aspect-auto lg:w-[54%]",
        index === 0
          ? "lg:left-0"
          : "lg:right-0 lg:[mask-image:linear-gradient(to_right,transparent,black_15%)]"
      )}
    >
      <ImageReveal onLoad delay={0.08 * index} className="absolute inset-0">
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          loading="eager"
          fetchPriority="high"
          sizes="50vw"
          className="object-cover object-[50%_58%] lg:brightness-[0.82]"
        />
      </ImageReveal>
      <RiseIn
        delay={0.4 + 0.08 * index}
        className="absolute inset-x-0 bottom-4 flex justify-center px-2 md:bottom-8"
      >
        <Link
          href={`/products/${product.handle}`}
          className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-stone py-2 pr-2 pl-4 text-ink transition-colors duration-300 ease-quint hover:bg-white sm:pl-6"
        >
          <span className="text-left leading-tight max-sm:pr-2">
            <span className="block text-sm font-medium sm:text-[0.9375rem]">{product.title}</span>
            <span className="block text-xs text-ink-soft tabular-nums sm:text-sm">
              {formatPrice(priceOf(product))}
            </span>
          </span>
          <span className="hidden rounded-full bg-ink px-4 py-2 text-sm text-stone transition-colors duration-300 group-hover:bg-indigo sm:inline">
            Shop
          </span>
        </Link>
      </RiseIn>
    </div>
  );
}
