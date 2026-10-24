import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="text-sm text-ink-soft">Page not found</p>
      <h1 className="mt-4 max-w-3xl font-display text-display text-balance">
        This page isn&rsquo;t here.
      </h1>
      <p className="mt-6 max-w-[44ch] text-lg text-ink-soft">
        The link may be old or mistyped. Both Zulva products are one click away.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/collections/all" className={buttonVariants({ size: "lg" })}>
          Shop all
        </Link>
        <Link href="/" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Go to the homepage
        </Link>
      </div>
    </div>
  );
}
