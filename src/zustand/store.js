import { create } from "zustand";

const useStore = create((set) => ({
  activeSidebar: 0,
  activeContact: 0,
  setActiveSidebar: (activeSidebar) =>
    set(() => ({ activeSidebar: activeSidebar })),
  setActiveContact: (activeContact) =>
    set(() => ({ activeContact: activeContact })),
}));

export default useStore;
