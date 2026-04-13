import { create } from "zustand";

type BirthInfoModalState = {
  isOpen: boolean;
  openBirthInfoModal: () => void;
  closeBirthInfoModal: () => void;
};

export const useBirthInfoModalStore = create<BirthInfoModalState>()((set) => ({
  isOpen: false,
  openBirthInfoModal: () =>
    set({
      isOpen: true,
    }),
  closeBirthInfoModal: () =>
    set({
      isOpen: false,
    }),
}));
