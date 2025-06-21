export default function CategoriesLisSkeleton() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-6" />
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden shadow-lg animate-pulse"
            >
              <div className="w-full h-64 bg-gray-200" />
              <div className="mt-4 h-4 w-3/4 bg-gray-200 mx-auto rounded" />
              <div className="mt-2 h-4 w-1/2 bg-gray-200 mx-auto rounded mb-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
