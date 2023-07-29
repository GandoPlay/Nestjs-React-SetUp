import { create } from "zustand";

export type UserStoreType = {
  name: string;

  setName: (value: string) => void;
};

export const useUsersStore = create<UserStoreType>((set, get) => ({
 name: 'default',
  setName: (value) => set(() => ({ name: value })),

}));