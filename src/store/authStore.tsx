import { create } from "zustand";

export interface Course {
  name: string;
  code: string;
  venue: string;
  slot: string;
  type: string;
  start_time: string | null;
  end_time: string | null;
}

export interface TimeTable {
  timetable: Course[] | null;
}

interface AuthStore {
  uuid: string;
  isLoggedIn: boolean;
  profile: string;
  username: string | null;
  name: string;
  email: string;
  token: string;
  review: boolean;
  timetable: TimeTable | null;
  regNo: string;
  uploadTimetable: (timetable: TimeTable) => void;
  deleteTimetable: () => void;
  setReview: (data: boolean) => void;
  login: (uuid: string, profile: string, name: string, email: string) => void;
  logout: () => void;
  updateUsername: (username: string) => void;
  updateToken: (token: string) => void;
  updateRegNo: (regNo: string) => void;
  initializeFromLocalStorge: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  uuid: "",
  isLoggedIn: false,
  profile: "",
  username: null,
  email: "",
  review: false,
  name: "",
  token: "",
  timetable: null,
  regNo: "",
  uploadTimetable: (data) => {
    set(() => ({
      timetable: data
    }));
  },
  deleteTimetable: () => {
    set(() => ({
      timetable: null,
    }));
  },
  updateRegNo: (regNo) => {
    set(() => ({
      regNo,
    }));
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
      profile: "",
      username: null,
      email: "",
      name: "",
      token: "",
      timetable: null,
      regNo: "",
    }));
    localStorage.clear();
  },
  setReview: (review: boolean) => {
    set(() => ({
      review: review,
    }));
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
    const email = localStorage.getItem("email");
    if (uuid && profile && username && email) {
      set(() => ({
        uuid,
        isLoggedIn: true,
        profile,
        username,
        email,
      }));
    }
  },
}));
