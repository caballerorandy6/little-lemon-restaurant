import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DashboardStore {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      activeTab: "Profile Info",
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: "dashboard-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
