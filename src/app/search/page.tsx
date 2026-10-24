import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { GridSkeleton } from "@/components/layout/skeletons";
import { getProducts, searchProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

const suggestions = ["Hair oil", "Shampoo", "Amla", "Shikakai"];

type SearchParams = PageProps<"/search">["searchParams"];

async function readQuery(searchParams: SearchParams) {
  const { q } = await searchParams;
  return typeof q === "string" ? q.trim() : "";
}

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <div className="container-page pt-12 pb-24 md:pt-20">
      <h1 className="sr-only">Search</h1>
      <Suspense fallback={<SearchForm query="" />}>
        <SearchFormWithQuery searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<div className="mt-16"><GridSkeleton count={2} /></div>}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function SearchFormWithQuery({ searchParams }: { searchParams: SearchParams }) {
  return <SearchForm query={await readQuery(searchParams)} />;
}

function SearchForm({ query }: { query: string }) {
  return (
    <form action="/search" role="search" className="max-w-3xl">
      <label htmlFor="q" className="text-sm text-ink-soft">
        Search Zulva
      </label>
      <div className="mt-3 flex items-center gap-3 border-b border-ink/30 focus-within:border-ink">
        <Search className="size-6 shrink-0 text-ink-soft" strokeWidth={1.25} aria-hidden />
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={query}
          autoFocus
          autoComplete="off"
          placeholder="Hair oil, shampoo, amla"
          className="h-16 min-w-0 flex-1 bg-transparent font-display text-[clamp(1.75rem,1.2rem+2.5vw,3rem)] placeholder:text-ink/25 focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
        />
        <button type="submit" className="shrink-0 text-[0.9375rem] link-draw">
          Search
        </button>
      </div>
    </form>
  );
}

async function SearchResults({ searchParams }: { searchParams: SearchParams }) {
  const query = await readQuery(searchParams);
  const results = searchProducts(query);

  if (!query) {
    return (
      <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
        <span className="mr-2 text-ink-soft">Try</span>
        {suggestions.map((s) => (
          <Link
            key={s}
            href={`/search?q=${encodeURIComponent(s)}`}
            className="rounded-full border border-ink/20 px-4 py-2 transition-colors hover:border-ink"
          >
            {s}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <>
      <p className="mt-8 text-ink-soft" aria-live="polite">
        {results.length === 0
          ? `No products match "${query}".`
          : `${results.length} ${results.length === 1 ? "product matches" : "products match"} "${query}".`}
      </p>

      {results.length === 0 ? (
        <div className="mt-16">
          <h2 className="font-display text-title">Everything Zulva makes</h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-12 md:gap-x-6 lg:grid-cols-3">
            {getProducts().map((p) => (
              <li key={p.handle}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 md:gap-x-6 lg:grid-cols-3">
          {results.map((p, i) => (
            <li key={p.handle}>
              <ProductCard product={p} priority={i < 2} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
