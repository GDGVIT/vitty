import { create } from "zustand";

interface AuthStore {
  uuid: string;
  isLoggedIn: boolean;
  profile: string;
  username: string | null;
  name: string;
  email: string;
  token: string;

  login: (uuid: string, profile: string, name: string) => void;
  logout: () => void;
  updateUsername: (username: string) => void;
  updateToken: (token: string) => void;
  initializeFromLocalStorge: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  uuid: "",
  isLoggedIn: false,
  profile: "",
  username: null,
  email: "",
  name: "",
  token: "",
  login: (uuid, profile, name) =>
    set(() => ({
      uuid,
      isLoggedIn: true,
      profile,
      name,
    })),
  logout: () => {
    set(() => ({
      uuid: "",
      isLoggedIn: false,
      profile: "",
      name: "",
      username: null,
    }));
    localStorage.clear();
  },
  updateUsername: (username: string) => {
    set(() => ({
      username,
    }));
  },
  updateToken: (token: string) => {
    set(() => ({
      token,
    }));
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