import { cn } from "@/lib/utils";

export function PageIntro({
  title,
  children,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("container-page pt-12 pb-12 md:pt-20 md:pb-16", className)}>
      <h1 className="max-w-4xl font-display text-display text-balance">{title}</h1>
      {children && (
        <div className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-soft">{children}</div>
      )}
    </header>
  );
}

/** Two-column prose block used across the information pages. */
export function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:py-14">
      <h2 className="font-display text-title md:col-span-4">{title}</h2>
      <div className="max-w-[60ch] space-y-4 leading-relaxed text-ink md:col-span-7 md:col-start-6 [&_a]:link-under">
        {children}
      </div>
    </section>
  );
}
