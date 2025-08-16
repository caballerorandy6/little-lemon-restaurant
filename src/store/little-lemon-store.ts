import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SafeUser } from "@/libs/types";
import { CartItem } from "@/libs/types";
import { CategoryAPI } from "@/libs/types";
import { MealAPI } from "@/libs/types";

import { syncCartWithBackend } from "@/libs/utils";

interface LittleLemonStore {
  avatarMenuOpen: boolean;
  setAvatarMenuOpen: (open: boolean) => void;
  landingCategoryDialog: boolean;
  setLandingCategoryDialog: (open: boolean) => void;
  categoryModalDialog: boolean;
  setCategoryModalDialog: (open: boolean) => void;
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
  user: SafeUser | null;
  setUser: (user: SafeUser | null) => void;
  items: MealAPI[];
  setItems: (items: MealAPI[]) => void;
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  emptyCart: () => void;
  lastupdated: number;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  categories: CategoryAPI[];
  setCategories: (categories: CategoryAPI[]) => void;
  singleMeal: MealAPI | null;
  setSingleMeal: (meal: MealAPI | null) => void;
}

export const useLittleLemonStore = create<LittleLemonStore>()(
  persist(
    (set) => ({
      singleMeal: null,
      setSingleMeal: (meal) => set({ singleMeal: meal }),
      avatarMenuOpen: false,
      setAvatarMenuOpen: (open) => set({ avatarMenuOpen: open }),
      landingCategoryDialog: false,
      setLandingCategoryDialog: (open) => set({ landingCategoryDialog: open }),
      categoryModalDialog: false,
      setCategoryModalDialog: (open) => set({ categoryModalDialog: open }),
      openCategoryListDialog: false,
      setOpenCategoryListDialog: (open) =>
        set({ openCategoryListDialog: open }),
      openAdminDialog: false,
      setOpenAdminDialog: (open) => set({ openAdminDialog: open }),
      getCartTotal: (cart) =>
        cart.reduce((total, item) => total + item.quantity, 0),
      specificItemQuantity: 0,
      setSpecificItemQuantity: (quantity) =>
        set({ specificItemQuantity: quantity }),
      selectedCategory: null,
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      unauthMobileMenuOpen: false,
      setUnauthMobileMenuOpen: (open) => set({ unauthMobileMenuOpen: open }),
      authMobileMenuOpen: false,
      setAuthMobileMenuOpen: (open) => set({ authMobileMenuOpen: open }),
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      isLoadingAuth: true,
      setIsLoadingAuth: (loading) => set({ isLoadingAuth: loading }),
      activeSection: "Home",
      setActiveSection: (section) => set({ activeSection: section }),
      user: null,
      setUser: (user) => set({ user }),
      items: [],
      setItems: (items) => set({ items }),
      cart: [],
      addToCart: (item: CartItem) => {
        const state = useLittleLemonStore.getState();
        const quantityToAdd = item.quantity || 1;
        const existing = state.cart.find((ci) => ci.item.id === item.item.id);

        let updatedCart;

        if (existing) {
          updatedCart = state.cart.map((ci) =>
            ci.item.id === item.item.id
              ? { ...ci, quantity: ci.quantity + quantityToAdd }
              : ci
          );
        } else {
          updatedCart = [...state.cart, { ...item, quantity: quantityToAdd }];
        }

        // Update the cart in the store
        set({ cart: updatedCart });

        // Sync cart with backend
        syncCartWithBackend();
      },
      removeFromCart: (itemId) => {
        set((state) => {
          const item = state.cart.find((ci) => ci.item.id === itemId);
          if (!item) return state;

          let updatedCart;

          if (item.quantity > 1) {
            updatedCart = state.cart.map((ci) =>
              ci.item.id === itemId ? { ...ci, quantity: ci.quantity - 1 } : ci
            );
          } else {
            updatedCart = state.cart.filter((ci) => ci.item.id !== itemId);
          }

          // Actualiza el estado
          set({ cart: updatedCart });

          // Sincroniza con backend o sessionStorage
          syncCartWithBackend();

          return { cart: updatedCart };
        });
      },
      emptyCart: () => {
        const { isAuthenticated } = useLittleLemonStore.getState();

        // Limpia el estado global
        set({ cart: [] });

        // Elimina también del sessionStorage si no está autenticado
        if (!isAuthenticated) {
          sessionStorage.removeItem("little-lemon-store");
          sessionStorage.removeItem("cart");
        }

        // Sincroniza con el backend si está autenticado
        syncCartWithBackend();
      },
      lastupdated: Date.now(),
      isAuthenticated: false,
      setIsAuthenticated: (auth) => {
        set({ isAuthenticated: auth });
        if (!auth) {
          sessionStorage.removeItem("little-lemon-store");
        }
      },
      categories: [],
      setCategories: (categories) => set({ categories }),

      updateQuantity: (itemId, newQuantity) => {
        set((state) => {
          const updatedCart = state.cart.map((ci) =>
            ci.item.id === itemId ? { ...ci, quantity: newQuantity } : ci
          );
          syncCartWithBackend();
          return { cart: updatedCart };
        });
      },
      removeItems: (itemId) => {
        set((state) => {
          const updatedCart = state.cart.filter((ci) => ci.item.id !== itemId);
          syncCartWithBackend();
          return { cart: updatedCart };
        });
      },
      setCart: (cart: CartItem[]) => {
        set({ cart: Array.isArray(cart) ? cart : [] });
      },
    }),
    {
      name: "little-lemon-store",
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
    }
  )
);
