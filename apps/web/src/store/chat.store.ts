import { create } from "zustand";

interface PendingChatState {
  hasPending: boolean;
  setPending: () => void;
  clearPending: () => void;
}

export const usePendingChatStore = create<PendingChatState>()((set) => ({
  hasPending: false,
  setPending: () => set({ hasPending: true }),
  clearPending: () => set({ hasPending: false }),
}));
