import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Zulva on WhatsApp, Instagram or Facebook.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const whatsappLive = Boolean(site.whatsappNumber);
  const channels = [
    {
      name: "WhatsApp",
      detail: whatsappLive
        ? "The quickest way to ask about an order or a product."
        : "WhatsApp support is being set up. Until then, message us on Instagram or Facebook.",
      href: whatsappLive ? whatsappHref("Hi Zulva, I have a question.") : null,
      cta: "Start a chat",
    },
    {
      name: "Instagram",
      detail: "@zulva.pk. Send us a direct message.",
      href: site.social.instagram,
      cta: "Open Instagram",
    },
    {
      name: "Facebook",
      detail: "facebook.com/zulva.pk. Send us a message on Messenger.",
      href: site.social.facebook,
      cta: "Open Facebook",
    },
  ];

  return (
    <>
      <PageIntro title="Talk to Zulva">
        <p>Questions about a product or an order? Message us on whichever app you use.</p>
      </PageIntro>
      <div className="container-page pb-24">
        <ul className="border-t border-line">
          {channels.map((c) => (
            <li
              key={c.name}
              className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:items-center md:py-10"
            >
              <h2 className="font-display text-title md:col-span-4">{c.name}</h2>
              <p className="max-w-[48ch] text-ink-soft md:col-span-5">{c.detail}</p>
              <div className="md:col-span-3 md:text-right">
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noreferrer" className="text-[0.9375rem] link-under">
                    {c.cta}
                  </a>
                ) : (
                  <span className="text-sm text-ink-soft">Coming soon</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
