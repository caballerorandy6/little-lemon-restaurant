import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SafeUser } from "@/libs/types";
import { CartItem } from "@/libs/types";
import { CategoryAPI } from "@/libs/types";
import { MealAPI, ReservationAPI } from "@/libs/types";
import {
  getUserReservations,
  deleteReservationById as deleteReservationByIdAPI,
  updateReservationById as updateReservationByIdAPI,
} from "@/libs/utils";
import { syncCartWithBackend } from "@/libs/utils";

interface LittleLemonStore {
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  editReservationValues: ReservationAPI | null;
  setEditReservationValues: (values: ReservationAPI | null) => void;
  updateReservation: (data: ReservationAPI) => Promise<void>;
  deleteReservationById: (reservationId: number) => Promise<void>;
  userReservations: ReservationAPI[];
  fetchUserReservations: () => Promise<void>;
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
  mealsByCategory: MealAPI[];
  setMealsByCategory: (meals: MealAPI[]) => void;
  totalItemsCart: number;
  setTotalItemsCart: (total: number) => void;
}

export const useLittleLemonStore = create<LittleLemonStore>()(
  persist(
    (set) => ({
      singleMeal: null,
      setSingleMeal: (meal) => set({ singleMeal: meal }),
      mealsByCategory: [],
      setMealsByCategory: (meals) => set({ mealsByCategory: meals }),
      editingId: null,
      setEditingId: (id) => set({ editingId: id }),
      editReservationValues: {
        date: "",
        time: "",
        guests: 0,
      } as ReservationAPI | null,
      setEditReservationValues: (values) =>
        set({ editReservationValues: values }),
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

      fetchUserReservations: async () => {
        set({ isLoading: true, userReservations: [] });
        try {
          const res = await getUserReservations();
          set({ userReservations: res || [] });
        } catch (e) {
          console.error("Error fetching user reservations:", e);
          set({ userReservations: [] });
        } finally {
          set({ isLoading: false });
        }
      },
      deleteReservationById: async (id) => {
        set({ isLoading: true });
        try {
          const res = await deleteReservationByIdAPI(id);
          if (!res) throw new Error("Failed to delete reservation");
          set((state) => ({
            userReservations: state.userReservations.filter((r) => r.id !== id),
          }));
        } catch (e) {
          console.error("Error deleting reservation:", e);
        } finally {
          set({ isLoading: false });
        }
      },
      updateReservation: async (data) => {
        set({ isLoading: true });
        try {
          const updated = await updateReservationByIdAPI(data);
          if (!updated) throw new Error("Failed to update reservation");
          set((state) => ({
            userReservations: state.userReservations.map((r) =>
              r.id === updated.id ? updated : r
            ),
            editingId: null,
            editReservationValues: null,
          }));
        } catch (e) {
          console.error("Error updating reservation:", e);
        } finally {
          set({ isLoading: false });
        }
      },
      userReservations: [],
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
      totalItemsCart: 0,
      setTotalItemsCart: (total) => set({ totalItemsCart: total }),
    }),
    {
      name: "little-lemon-store",
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
    }
  )
);
