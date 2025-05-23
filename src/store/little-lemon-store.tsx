import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/libs/types";
import { CartItem } from "@/libs/types";
import { CategoryAPI } from "@/libs/types";
import { MealAPI } from "@/libs/types";

interface LittleLemonStore {
  openCategoryListDialog: boolean;
  setOpenCategoryListDialog: (open: boolean) => void;
  openAdminDialog: boolean;
  setOpenAdminDialog: (open: boolean) => void;
  getCartTotal: (cart: CartItem[]) => number;
  removeItems: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  specificItemQuantity: number;
  setSpecificItemQuantity: (quantity: number) => void;
  selectedCategory: CategoryAPI | null;
  setSelectedCategory: (category: CategoryAPI | null) => void;
  meal: MealAPI | null;
  unauthMobileMenuOpen: boolean;
  setUnauthMobileMenuOpen: (open: boolean) => void;
  authMobileMenuOpen: boolean;
  setAuthMobileMenuOpen: (open: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isLoadingAuth: boolean;
  setIsLoadingAuth: (loading: boolean) => void;

  activeSection: string;
  setActiveSection: (section: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  items: MealAPI[];
  setItems: (items: MealAPI[]) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  emptyCart: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  fetchMealsByCategory: (categoryName: string) => Promise<void>;
  categories: CategoryAPI[];
  setCategories: (categories: CategoryAPI[]) => void;
  fetchCategories: () => Promise<void>;
  fetchSingleMeal: (category: string, name: string) => Promise<void>;
}

export const useLittleLemonStore = create<LittleLemonStore>()(
  persist(
    (set) => ({
      openCategoryListDialog: false,
      setOpenCategoryListDialog: (open: boolean) =>
        set({ openCategoryListDialog: open }),
      openAdminDialog: false,
      setOpenAdminDialog: (open: boolean) => set({ openAdminDialog: open }),
      getCartTotal: (cart: CartItem[]) => {
        return cart.reduce((total, item) => {
          return total + item.quantity;
        }, 0);
      },
      specificItemQuantity: 0,
      setSpecificItemQuantity: (quantity: number) =>
        set({ specificItemQuantity: quantity }),
      selectedCategory: null,
      setSelectedCategory: (category: CategoryAPI | null) =>
        set({ selectedCategory: category }),
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
      activeSection: "Home",
      setActiveSection: (section: string) => set({ activeSection: section }),
      user: null,
      setUser: (user: User | null) => set({ user }),
      items: [],
      setItems: (items: MealAPI[]) => set({ items }),
      cart: [],
      addToCart: (item: CartItem) => {
        set((cartState) => {
          const existingItem = cartState.cart.find(
            (ci) => ci.item.id === item.item.id
          );

          const quantityToAdd = item.quantity || 1; // 👈

          if (existingItem) {
            return {
              cart: cartState.cart.map((ci) =>
                ci.item.id === item.item.id
                  ? { ...ci, quantity: ci.quantity + quantityToAdd }
                  : ci
              ),
            };
          } else {
            return {
              cart: [...cartState.cart, { ...item, quantity: quantityToAdd }],
            };
          }
        });
      },

      removeFromCart: (itemId: number) => {
        set((cartState) => {
          const existingItem = cartState.cart.find(
            (ci) => ci.item.id === itemId
          );

          if (!existingItem) return cartState; // No existe el item, no hacer nada

          if (existingItem.quantity > 1) {
            // Si la cantidad es mayor a 1, restamos 1
            return {
              cart: cartState.cart.map((ci) =>
                ci.item.id === itemId
                  ? { ...ci, quantity: ci.quantity - 1 }
                  : ci
              ),
            };
          } else {
            // Si la cantidad es 1, eliminamos el item del carrito
            return {
              cart: cartState.cart.filter((ci) => ci.item.id !== itemId),
            };
          }
        });
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
      setCategories: (categories: CategoryAPI[]) => set({ categories }),

      // Fetch categories from the API
      fetchCategories: async () => {
        set({ isLoading: true });
        try {
          const response = await fetch("/api/categories");
          if (!response.ok) {
            throw new Error("Failed to fetch categories");
          }

          const data = await response.json();

          set({ categories: data as CategoryAPI[] });
        } catch (error) {
          console.error("Error fetching categories:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      // Fetch items by category from the API
      fetchMealsByCategory: async (category: string) => {
        set({ isLoading: true });

        try {
          const response = await fetch(
            `/api/meals-by-category/${encodeURIComponent(category)}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch meals by category");
          }
          const data = await response.json();

          const meals = data.map((meal: MealAPI) => ({
            ...meal,
            price: meal.price ?? 10,
          }));

          set({ items: meals });
        } catch (error) {
          console.error("Error fetching meals by category:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      // Fetch a single meal by category and name from the API
      fetchSingleMeal: async (category: string, name: string) => {
        try {
          set({ isLoading: true });

          console.log("fetching", `/api/meals-by-category/${category}/${name}`);

          const response = await fetch(
            `/api/meals-by-category/${category}/${encodeURIComponent(name)}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch from API");
          }

          const meal = await response.json();
          console.log("Fetched meal:", meal);

          const transformedMeal: MealAPI = {
            ...meal,
            price: meal.price ?? 10,
          };

          set({ meal: transformedMeal });
        } catch (error) {
          console.error("Error fetching single meal:", error);
        } finally {
          set({ isLoading: false });
        }
      },
      meal: null,
      updateQuantity: (itemId: number, newQuantity: number) => {
        set((state) => {
          const updatedCart = state.cart.map((ci) =>
            ci.item.id === itemId ? { ...ci, quantity: newQuantity } : ci
          );
          return { cart: updatedCart };
        });
      },
      removeItems: (itemId: number) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.item.id !== itemId),
        }));
      },
    }),
    {
      name: "little-lemon-store",
    }
  )
);
