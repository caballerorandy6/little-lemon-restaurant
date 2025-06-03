import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/libs/types";
import { CartItem } from "@/libs/types";
import { CategoryAPI } from "@/libs/types";
import { MealAPI, ReservationAPI } from "@/libs/types";
import {
  getCategories,
  getMealsByCategory,
  getSingleMeal,
  getUserReservations,
  deleteReservationById as deleteReservationByIdAPI,
  updateReservationById as updateReservationByIdAPI,
} from "@/libs/utils";

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
      editingId: null,
      setEditingId: (id: number | null) => set({ editingId: id }),
      editReservationValues: {
        date: "",
        time: "",
        guests: 0,
      } as ReservationAPI | null,
      setEditReservationValues: (values: ReservationAPI | null) =>
        set({ editReservationValues: values }),
      avatarMenuOpen: false,
      setAvatarMenuOpen: (open: boolean) => set({ avatarMenuOpen: open }),
      landingCategoryDialog: false,
      setLandingCategoryDialog: (open: boolean) =>
        set({ landingCategoryDialog: open }),
      categoryModalDialog: false,
      setCategoryModalDialog: (open: boolean) =>
        set({ categoryModalDialog: open }),
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

      fetchCategories: async () => {
        set({ isLoading: true });
        try {
          const data = await getCategories();
          set({
            categories: data.map((cat: CategoryAPI) => ({
              id: cat.id,
              strCategory: cat.strCategory,
              description: cat.description ?? "",
              thumb: cat.thumb ?? "",
            })),
          });
        } catch (error) {
          console.error("Error fetching categories:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      // Fetch items by category from the API
      fetchMealsByCategory: async (category: string) => {
        set({ isLoading: true, items: [] });

        try {
          const response = await getMealsByCategory(category);

          if (!response || response.length === 0) {
            throw new Error("No meals found for this category");
          }

          const data = response.map((meal: MealAPI) => ({
            ...meal,
            price: meal.price ?? 10, // Default price if not provided
          }));
          set({ items: data });
        } catch (error) {
          console.error("Error fetching meals by category:", error);
          set({ items: [] });
        } finally {
          set({ isLoading: false });
        }
      },

      // Fetch a single meal by category and name from the API
      fetchSingleMeal: async (category: string, name: string) => {
        set({ isLoading: true, meal: null });
        try {
          const meal = await getSingleMeal(category, name);
          if (!meal) {
            throw new Error("Meal not found");
          }
          set({ meal });
        } catch (error) {
          console.error("Error fetching single meal:", error);
          set({ meal: null });
        } finally {
          set({ isLoading: false });
        }
      },

      meal: null,

      fetchUserReservations: async () => {
        set({ isLoading: true, userReservations: [] });
        try {
          let reservations = await getUserReservations();

          if (!reservations || reservations.length === 0) {
            reservations = [];
          }
          set({ userReservations: reservations });
        } catch (error) {
          console.error("Error fetching user reservations:", error);
          set({ userReservations: [] });
        } finally {
          set({ isLoading: false });
        }
      },

      deleteReservationById: async (reservationId: number) => {
        set({ isLoading: true });
        try {
          const respnse = await deleteReservationByIdAPI(reservationId);
          if (!respnse) {
            throw new Error("Failed to delete reservation");
          }

          // Update userReservations after deletion
          set((state) => ({
            userReservations: state.userReservations.filter(
              (reservation) => reservation.id !== reservationId
            ),
          }));
        } catch (error) {
          console.error("Error deleting reservation:", error);
          throw error; //
        } finally {
          set({ isLoading: false });
        }
      },

      updateReservation: async (data: ReservationAPI) => {
        set({ isLoading: true });
        try {
          const response = await updateReservationByIdAPI(data);

          if (!response) {
            throw new Error("Failed to update reservation");
          }

          set((state) => ({
            userReservations: state.userReservations.map((reservation) =>
              reservation.id === response.id ? response : reservation
            ),
            editingId: null,
            editReservationValues: null,
          }));
        } catch (error) {
          console.error("Error updating reservation:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      userReservations: [],

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
