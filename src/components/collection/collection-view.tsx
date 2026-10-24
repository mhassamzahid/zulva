"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, Check } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { priceOf, type Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export type CollectionTab = { handle: string; title: string; count: number };

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "name", label: "Name, A to Z" },
] as const;
type SortValue = (typeof sorts)[number]["value"];

function sortProducts(list: Product[], sort: SortValue) {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => priceOf(a) - priceOf(b));
    case "price-desc":
      return copy.sort((a, b) => priceOf(b) - priceOf(a));
    case "name":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return copy;
  }
}

export function CollectionView({
  active,
  tabs,
  products,
  editorial,
}: {
  active: string;
  tabs: CollectionTab[];
  products: Product[];
  /** Editorial tile that fills the rest of the last grid row. */
  editorial?: React.ReactNode;
}) {
  const [sort, setSort] = useState<SortValue>("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  const changeSort = setSort;

  // Remaining columns in the last row at 3-up; the editorial tile fills them.
  const remainder = 3 - (sorted.length % 3 || 3);
  const editorialSpan = remainder === 2 ? "lg:col-span-2" : "lg:col-span-1";

  return (
    <>
      <div className="sticky top-16 z-20 border-y border-line bg-stone/95 backdrop-blur-sm md:top-[4.5rem]">
        <div className="container-page flex h-14 items-center justify-between gap-4">
          <nav aria-label="Categories" className="-mx-1 overflow-x-auto">
            <ul className="flex items-center gap-1">
              {tabs.map((tab) => {
                const isActive = tab.handle === active;
                return (
                  <li key={tab.handle}>
                    <Link
                      href={`/collections/${tab.handle}`}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-sm whitespace-nowrap transition-colors",
                        isActive ? "bg-ink text-stone" : "hover:bg-ink/5"
                      )}
                    >
                      {tab.title}
                      <span className={cn("tabular-nums", isActive ? "text-stone/60" : "text-ink-soft")}>
                        {tab.count}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <label className="hidden items-center gap-3 text-sm md:flex">
            <span className="text-ink-soft">Sort by</span>
            <select
              value={sort}
              onChange={(e) => changeSort(e.target.value as SortValue)}
              className="h-9 rounded-full border border-ink/20 bg-transparent pr-8 pl-4 text-sm"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-ink/20 px-4 text-sm md:hidden"
          >
            <SlidersHorizontal className="size-4" strokeWidth={1.25} />
            Filter
          </button>
        </div>
      </div>

      <div className="container-page py-10 md:py-14">
        {sorted.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-title">Nothing here yet.</p>
            <Link href="/collections/all" className="mt-4 inline-block link-under">
              See all products
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-x-3 gap-y-12 md:gap-x-6 lg:grid-cols-3">
            {sorted.map((product, i) => (
              <li key={product.handle}>
                <ProductCard product={product} priority={i < 2} />
              </li>
            ))}
            {editorial && remainder > 0 && (
              <li className={cn("col-span-2 max-lg:mt-4", editorialSpan)}>{editorial}</li>
            )}
          </ul>
        )}
      </div>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="bottom" aria-describedby={undefined} className="px-5 pt-6 pb-8">
          <SheetTitle>Filter and sort</SheetTitle>
          <fieldset className="mt-6">
            <legend className="text-sm text-ink-soft">Category</legend>
            <ul className="mt-2 divide-y divide-line">
              {tabs.map((tab) => (
                <li key={tab.handle}>
                  <Link
                    href={`/collections/${tab.handle}`}
                    onClick={() => setDrawerOpen(false)}
                    className="flex h-12 items-center justify-between"
                  >
                    <span>
                      {tab.title} <span className="text-ink-soft tabular-nums">({tab.count})</span>
                    </span>
                    {tab.handle === active && <Check className="size-4" strokeWidth={1.5} />}
                  </Link>
                </li>
              ))}
            </ul>
          </fieldset>
          <fieldset className="mt-6">
            <legend className="text-sm text-ink-soft">Sort by</legend>
            <ul className="mt-2 divide-y divide-line">
              {sorts.map((s) => (
                <li key={s.value}>
                  <button
                    type="button"
                    onClick={() => changeSort(s.value)}
                    aria-pressed={sort === s.value}
                    className="flex h-12 w-full items-center justify-between text-left"
                  >
                    {s.label}
                    {sort === s.value && <Check className="size-4" strokeWidth={1.5} />}
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className={cn(buttonVariants({ size: "lg" }), "mt-8 w-full")}
          >
            Show {products.length} {products.length === 1 ? "product" : "products"}
          </button>
        </SheetContent>
      </Sheet>
    </>
  );
}
