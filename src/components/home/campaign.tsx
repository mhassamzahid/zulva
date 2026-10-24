import Image from "next/image";
import Link from "next/link";
import { ImageReveal } from "@/components/motion/reveal";

export function Campaign() {
  return (
    <section aria-label="Herbal Hair Oil campaign" className="bg-stone-2">
      <ImageReveal className="relative aspect-[4/5] w-full sm:aspect-[3/2]">
        <Image
          src="/images/hair-oil-ritual.png"
          alt="Zulva Herbal Hair Oil campaign: the bottle with amla, hibiscus and black seed, and the label promises nourishes scalp, reduces hair fall, thicker and stronger hair, adds natural shine"
          fill
          sizes="100vw"
          className="object-cover object-[100%_50%] sm:object-center"
        />
      </ImageReveal>
      <div className="container-page flex flex-col gap-3 py-6 text-[0.9375rem] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ink-soft">Herbal Hair Oil, 150 ml</p>
        <Link href="/products/zulva-herbal-hair-oil" className="link-under self-start sm:self-auto">
          See the hair oil
        </Link>
      </div>
    </section>
  );
}
