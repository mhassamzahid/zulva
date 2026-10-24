"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/components/cart/cart-provider";
import { Wordmark } from "@/components/layout/wordmark";
import { helpLinks, navigation, site, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-stone/95 backdrop-blur-sm transition-[border-color] duration-300",
        "border-b",
        scrolled ? "border-line" : "border-transparent"
      )}
    >
      <div className="container-page grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-[4.5rem]">
        {/* Left: menu on mobile, primary nav on desktop */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="-ml-2 grid size-11 place-items-center rounded-full hover:bg-ink/5 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" strokeWidth={1.25} />
          </button>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[0.9375rem]">
              {navigation.slice(0, 3).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="link-draw py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Wordmark />

        <div className="flex items-center justify-end gap-1 md:gap-3">
          <Link
            href="/about"
            aria-current={isActive("/about") ? "page" : undefined}
            className="mr-4 hidden py-1 text-[0.9375rem] link-draw lg:block"
          >
            About
          </Link>
          <Link
            href="/search"
            aria-label="Search"
            className="grid size-11 place-items-center rounded-full hover:bg-ink/5"
          >
            <Search className="size-[1.15rem]" strokeWidth={1.25} />
          </Link>
          <BagButton />
        </div>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" aria-describedby={undefined} className="px-6 pt-20 pb-8">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 font-display text-[2rem] leading-tight"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-10 space-y-3 border-t border-line pt-6 text-ink-soft">
              {helpLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setMenuOpen(false)} className="hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={whatsappHref()} className="hover:text-ink">
                  WhatsApp
                </a>
              </li>
            </ul>
          </nav>
          <div className="mt-auto flex gap-6 text-sm text-ink-soft">
            <a href={site.social.instagram} target="_blank" rel="noreferrer" className="link-under">
              Instagram
            </a>
            <a href={site.social.facebook} target="_blank" rel="noreferrer" className="link-under">
              Facebook
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

function BagButton() {
  const { count, ready, open } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      className="relative -mr-2 inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-2 hover:bg-ink/5 md:px-3"
      aria-label={ready && count > 0 ? `Bag, ${count} items` : "Bag"}
    >
      <span className="hidden text-[0.9375rem] md:inline">Bag</span>
      <ShoppingBag className="size-5 md:hidden" strokeWidth={1.25} aria-hidden />
      <span
        className={cn(
          "grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[0.6875rem] tabular-nums transition-colors",
          ready && count > 0 ? "bg-ink text-stone" : "border border-ink/25 text-ink-soft",
          "max-md:absolute max-md:top-1 max-md:right-0 max-md:h-4 max-md:min-w-4 max-md:px-1 max-md:text-[0.625rem]",
          !(ready && count > 0) && "max-md:hidden"
        )}
      >
        {ready ? count : 0}
      </span>
    </button>
  );
}
