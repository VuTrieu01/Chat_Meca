import { create } from "zustand";

const useStore = create((set) => ({
  activeSidebar: 0,
  activeContact: 0,
  openChat: false,
  provisionalDataAccount: [],
  openChatItem: 0,
  setActiveSidebar: (activeSidebar) =>
    set(() => ({ activeSidebar: activeSidebar })),
  setActiveContact: (activeContact) =>
    set(() => ({ activeContact: activeContact })),
  setOpenChat: (openChat) => set(() => ({ openChat: openChat })),
  addProvisionalDataAccount: (newItem) =>
    set(() => ({
      provisionalDataAccount: [...newItem],
    })),
  setOpenChatItem: (openChatItem) =>
    set(() => ({ openChatItem: openChatItem })),
}));

export default useStore;
