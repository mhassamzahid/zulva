import { GridSkeleton } from "@/components/layout/skeletons";

export default function Loading() {
  return (
    <div className="container-page pt-10 pb-24 md:pt-16">
      <span className="sr-only" role="status">Loading products</span>
      <div className="h-[clamp(2.75rem,1.6rem+5.2vw,6.25rem)] w-1/2 animate-pulse bg-stone-2" />
      <div className="mt-24">
        <GridSkeleton />
      </div>
    </div>
  );
}
