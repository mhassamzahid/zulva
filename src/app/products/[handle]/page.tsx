import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchase } from "@/components/product/product-purchase";
import { ProductCard } from "@/components/product/product-card";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getCategory,
  getProduct,
  getProducts,
  getRelatedProducts,
  ingredients,
  priceOf,
} from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getProducts().map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return {};
  const description = `${product.summary} ${product.size}, for men and women. ${formatPrice(priceOf(product))}.`;
  return {
    title: product.title,
    description,
    alternates: { canonical: `/products/${product.handle}` },
    openGraph: {
      title: `Zulva ${product.title}`,
      description,
      images: [{ url: product.images[0].src, width: 1024, height: 1024, alt: product.images[0].alt }],
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[handle]">) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product.handle);
  const herbNotes = ingredients.filter((i) => product.keyIngredients.includes(i.name));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `Zulva ${product.title}`,
          description: product.description.join(" "),
          image: product.images.map((i) => `${site.url}${i.src}`),
          brand: { "@type": "Brand", name: "Zulva" },
          offers: product.variants.map((v) => ({
            "@type": "Offer",
            price: v.price,
            priceCurrency: site.currency,
            url: `${site.url}/products/${product.handle}`,
          })),
        }}
      />

      <div className="container-page pt-4 pb-20 md:pt-8 md:pb-28">
        <nav aria-label="Breadcrumb" className="mb-6 hidden text-sm text-ink-soft lg:block">
          <ol className="flex gap-2">
            <li><Link href="/" className="hover:text-ink">Home</Link></li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`/collections/${product.category}`} className="hover:text-ink">
                {category?.title}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">{product.title}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} />
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm text-ink-soft">Zulva {category?.title.toLowerCase()}</p>
              <h1 className="mt-2 font-display text-headline text-balance">{product.title}</h1>
              <p className="mt-4 max-w-[40ch] text-lg text-ink-soft">{product.summary}</p>

              <div className="mt-8">
                <ProductPurchase product={product} />
              </div>

              <Accordion multiple defaultValue={["description"]} className="mt-10 border-t border-line">
                <AccordionItem value="description" className="border-b border-line">
                  <AccordionTrigger className="py-5 text-[0.9375rem] font-normal hover:no-underline">
                    Description
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {product.description.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="label" className="border-b border-line">
                  <AccordionTrigger className="py-5 text-[0.9375rem] font-normal hover:no-underline">
                    On the label
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[0.9375rem] leading-relaxed text-ink-soft">
                    <ul className="space-y-1.5">
                      {product.labelClaims.map((claim) => (
                        <li key={claim}>{claim}</li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm">Claims as printed on Zulva&rsquo;s packaging.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="ingredients" className="border-b border-line">
                  <AccordionTrigger className="py-5 text-[0.9375rem] font-normal hover:no-underline">
                    Key herbs
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[0.9375rem] leading-relaxed text-ink-soft">
                    <dl className="space-y-4">
                      {herbNotes.map((herb) => (
                        <div key={herb.name}>
                          <dt className="text-ink">
                            {herb.name} <span className="text-sm italic text-ink-soft">{herb.botanical}</span>
                          </dt>
                          <dd>{herb.note}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-4 text-sm">
                      For the full ingredient list, see the bottle.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="delivery" className="border-b border-line">
                  <AccordionTrigger className="py-5 text-[0.9375rem] font-normal hover:no-underline">
                    Delivery and returns
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[0.9375rem] leading-relaxed text-ink-soft">
                    <p>
                      Delivery costs {formatPrice(site.deliveryFee)} anywhere in Pakistan.
                      Delivery and payment options are shown at checkout.
                    </p>
                    <p>
                      Returns follow our{" "}
                      <a href={site.returnPolicyUrl}>return and refund policy</a>. More on the{" "}
                      <Link href="/shipping-returns">shipping and returns page</Link>.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-line bg-stone-2/50 py-20 md:py-28">
          <div className="container-page">
            <h2 id="related-heading" className="font-display text-headline">
              Pair it with
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 md:gap-x-6 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.handle}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
