import CategoriesList from "@/components/public/CategoriesList";
import { getCategories } from "@/libs/utils";
import { Suspense } from "react";
import CategoriesSidebarSkeleton from "@/components/skeletons/CategoriesSidebarSkeleton";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories?.map((category) => ({
    category: category.strCategory,
  }));
}

const Menu = () => {
  return (
    <main id="menu" className="pt-40">
      <Suspense fallback={<CategoriesSidebarSkeleton />}>
        <CategoriesList />
      </Suspense>
    </main>
  );
};

export default Menu;
