import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export type campusType = "vellore" | "chennai" | "bhopal" | null;
interface AuthStore {
  uuid: string;
  isLoggedIn: boolean;
  authReady: boolean;
  profile: string;
  username: string | null;
  campus: campusType;
  name: string;
  email: string;
  token: string;
  regNo: string;
  login: (uuid: string, profile: string, name: string, email: string) => void;
  logout: () => void;
  setAuthReady: (ready: boolean) => void;
  updateUsername: (username: string) => void;
  updateToken: (token: string) => void;
  updateCampus: (campus: campusType) => void;
  updateRegNo: (regNo: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      uuid: "",
      isLoggedIn: false,
      authReady: false,
      profile: "",
      username: null,
      campus: null,
      email: "",
      name: "",
      token: "",
      regNo: "",
      updateRegNo: (regNo) => {
        set(() => ({ regNo }));
      },
      login: (uuid, profile, name, email) =>
        set(() => ({
          uuid,
          isLoggedIn: true,
          profile,
          name,
          email,
        })),
      logout: () => {
        set(() => ({
          uuid: "",
          isLoggedIn: false,
          authReady: true,
          profile: "",
          username: null,
          campus: null,
          email: "",
          name: "",
          token: "",
          regNo: "",
        }));
      },
      setAuthReady: (ready: boolean) => set(() => ({ authReady: ready })),
      updateUsername: (username: string) => {
        set(() => ({ username }));
      },
      updateToken: (token: string) => {
        set(() => ({ token }));
      },
      updateCampus: (campus: campusType) => {
        set(() => ({ campus }));
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        uuid: state.uuid,
        profile: state.profile,
        username: state.username,
        campus: state.campus,
        name: state.name,
        email: state.email,
        token: state.token,
        regNo: state.regNo,
        isLoggedIn: state.isLoggedIn,
      }),
      version: 1,
    }
  )
);
