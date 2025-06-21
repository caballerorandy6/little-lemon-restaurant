"use client";

export default function CategoriesSidebarSkeleton() {
  return (
    <div
      className="hidden sm:fixed sm:inset-y-0 sm:z-50 sm:flex sm:w-72 sm:flex-col border-r border-gray-200 bg-white animate-pulse"
      style={{ top: "64px" }}
    >
      <div className="flex flex-col gap-y-5 overflow-y-auto px-6 py-8">
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-3">
            {Array.from({ length: 13 }).map((_, index) => (
              <li key={index}>
                <div className="h-10 w-full rounded-xl bg-gray-200" />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
