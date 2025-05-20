import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, MenuItem as PrismaMenuItem, Review } from "@prisma/client";
import { CartItem } from "@/libs/types";
import { Category } from "@/libs/types";

interface MealDBItem {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strCategory: string;
  strMealThumb: string;
}

export interface MenuItem extends Omit<PrismaMenuItem, "reviews"> {
  reviews: Review[];
  image: string;
}

interface LittleLemonStore {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  unauthMobileMenuOpen: boolean;
  setUnauthMobileMenuOpen: (open: boolean) => void;
  authMobileMenuOpen: boolean;
  setAuthMobileMenuOpen: (open: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isLoadingAuth: boolean;
  setIsLoadingAuth: (loading: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  items: MenuItem[];
  setItems: (items: MenuItem[]) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  emptyCart: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  fetchItemByCategory: () => Promise<void>;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  fetchCategories: () => Promise<void>;
}

export const useLittleLemonStore = create<LittleLemonStore>()(
  persist(
    (set, get) => ({
      activeCategory: "All",
      setActiveCategory: (category: string) => {
        set({ activeCategory: category });
      },
      setCategories: (categories: Category[]) => {
        set({ categories });
      },
      unauthMobileMenuOpen: false,
      setUnauthMobileMenuOpen: (open: boolean) =>
        set({ unauthMobileMenuOpen: open }),
      authMobileMenuOpen: false,
      setAuthMobileMenuOpen: (open: boolean) =>
        set({ authMobileMenuOpen: open }),
      isLoading: false,
      setIsLoading: (loading: boolean) => set({ isLoading: loading }),
      isLoadingAuth: true,
      setIsLoadingAuth: (loading: boolean) => set({ isLoadingAuth: loading }),
      mobileMenuOpen: false,
      setMobileMenuOpen: (open: boolean) => set({ mobileMenuOpen: open }),
      activeSection: "Home",
      setActiveSection: (section: string) => set({ activeSection: section }),
      user: null,
      setUser: (user: User | null) => set({ user }),
      items: [],
      setItems: (items: MenuItem[]) => set({ items }),
      cart: [],
      addToCart: (item: CartItem) => {
        set((cartState) => {
          const existingItem = cartState.cart.find(
            (ci) => ci.item.id === item.item.id
          );
          if (existingItem) {
            // If item exists, increase quantity
            return {
              cart: cartState.cart.map((ci) =>
                ci.item.id === item.item.id
                  ? { ...ci, quantity: ci.quantity + item.quantity }
                  : ci
              ),
            };
          } else {
            // If item does not exist, add to cart
            return {
              cart: [...cartState.cart, item],
            };
          }
        });
      },
      removeFromCart: (itemId: number) => {
        set((cartState) => ({
          cart: cartState.cart.filter((ci) => ci.item.id! == itemId),
        }));
      },
      emptyCart: () => {
        set(() => ({
          cart: [],
        }));
      },
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      categories: [],
      fetchItemByCategory: async () => {
        const categories = get().categories;

        const cats = categories.map((cat) => ({
          name: cat.strCategory,
          image: cat.strCategoryThumb,
          description: cat.strCategoryDescription,
          id: cat.idCategory,
        }));

        set({ isLoading: true });

        try {
          // 1) Traer lista de meals por categoría
          const allMealsByCategory: MealDBItem[] = (
            await Promise.all(
              cats.map(async (category) => {
                const res = await fetch(
                  `/api/meals/by-category/${encodeURIComponent(category.name)}`
                );
                if (!res.ok)
                  throw new Error(`Error fetching category ${category.name}`);
                const data = (await res.json()) as { meals: MealDBItem[] };
                return data.meals;
              })
            )
          ).flat();

          // 2) Traer detalle completo de cada meal
          const allMealsWithDetails: MealDBItem[] = await Promise.all(
            allMealsByCategory.map(async (meal) => {
              const res = await fetch(`/api/meals/${meal?.idMeal}`);
              if (!res.ok)
                throw new Error(`Error fetching details for ${meal.idMeal}`);
              const data = (await res.json()) as { meals: MealDBItem[] };
              return data.meals[0];
            })
          );

          // 3) Mapear al formato de MenuItem
          const menuItems = allMealsWithDetails.map((meal) => ({
            id: parseInt(meal.idMeal, 10),
            name: meal.strMeal,
            category: meal.strCategory,
            image: meal.strMealThumb,
            description: meal.strInstructions,
            price: parseFloat((Math.random() * 100).toFixed(2)),
            reviews: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          }));

          set({ items: menuItems });
        } catch (error) {
          console.error("Error fetching items:", error);
          set({ items: [] });
        } finally {
          set({ isLoading: false });
        }
      },
      fetchCategories: async () => {
        set({ isLoading: true });
        try {
          const response = await fetch("/api/categories");
          if (!response.ok) {
            throw new Error("Failed to fetch categories");
          }

          const data = await response.json();
          if (!Array.isArray(data)) {
            throw new Error("Invalid data format");
          }

          set({ categories: data as Category[] });
        } catch (error) {
          console.error("Error fetching categories:", error);
          set({ categories: [] });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "little-lemon-store",
    }
  )
);
