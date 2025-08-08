import { create } from "zustand";

export interface Course {
  name: string;
  code: string;
  venue: string;
  slot: string;
  type: "Lab" | "Theory";
  start_time: string | null;
  end_time: string | null;
}

export interface TimeTable {
  timetable: Course[] | null;
}

interface TimeTableStore {
  // canonical timetable as known by backend
  timetable: TimeTable | null;
  // draft being edited in the review flow
  draft: TimeTable | null;
  // review flow UI flag
  review: boolean;

  setTimetable: (timetable: TimeTable | null) => void;
  clearTimetable: () => void;

  setDraft: (timetable: TimeTable | null) => void;
  clearDraft: () => void;
  startEditing: () => void;
  addCourseToDraft: (course: Course) => void;
  removeSlotFromDraft: (slot: string) => void;

  setReview: (review: boolean) => void;
}

export const useTimeTableStore = create<TimeTableStore>((set, get) => ({
  timetable: null,
  draft: null,
  review: false,

  setTimetable: (data) => {
    set(() => ({ timetable: data }));
  },
  clearTimetable: () => {
    set(() => ({ timetable: { timetable: null } }));
  },

  setDraft: (data) => {
    set(() => ({ draft: data }));
  },
  clearDraft: () => {
    set(() => ({ draft: null }));
  },
  startEditing: () => {
    const current = get().timetable;
    if (current) {
      set(() => ({ draft: { timetable: current.timetable ? [...current.timetable] : null } }));
    } else {
      set(() => ({ draft: { timetable: null } }));
    }
  },
  addCourseToDraft: (course: Course) => {
    set((state) => ({
      draft: {
        timetable: [...(state.draft?.timetable || []), course],
      },
    }));
  },
  removeSlotFromDraft: (slot: string) => {
    set((state) => ({
      draft: {
        timetable:
          state.draft?.timetable?.filter((course) => course.slot !== slot) || null,
      },
    }));
  },

  setReview: (review) => set(() => ({ review })),
}));
