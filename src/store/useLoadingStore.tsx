import {create } from "zustand";

interface LoadingStore {
  isLoading: boolean;
  timetableUploadedThisSession: boolean;
  setLoading: (isLoading: boolean) => void;
  setTimetableUploadedThisSession: (timetableUploadedThisSession: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  timetableUploadedThisSession: false,
  setLoading: (isLoading) => {
    set(() => ({
      isLoading,
    }));
  },
  setTimetableUploadedThisSession: (timetableUploadedThisSession) => {
    set(() => ({
      timetableUploadedThisSession,
    }));
  },
}));