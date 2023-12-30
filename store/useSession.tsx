import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type Session = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useSession = create((set): Session => ({
  user: null,
  setUser: (user) => set({ user: user }),
}))
