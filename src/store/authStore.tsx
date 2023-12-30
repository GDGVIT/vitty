import { create } from "zustand";

interface AuthStore {
  uuid: string;
  isLoggedIn: boolean;
  profile: string;
  username: string;
  email: string;

  login: (uuid: string, profile: string, username: string) => void;
  logout: () => void;
  initializeFromLocalStorge: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  uuid: "",
  isLoggedIn: false,
  profile: "",
  username: "",
  email: "",
  login: (uuid, profile, username) =>
    set(() => ({
      uuid,
      isLoggedIn: true,
      profile,
      username,
    })),
  logout: () => {
    set(() => ({
      uuid: "",
      isLoggedIn: false,
      profile: "",
      username: "",
    }));
    localStorage.clear();
  },
  initializeFromLocalStorge: () => {
    const uuid = localStorage.getItem("uuid");
    const profile = localStorage.getItem("profile");
    const username = localStorage.getItem("username");
    if (uuid && profile && username) {
      set(() => ({
        uuid,
        isLoggedIn: true,
        profile,
        username,
      }));
    }
  },
}));
