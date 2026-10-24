function Block({ className }: { className: string }) {
  return <div className={`animate-pulse bg-stone-2 ${className}`} />;
}

export function GridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-12 md:gap-x-6 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <li key={i}>
          <Block className="aspect-[4/5]" />
          <Block className="mt-4 h-5 w-2/3" />
          <Block className="mt-2 h-4 w-1/3" />
        </li>
      ))}
    </ul>
  );
}

export function ProductSkeleton() {
  return (
    <div className="container-page grid gap-10 pt-8 pb-20 lg:grid-cols-12 lg:gap-16" aria-hidden>
      <Block className="aspect-[4/5] lg:col-span-7" />
      <div className="lg:col-span-5">
        <Block className="h-4 w-24" />
        <Block className="mt-4 h-14 w-3/4" />
        <Block className="mt-6 h-5 w-2/3" />
        <Block className="mt-10 h-8 w-32" />
        <Block className="mt-8 h-14 w-full rounded-full" />
      </div>
    </div>
  );
}
