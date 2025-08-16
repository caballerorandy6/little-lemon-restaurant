import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CategoryAPI, MealAPI } from "@/libs/types";

interface CategoryStore {
  categories: CategoryAPI[];
  selectedCategory: CategoryAPI | null;
  setCategories: (categories: CategoryAPI[]) => void;
  setSelectedCategory: (category: CategoryAPI) => void;
  getCategoryById: (id: string) => CategoryAPI | undefined;
  openCategoryListDialog: boolean;
  setOpenCategoryListDialog: (open: boolean) => void;
  initializeSelectedCategory: () => void;
  mealsByCategory: MealAPI[];
  setMealsByCategory: (meals: MealAPI[]) => void;
}

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set, get) => ({
      categories: [],
      selectedCategory: null,

      setCategories: (categories) => set({ categories }),

      setSelectedCategory: (category) => set({ selectedCategory: category }),

      getCategoryById: (id) => {
        return get().categories.find((cat) => cat.id.toString() === id);
      },

      openCategoryListDialog: false,

      setOpenCategoryListDialog: (open) =>
        set({ openCategoryListDialog: open }),

      initializeSelectedCategory: () => {
        const state = get();
        if (!state.selectedCategory && state.categories.length > 0) {
          set({ selectedCategory: state.categories[0] });
        }
      },

      mealsByCategory: [],

      setMealsByCategory: (meals) => set({ mealsByCategory: meals }),
    }),
    {
      name: "category-store",

      partialize: (state) => ({ categories: state.categories }),
    }
  )
);
