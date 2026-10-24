import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-stone">
      <div className="container-page flex h-9 items-center justify-center text-[0.8125rem] md:justify-between">
        <p className="hidden md:block text-stone/70">{site.certification} products</p>
        <p>
          {formatPrice(site.deliveryFee)} delivery anywhere in Pakistan
        </p>
        <Link
          href="/shipping-returns"
          className="hidden md:block text-stone/70 link-under hover:text-stone"
        >
          Shipping and returns
        </Link>
      </div>
    </div>
  );
}
