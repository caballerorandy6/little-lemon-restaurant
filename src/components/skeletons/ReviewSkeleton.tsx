import { StarIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const ReviewSkeleton = () => {
  return (
    <div className="py-12 flex justify-between items-center animate-pulse">
      {/* Avatar y nombre */}
      <div className="flex items-center">
        <div className="size-12 rounded-full bg-gray-300" />

        <div className="ml-4 space-y-2">
          <div className="h-4 w-24 bg-gray-300 rounded" />

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={clsx("size-5 shrink-0 text-gray-300")}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fecha y comentario */}
      <div className="mt-4 space-y-3 text-base text-gray-600 italic w-1/2">
        <div className="flex justify-end">
          <div className="h-3 w-24 bg-gray-300 rounded" />
        </div>
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default ReviewSkeleton;
