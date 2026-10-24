import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { site, whatsappHref } from "@/lib/site";

export function BrandNote() {
  return (
    <section aria-labelledby="brand-heading" className="container-page py-20 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <Image
          src="/images/zulva-emblem.png"
          alt=""
          width={340}
          height={340}
          className="mx-auto size-16 md:size-20"
        />
        <h2 id="brand-heading" className="sr-only">
          About Zulva
        </h2>
        <p className="mt-8 font-display text-title text-balance md:text-[2.5rem] md:leading-[1.2]">
          Zulva makes herbal hair care for men and women. One oil and one
          shampoo, both built on herbs South Asian households have trusted for
          generations.
        </p>
        <Link href="/about" className="mt-8 inline-block text-[0.9375rem] link-under">
          About Zulva
        </Link>
      </div>

      <ul className="mt-20 grid border-y border-line text-center text-[0.9375rem] md:mt-28 md:grid-cols-3">
        <li className="px-6 py-6 md:py-8">
          {formatPrice(site.deliveryFee)} delivery anywhere in Pakistan
        </li>
        <li className="border-t border-line px-6 py-6 md:border-t-0 md:border-l md:py-8">
          {site.certification} products
        </li>
        <li className="border-t border-line px-6 py-6 md:border-t-0 md:border-l md:py-8">
          Questions?{" "}
          <a href={whatsappHref()} className="link-under">
            Message us on WhatsApp
          </a>
        </li>
      </ul>
    </section>
  );
}
