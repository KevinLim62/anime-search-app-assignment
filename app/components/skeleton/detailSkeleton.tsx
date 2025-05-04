import { Skeleton } from "../ui/skeleton";

const DetailSkeleton = () => {
  return (
    <div className="flex flex-col space-y-5">
      <Skeleton className="h-[500px] w-full rounded-xl" />
    </div>
  );
};

export default DetailSkeleton;
