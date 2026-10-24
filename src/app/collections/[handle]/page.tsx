import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionView } from "@/components/collection/collection-view";
import {
  categories,
  getCategory,
  getProduct,
  getProducts,
  getProductsByCategory,
  type CategoryHandle,
} from "@/lib/catalog";

const ALL = { handle: "all", title: "Shop all", description: "Zulva herbal hair oil and herbal shampoo." };

function resolve(handle: string) {
  if (handle === "all") return { ...ALL, products: getProducts() };
  const category = getCategory(handle);
  if (!category) return null;
  return { ...category, products: getProductsByCategory(category.handle) };
}

export function generateStaticParams() {
  return [{ handle: "all" }, ...categories.map((c) => ({ handle: c.handle }))];
}

export async function generateMetadata({
  params,
}: PageProps<"/collections/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const collection = resolve(handle);
  if (!collection) return {};
  return {
    title: handle === "all" ? "Shop all" : `Herbal ${collection.title.toLowerCase()}`,
    description: collection.description,
    alternates: { canonical: `/collections/${handle}` },
  };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[handle]">) {
  const { handle } = await params;
  const collection = resolve(handle);
  if (!collection) notFound();

  const tabs = [
    { handle: "all", title: "All", count: getProducts().length },
    ...categories.map((c) => ({
      handle: c.handle,
      title: c.title,
      count: getProductsByCategory(c.handle).length,
    })),
  ];

  return (
    <>
      <header className="container-page pt-10 pb-10 md:pt-16 md:pb-14">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
          <ol className="flex gap-2">
            <li>
              <Link href="/" className="hover:text-ink">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">{collection.title}</li>
          </ol>
        </nav>
        <div className="mt-6 grid gap-4 md:grid-cols-12 md:items-end">
          <h1 className="font-display text-display md:col-span-7">{collection.title}</h1>
          <p className="max-w-[40ch] text-ink-soft md:col-span-4 md:col-start-9 md:pb-3">
            {collection.description}
          </p>
        </div>
      </header>

      <CollectionView
        active={handle}
        tabs={tabs}
        products={collection.products}
        editorial={<EditorialTile handle={handle} />}
      />
    </>
  );
}

/** Fills the empty grid space with something useful: the campaign or a pairing. */
function EditorialTile({ handle }: { handle: string }) {
  if (handle === "all") {
    return (
      <Link
        href="/products/zulva-herbal-hair-oil"
        className="group relative block aspect-[4/5] overflow-hidden bg-stone-2 lg:aspect-auto lg:h-full"
      >
        <Image
          src="/images/hair-oil-ritual.png"
          alt="Herbal Hair Oil among amla, hibiscus and black seed"
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover object-[3%_50%] transition-transform duration-[1.4s] ease-quint group-hover:scale-[1.03]"
        />
      </Link>
    );
  }

  const otherHandle: CategoryHandle = handle === "hair-oil" ? "shampoo" : "hair-oil";
  const other = getProductsByCategory(otherHandle)[0];
  const product = other && getProduct(other.handle);
  if (!product) return null;
  const tone = product.tone === "amber" ? "bg-amber" : "bg-indigo";

  return (
    <Link
      href={`/products/${product.handle}`}
      className={`tone-dark group grid h-full overflow-hidden text-stone sm:grid-cols-2 ${tone}`}
    >
      <div className="flex flex-col justify-between gap-10 p-6 md:p-10">
        <p className="text-sm text-stone/70">Pair it with</p>
        <div>
          <p className="font-display text-title">{product.title}</p>
          <p className="mt-2 text-stone/80">{product.summary}</p>
          <span className="mt-6 inline-block text-[0.9375rem] link-under">
            View {product.title.toLowerCase()}
          </span>
        </div>
      </div>
      <div className="relative aspect-[4/5] sm:aspect-auto">
        <Image
          src={product.images[1]?.src ?? product.images[0].src}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover transition-transform duration-[1.4s] ease-quint group-hover:scale-[1.03]"
        />
      </div>
    </Link>
  );
}
