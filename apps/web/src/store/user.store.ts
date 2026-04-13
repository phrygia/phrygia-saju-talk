import { create } from "zustand";
import type { BirthInfo } from "@/src/app/types/fortune";
import type { AuthUser } from "@/src/app/types/user";

type UserState = {
  user: AuthUser | null;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  birthInfo: BirthInfo | null;
  setBirthInfo: (info: BirthInfo) => void;
  clearBirthInfo: () => void;
};

export const useUserStore = create<UserState>()((set) => ({
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  birthInfo: null,
  setBirthInfo: (info) => set({ birthInfo: info }),
  clearBirthInfo: () => set({ birthInfo: null }),
}));
