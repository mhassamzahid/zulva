import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/page-intro";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getProducts, priceOf } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about Zulva products, prices and delivery.",
  alternates: { canonical: "/faq" },
};

const [oil, shampoo] = getProducts();

// Only questions we can answer from verified facts.
const faqs: { q: string; a: React.ReactNode; plain: string }[] = [
  {
    q: "What does Zulva sell?",
    plain: `Two products: ${oil.title} (${oil.size}) and ${shampoo.title} (${shampoo.size}).`,
    a: (
      <>
        Two products: the <Link href={`/products/${oil.handle}`}>{oil.title}</Link> ({oil.size})
        and the <Link href={`/products/${shampoo.handle}`}>{shampoo.title}</Link> ({shampoo.size}).
      </>
    ),
  },
  {
    q: "How much do they cost?",
    plain: `Each is ${formatPrice(priceOf(oil))}. Delivery is ${formatPrice(site.deliveryFee)} anywhere in Pakistan.`,
    a: (
      <>
        Each is {formatPrice(priceOf(oil))}. Delivery is {formatPrice(site.deliveryFee)} anywhere
        in Pakistan.
      </>
    ),
  },
  {
    q: "Are they for men or women?",
    plain: "Both. Each label says for men and women.",
    a: "Both. Each label says for men and women.",
  },
  {
    q: "What herbs are in them?",
    plain:
      "The shampoo is made with amla, reetha and shikakai. The oil is enriched with 13 essential herbs, including amla, reetha and shikakai.",
    a: "The shampoo is made with amla, reetha and shikakai. The oil is enriched with 13 essential herbs, including amla, reetha and shikakai. The full ingredient list is printed on each bottle.",
  },
  {
    q: "Have the products been tested?",
    plain: "Zulva products are PCSIR tested, by the Pakistan Council of Scientific and Industrial Research.",
    a: "Zulva products are PCSIR tested, by the Pakistan Council of Scientific and Industrial Research.",
  },
  {
    q: "How can I pay?",
    plain: "The payment methods available for your order are shown at checkout.",
    a: "The payment methods available for your order are shown at checkout, before you pay.",
  },
  {
    q: "Can I return a product?",
    plain: "Returns are covered by the Zulva return and refund policy.",
    a: (
      <>
        Returns are covered by our <a href={site.returnPolicyUrl}>return and refund policy</a>.
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.plain },
          })),
        }}
      />
      <PageIntro title="Questions, answered">
        <p>
          Can&rsquo;t find yours? <Link href="/contact" className="link-under">Message us</Link>.
        </p>
      </PageIntro>
      <div className="container-page pb-24">
        <Accordion className="max-w-3xl border-t border-line">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-b border-line">
              <AccordionTrigger className="py-6 font-display text-xl font-normal hover:no-underline md:text-2xl">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-ink-soft">
                <p>{f.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
