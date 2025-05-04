import { Skeleton } from "../ui/skeleton";

const ListingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded shadow">
          <Skeleton className="h-96" />
        </div>
      ))}
    </div>
  );
};

export default ListingSkeleton;
