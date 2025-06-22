import SidebarCategories from "@/components/public/SideBarCategories";
import MealsByCategoryList from "@/components/public/MealsByCategoryList";

export default function CategoriesList() {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-start min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-full sm:w-72 border-b sm:border-b-0 sm:border-r border-gray-200">
        <SidebarCategories />
      </div>

      {/* Meals */}
      <main className="w-full flex-1">
        <MealsByCategoryList />
      </main>
    </div>
  );
}
