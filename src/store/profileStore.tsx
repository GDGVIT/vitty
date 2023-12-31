import { create } from "zustand";

interface showProfileStore {
    showProfile: boolean;
    toggleProfile: () => void;
    setProfile: (showProfile: boolean) => void;
    }

export const useShowProfileStore = create<showProfileStore>((set) => ({
    showProfile: false,
    toggleProfile: () => {
        set((state) => ({
            showProfile: !state.showProfile,
        }));
    },
    setProfile: (showProfile) => {
        set(() => ({
            showProfile,
        }));
    },
}));
