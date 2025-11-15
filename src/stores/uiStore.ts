import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { UIStore } from "@/interfaces/storeInterfaces/uIStore.interfaces";

export const useUIStore = create<UIStore>()(
  devtools(
    (set) => ({
      // Sidebar & Panels
      isSidebarOpen: true,
      activePanel: null,

      // Modals
      isExportModalOpen: false,
      isTemplateModalOpen: false,
      isSaveModalOpen: false,

      // Actions
      toggleSidebar: () => {
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
      },

      setActivePanel: (panel: UIStore["activePanel"]) => {
        set({ activePanel: panel });
      },

      openExportModal: () => {
        set({ isExportModalOpen: true });
      },

      closeExportModal: () => {
        set({ isExportModalOpen: false });
      },

      openTemplateModal: () => {
        set({ isTemplateModalOpen: true });
      },

      closeTemplateModal: () => {
        set({ isTemplateModalOpen: false });
      },

      openSaveModal: () => {
        set({ isSaveModalOpen: true });
      },

      closeSaveModal: () => {
        set({ isSaveModalOpen: false });
      },
    }),
    { name: "UIStore" }
  )
);
