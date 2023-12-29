import { Skeleton } from "./ui/skeleton";
function SkeletonCard() {
  return (
    <>
      <div className="grid grid-cols-4 gap-y-10 gap-3">
        {Array.from({ length: 50 }, (_, i) => i + 1).map((id) => (
          <div key={id} className="col-span-1 md:col-span-2">
            <Skeleton className="h-5 w-24 my-1"></Skeleton>
            <Skeleton className="aspect-square w-full"></Skeleton>
            <Skeleton className="h-4 w-1/2 my-1"></Skeleton>
            <Skeleton className="h-3 w-16 my-1"></Skeleton>
          </div>
        ))}
      </div>
    </>
  );
}

export default SkeletonCard;
