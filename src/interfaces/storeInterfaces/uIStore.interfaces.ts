export interface UIStore {
  // Sidebar & Panels
  isSidebarOpen: boolean;
  activePanel: "components" | "settings" | "templates" | null;

  // Modals
  isExportModalOpen: boolean;
  isTemplateModalOpen: boolean;
  isSaveModalOpen: boolean;

  // Actions
  toggleSidebar: () => void;
  setActivePanel: (panel: UIStore["activePanel"]) => void;
  openExportModal: () => void;
  closeExportModal: () => void;
  openTemplateModal: () => void;
  closeTemplateModal: () => void;
  openSaveModal: () => void;
  closeSaveModal: () => void;
}
