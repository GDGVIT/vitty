import {create } from "zustand";

interface LoadingStore {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setLoading: (isLoading) => {
    set(() => ({
      isLoading,
    }));
  },
}));