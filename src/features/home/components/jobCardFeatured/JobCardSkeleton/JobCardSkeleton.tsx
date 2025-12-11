import { Skeleton } from "../../../../../components/ui/skeleton";

export function JobCardSkeleton() {
  return (
    <>
      {/* LOCAL SKELETON SHIMMER — FULLY GRAY */}
      <style>
  {`
    @keyframes localSkeletonShimmer {
      100% {
        transform: translateX(100%);
      }
    }

    .local-skeleton {
      position: relative;
      overflow: hidden;
      background: rgba(180,180,180,0.35) !important; /* DARKER GRAY */
    }

    .local-skeleton::after {
      content: "";
      position: absolute;
      inset: 0;
      transform: translateX(-100%);
      animation: localSkeletonShimmer 2s infinite;
      background: linear-gradient(
        90deg,
        rgba(180,180,180,0),
        rgba(255,255,255,0.45),
        rgba(180,180,180,0)
      ); /* SLIGHTLY DARKER SHIMMER */
    }
  `}
</style>


      <div className="w-full max-w-2xl rounded-2xl border border-border bg-white shadow-sm p-2 space-y-6">
        
        {/* HEADER */}
        <div className="flex gap-4 items-center">
          <Skeleton className="local-skeleton h-16 w-16 rounded-xl" />

          <div className="flex-1 space-y-2">
            <Skeleton className="local-skeleton h-4 w-3/4" />
            <Skeleton className="local-skeleton h-3 w-1/2" />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-3">
          <Skeleton className="local-skeleton h-4 w-full" />
          <Skeleton className="local-skeleton h-4 w-5/6" />
          <Skeleton className="local-skeleton h-4 w-3/5" />
        </div>

        {/* TAGS */}
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="local-skeleton h-7 w-24 rounded-full" />
          <Skeleton className="local-skeleton h-7 w-20 rounded-full" />
          <Skeleton className="local-skeleton h-7 w-28 rounded-full" />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3">
          <Skeleton className="local-skeleton h-10 w-full rounded-lg" />
          <Skeleton className="local-skeleton h-10 w-full rounded-lg" />
        </div>
      </div>
    </>
  );
}
