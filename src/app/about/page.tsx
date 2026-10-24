import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InfoSection, PageIntro } from "@/components/layout/page-intro";
import { ImageReveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { ingredients } from "@/lib/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Zulva",
  description: "Zulva makes herbal hair oil and herbal shampoo for men and women in Pakistan.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro title="Herbal hair care, kept simple.">
        <p>
          Zulva makes two products: a herbal hair oil and a herbal shampoo, both
          for men and women, both sold across Pakistan.
        </p>
      </PageIntro>

      <ImageReveal className="relative aspect-[4/5] w-full sm:aspect-[3/2]">
        <Image
          src="/images/hair-oil-ritual.png"
          alt="Zulva Herbal Hair Oil with amla, hibiscus and black seed on a stone plinth"
          fill
          sizes="100vw"
          className="object-cover object-[3%_50%] sm:object-center"
        />
      </ImageReveal>

      <div className="container-page py-10 md:py-16">
        <InfoSection title="What we make">
          <p>
            The <Link href="/products/zulva-herbal-hair-oil">Herbal Hair Oil</Link> is
            enriched with 13 essential herbs and comes in a 150 ml bottle.
          </p>
          <p>
            The <Link href="/products/zulva-herbal-shampoo">Herbal Shampoo</Link> is a
            strengthening formula with amla, reetha and shikakai, in a 200 ml bottle.
          </p>
        </InfoSection>
        <InfoSection title="The herbs">
          <p>
            Both formulas are built around three herbs with a long history in South
            Asian hair care:{" "}
            {ingredients.map((i) => i.name.toLowerCase()).join(", ").replace(/, ([^,]*)$/, " and $1")}.
          </p>
        </InfoSection>
        <InfoSection title="Testing">
          <p>
            Zulva products are {site.certification}, by the Pakistan Council of
            Scientific and Industrial Research.
          </p>
        </InfoSection>
        <div className="border-t border-line pt-10 md:pt-14">
          <Link href="/collections/all" className={buttonVariants({ size: "lg" })}>
            Shop the range
          </Link>
        </div>
      </div>
    </>
  );
}
