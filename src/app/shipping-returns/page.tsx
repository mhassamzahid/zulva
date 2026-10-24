import type { Metadata } from "next";
import Link from "next/link";
import { InfoSection, PageIntro } from "@/components/layout/page-intro";
import { formatPrice } from "@/lib/format";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping and returns",
  description: `Zulva delivers anywhere in Pakistan for ${formatPrice(site.deliveryFee)}.`,
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingReturnsPage() {
  return (
    <>
      <PageIntro title="Shipping and returns">
        <p>
          {formatPrice(site.deliveryFee)} delivery to any city in Pakistan.
        </p>
      </PageIntro>
      <div className="container-page pb-24">
        <InfoSection title="Delivery">
          <p>
            Delivery costs a flat {formatPrice(site.deliveryFee)} anywhere in Pakistan.
          </p>
          <p>
            Delivery options, timing and payment methods for your address are shown
            at checkout before you pay. For an estimate for your city,{" "}
            <a href={whatsappHref("Hi Zulva, how long does delivery take to my city?")}>
              ask us
            </a>
            .
          </p>
        </InfoSection>
        <InfoSection title="Returns and refunds">
          <p>
            Returns and refunds are covered by our{" "}
            <a href={site.returnPolicyUrl}>return and refund policy</a>, which sets out
            what can be returned and how.
          </p>
          <p>
            Something wrong with your order? <Link href="/contact">Contact us</Link> with
            your order number and we will help.
          </p>
        </InfoSection>
      </div>
    </>
  );
}
