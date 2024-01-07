import { create } from "zustand";

export interface Course {
  name: string;
  code: string;
  venue: string;
  slot: string;
  type: string;
  start_time: string;
  end_time: string;
}

export interface TimeTable {
  timetable: Course[] | null;
}

interface TimeTableStore {
  timetable: TimeTable | null;
  uploadTimetable: (timetable: TimeTable) => void;
  deleteTimetable: () => void;
}

export const useTimeTableStore = create<TimeTableStore>((set) => ({
  timetable: null,
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
}));