import { ProductSkeleton } from "@/components/layout/skeletons";

export default function Loading() {
  return (
    <>
      <span className="sr-only" role="status">Loading product</span>
      <ProductSkeleton />
    </>
  );
}
