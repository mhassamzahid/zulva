import { Hero } from "@/components/home/hero";
import { ProductPair } from "@/components/home/product-pair";
import { Ingredients } from "@/components/home/ingredients";
import { Campaign } from "@/components/home/campaign";
import { BrandNote } from "@/components/home/brand-note";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Zulva",
          url: site.url,
          logo: `${site.url}/images/zulva-emblem.png`,
          sameAs: [site.social.instagram, site.social.facebook],
        }}
      />
      <Hero />
      <ProductPair />
      <Ingredients />
      <Campaign />
      <BrandNote />
    </>
  );
}
