import CategoriesList from "@/components/public/CategoriesList";
import { getCategories } from "@/libs/utils";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories?.map((category) => ({
    category: category.strCategory,
  }));
}

const Menu = async () => {
  return (
    <main id="menu" className="pt-40">
      <CategoriesList />
    </main>
  );
};

export default Menu;
