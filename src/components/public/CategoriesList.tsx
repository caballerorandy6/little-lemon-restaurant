import SidebarCategories from "@/components/public/SideBarCategories";
import MealsByCategoryList from "@/components/public/MealsByCategoryList";

export default function CategoriesList() {
  return (
    <section
      id="categories-list"
      className="relative flex flex-col sm:flex-row min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Sidebar */}
      <div className="w-full sm:w-80 sm:min-h-screen">
        <SidebarCategories />
      </div>

      {/* Meals */}
      <main className="w-full">
        <MealsByCategoryList />
      </main>
    </section>
  );
}
