import { create } from "zustand";

const useStore = create((set) => ({
  activeSidebar: 0,
  activeContact: 0,
  openChat: false,
  provisionalDataAccount: [],
  setActiveSidebar: (activeSidebar) =>
    set(() => ({ activeSidebar: activeSidebar })),
  setActiveContact: (activeContact) =>
    set(() => ({ activeContact: activeContact })),
  setOpenChat: (openChat) => set(() => ({ openChat: openChat })),
  addProvisionalDataAccount: (newItem) =>
    set(() => ({
      provisionalDataAccount: [...newItem],
    })),
}));

export default useStore;
