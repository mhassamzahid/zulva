import Link from "next/link";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { getCategory, getProducts, priceOf, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const toneClass = {
  amber: "bg-amber",
  indigo: "bg-indigo",
} as const;

/**
 * The two products as a pair of colour fields: amber for the oil, indigo for
 * the shampoo, taken from the bottle and the label. This is the homepage's
 * shop-by-category and featured section in one.
 */
export function ProductPair() {
  const products = getProducts();
  return (
    <section aria-labelledby="pair-heading" className="pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="container-page mb-10 grid gap-4 md:mb-14 md:grid-cols-12">
        <h2 id="pair-heading" className="font-display text-headline md:col-span-6">
          Two herbal formulas
        </h2>
        <p className="max-w-[46ch] text-ink-soft md:col-span-5 md:col-start-8 md:self-end">
          An oil enriched with 13 essential herbs, and a shampoo built on amla,
          reetha and shikakai. Use one, or keep both on the shelf.
        </p>
      </div>
      <div className="grid md:grid-cols-2">
        {products.map((product) => (
          <PairPanel key={product.handle} product={product} />
        ))}
      </div>
    </section>
  );
}

function PairPanel({ product }: { product: Product }) {
  const href = `/products/${product.handle}`;
  const category = getCategory(product.category);
  // No photo here: the hero already shows both bottles. The panel is the
  // label's own colour, set with the label's own words.
  return (
    <article className={cn("tone-dark flex flex-col text-stone", toneClass[product.tone])}>
      <div className="flex flex-1 flex-col px-5 py-12 md:px-10 md:py-16 xl:px-14 xl:py-20">
        <div className="flex items-baseline justify-between gap-6 border-b border-stone/20 pb-5 text-sm text-stone/70">
          <span>{category?.title}</span>
          <span>{product.size}</span>
        </div>
        <h3 className="mt-10 font-display text-[clamp(2.25rem,1.6rem+2.6vw,4rem)] leading-[1.02] md:mt-14">
          <Link href={href} className="link-draw">
            {product.title}
          </Link>
        </h3>
        <p className="mt-4 max-w-[34ch] text-lg text-stone/80">{product.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-2 text-sm">
          {product.keyIngredients.map((herb) => (
            <li key={herb} className="rounded-full border border-stone/30 px-3 py-1 text-stone/85">
              {herb}
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-auto md:pt-16">
          <p className="text-lg tabular-nums">{formatPrice(priceOf(product))}</p>
          <AddToCartButton
            handle={product.handle}
            variantId={product.variants[0].id}
            size="default"
            tone="light"
          />
          <Link href={href} className="text-[0.9375rem] link-under">
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
