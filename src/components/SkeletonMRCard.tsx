import { Skeleton } from "./ui/skeleton";

function SkeletonMRCard() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Skeleton className="h-5 w-24 my-1"></Skeleton>
        <Skeleton className="h-[22rem] w-60"></Skeleton>
        <Skeleton className="h-4 w-1/2 my-1"></Skeleton>
        <Skeleton className="h-3 w-16 my-1"></Skeleton>
      </div>
    </>
  );
}

export default SkeletonMRCard;
