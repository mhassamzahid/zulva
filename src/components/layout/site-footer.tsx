import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { formatPrice } from "@/lib/format";
import { helpLinks, navigation, site, whatsappHref } from "@/lib/site";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="tone-dark bg-ink text-stone">
      <div className="container-page grid gap-14 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-headline text-balance">
            News from Zulva, when there is some.
          </h2>
          <p className="mt-4 max-w-sm text-stone/70">
            New products and restocks, by email. Nothing else.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
          <FooterColumn title="Shop">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-draw">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <FooterColumn title="Help">
            {helpLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-draw">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={whatsappHref()} className="link-draw">
                WhatsApp
              </a>
            </li>
          </FooterColumn>
          <FooterColumn title="Follow">
            <li>
              <a href={site.social.instagram} target="_blank" rel="noreferrer" className="link-draw">
                Instagram
              </a>
            </li>
            <li>
              <a href={site.social.facebook} target="_blank" rel="noreferrer" className="link-draw">
                Facebook
              </a>
            </li>
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-stone/15">
        <div className="container-page flex flex-col gap-6 py-8 text-sm text-stone/60 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/zulva-emblem.png" alt="" width={340} height={340} className="size-7" />
            <p>
              © {year} Zulva. {formatPrice(site.deliveryFee)} delivery anywhere in Pakistan.
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a href={site.returnPolicyUrl} className="hover:text-stone">Return and refund policy</a>
            </li>
            <li>
              <a href={site.privacyPolicyUrl} className="hover:text-stone">Privacy</a>
            </li>
            <li>
              <a href={site.termsUrl} className="hover:text-stone">Terms</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm text-stone/50">{title}</h3>
      <ul className="mt-4 space-y-3 text-[0.9375rem]">{children}</ul>
    </div>
  );
}
