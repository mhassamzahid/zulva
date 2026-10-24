import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  emblem = true,
}: {
  className?: string;
  emblem?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Zulva home"
      className={cn("inline-flex items-center gap-2", className)}
    >
      {emblem && (
        <Image
          src="/images/zulva-emblem.png"
          alt=""
          width={340}
          height={340}
          className="size-7 md:size-9"
          loading="eager"
        />
      )}
      <span className="font-display text-[1.4rem] leading-none tracking-[0.16em] md:text-[1.85rem]">
        ZULVA
      </span>
    </Link>
  );
}
