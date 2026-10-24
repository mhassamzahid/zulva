import Image from "next/image";
import Link from "next/link";
import { QuickAddButton } from "@/components/cart/add-to-cart-button";
import { priceOf, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  sizes = "(min-width: 1024px) 33vw, 50vw",
  priority = false,
  className,
}: {
  product: Product;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const [primary, secondary] = product.images;
  const href = `/products/${product.handle}`;
  const variant = product.variants[0];

  return (
    <article className={cn("group relative", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-concrete">
        <Link href={href} aria-label={product.title} className="absolute inset-0">
          <Image
            src={primary.src}
            alt={primary.alt}
            fill
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            className="object-cover transition-transform duration-[1.2s] ease-quint group-hover:scale-[1.03]"
          />
          {secondary && (
            <Image
              src={secondary.src}
              alt=""
              fill
              sizes={sizes}
              className="object-cover opacity-0 transition-opacity duration-700 ease-quint group-hover:opacity-100 max-md:hidden"
            />
          )}
        </Link>

        {product.badges.length > 0 && (
          <ul className="pointer-events-none absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.badges.map((badge) => (
              <li
                key={badge}
                className="rounded-full bg-stone/90 px-2.5 py-1 text-xs text-ink"
              >
                {badge}
              </li>
            ))}
          </ul>
        )}

        <div className="absolute right-3 bottom-3 transition-[opacity,transform] duration-500 ease-quint md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
          <QuickAddButton
            handle={product.handle}
            variantId={variant.id}
            title={product.title}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-lg leading-tight md:text-xl">
            <Link href={href} className="link-draw">
              {product.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-ink-soft">{product.size.split(" / ")[0]}</p>
        </div>
        <p className="shrink-0 text-[0.9375rem] tabular-nums">
          {formatPrice(priceOf(product))}
        </p>
      </div>
    </article>
  );
}
