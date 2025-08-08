import type { TimeTable, Course } from "../store/TimeTableStore";
import type { campusType } from "../store/authStore";

// Simple memoization cache keyed by timetable object reference and campus/day
const NULL_TIMETABLE_KEY: Record<string, never> = {};
const cache = new WeakMap<object, Map<string, Course[]>>();

export default function ParseAndReturn(
  timeTable: TimeTable | null,
  day: string,
  campus: NonNullable<campusType>
): Course[] {

  interface Timings {
    StartTime: string;
    EndTime: string;
  }

  interface CampusConfig {
  timeTableSlots: {
    [day: string]: {
      Theory: string[];
      Lab: string[];
    };
  };
  theoryTimings: Timings[];
  labTimings: Timings[];
}

const CAMPUS_CONFIGS: Record<NonNullable<campusType> , CampusConfig> = {
  vellore: {
    timeTableSlots: {
      Monday: {
        Theory: ["A1", "F1", "D1", "TB1", "TG1", "A2", "F2", "D2", "TB2", "TG2", "V3"],
        Lab: ["L1", "L2", "L3", "L4", "L5", "L6", "L31", "L32", "L33", "L34", "L35", "L36"],
      },
      Tuesday: {
        Theory: ["B1", "G1", "E1", "TC1", "TAA1", "B2", "G2", "E2", "TC2", "TAA2", "V4"],
        Lab: ["L7", "L8", "L9", "L10", "L11", "L12", "L37", "L38", "L39", "L40", "L41", "L42"],
      },
      Wednesday: {
        Theory: ["C1", "A1", "F1", "V1", "V2", "C2", "A2", "F2", "TD2", "TBB2", "V5"],
        Lab: ["L13", "L14", "L15", "L16", "L17", "L18", "L43", "L44", "L45", "L46", "L47", "L48"],
      },
      Thursday: {
        Theory: ["D1", "B1", "G1", "TE1", "TCC1", "D2", "B2", "G2", "TE2", "TCC2", "V6"],
        Lab: ["L19", "L20", "L21", "L22", "L23", "L24", "L49", "L50", "L51", "L52", "L53", "L54"],
      },
      Friday: {
        Theory: ["E1", "C1", "TA1", "TF1", "TD1", "E2", "C2", "TA2", "TF2", "TDD2", "V7"],
        Lab: ["L25", "L26", "L27", "L28", "L29", "L30", "L55", "L56", "L57", "L58", "L59", "L60"],
      },
      Saturday: {
        Theory: ["V8", "X11", "X12", "Y11", "Y12", "X21", "Z21", "Y21", "W21", "W22", "V9"],
        Lab: ["L71", "L72", "L73", "L74", "L75", "L76", "L77", "L78", "L79", "L80", "L81", "L82"],
      },
      Sunday: {
        Theory: ["V10", "Y11", "Y12", "X11", "X12", "Y21", "Z21", "X21", "W21", "W22", "V11"],
        Lab: ["L83", "L84", "L85", "L86", "L87", "L88", "L89", "L90", "L91", "L92", "L93", "L94"],
      },
    },
    theoryTimings: [
      { StartTime: "08:00 AM", EndTime: "08:50 AM" },
      { StartTime: "09:00 AM", EndTime: "09:50 AM" },
      { StartTime: "10:00 AM", EndTime: "10:50 AM" },
      { StartTime: "11:00 AM", EndTime: "11:50 AM" },
      { StartTime: "12:00 PM", EndTime: "12:50 PM" },
      { StartTime: "02:00 PM", EndTime: "02:50 PM" },
      { StartTime: "03:00 PM", EndTime: "03:50 PM" },
      { StartTime: "04:00 PM", EndTime: "04:50 PM" },
      { StartTime: "05:00 PM", EndTime: "05:50 PM" },
      { StartTime: "06:00 PM", EndTime: "06:50 PM" },
      { StartTime: "07:00 PM", EndTime: "07:50 PM" },
    ],
    labTimings: [
      { StartTime: "08:00 AM", EndTime: "08:50 AM" },
      { StartTime: "08:51 AM", EndTime: "09:40 AM" },
      { StartTime: "09:51 AM", EndTime: "10:40 AM" },
      { StartTime: "10:41 AM", EndTime: "11:30 AM" },
      { StartTime: "11:40 AM", EndTime: "12:30 PM" },
      { StartTime: "12:31 PM", EndTime: "01:20 PM" },
      { StartTime: "02:00 PM", EndTime: "02:50 PM" },
      { StartTime: "02:51 PM", EndTime: "03:40 PM" },
      { StartTime: "03:51 PM", EndTime: "04:40 PM" },
      { StartTime: "04:41 PM", EndTime: "05:30 PM" },
      { StartTime: "05:40 PM", EndTime: "06:30 PM" },
      { StartTime: "06:31 PM", EndTime: "07:20 PM" },
    ],
  },
  
  chennai: {
    timeTableSlots: {
      Monday: {
        Theory: ["A1", "F1", "D1", "TB1", "TG1", "S11", "A2", "F2", "D2", "TB2", "TG2", "S3"],
        Lab: ["L1", "L2", "L3", "L4", "L5", "L6", "L31", "L32", "L33", "L34", "L35", "L36"],
      },
      Tuesday: {
        Theory: ["B1", "G1", "E1", "TC1", "TAA1", "-", "B2", "G2", "E2", "TC2", "TAA2", "S1"],
        Lab: ["L7", "L8", "L9", "L10", "L11", "L12", "L37", "L38", "L39", "L40", "L41", "L42"],
      },
      Wednesday: {
        Theory: ["C1", "A1", "F1", "TD1", "TBB1", "-", "C2", "A2", "F2", "TD2", "TBB2", "S4"],
        Lab: ["L13", "L14", "L15", "L16", "L17", "L18", "L43", "L44", "L45", "L46", "L47", "L48"],
      },
      Thursday: {
        Theory: ["D1", "B1", "G1", "TE1", "TCC1", "-", "D2", "B2", "G2", "TE2", "TCC2", "S2"],
        Lab: ["L19", "L20", "L21", "L22", "L23", "L24", "L49", "L50", "L51", "L52", "L53", "L54"],
      },
      Friday: {
        Theory: ["E1", "C1", "TA1", "TF1", "TDD1", "S15", "E2", "C2", "TA2", "TF2", "TDD2", "-"],
        Lab: ["L25", "L26", "L27", "L28", "L29", "L30", "L55", "L56", "L57", "L58", "L59", "L60"],
      },
      Saturday: {
        Theory: ["X11", "X12", "Y11", "Y12", "S8", "S8", "X21", "Z21", "Y21", "W21", "W22", "Z22"],
        Lab: ["L71", "L72", "L73", "L74", "L75", "L76", "L77", "L78", "L79", "L80", "L81", "L82"],
      },
      Sunday: {
        Theory: ["Y11", "Y12", "X11", "X12", "S10", "S10", "Y21", "Z21", "X21", "W21", "W22", "Z22"],
        Lab: ["L83", "L84", "L85", "L86", "L87", "L88", "L89", "L90", "L91", "L92", "L93", "L94"],
      },
    },
    theoryTimings: [
      { StartTime: "08:00 AM", EndTime: "08:50 AM" },
      { StartTime: "08:55 AM", EndTime: "09:45 AM" },
      { StartTime: "09:50 AM", EndTime: "10:40 AM" },
      { StartTime: "10:45 AM", EndTime: "11:35 AM" },
      { StartTime: "11:40 AM", EndTime: "12:30 PM" },
      { StartTime: "12:35 PM", EndTime: "01:25 PM" },
      { StartTime: "02:00 PM", EndTime: "02:50 PM" },
      { StartTime: "02:55 PM", EndTime: "03:45 PM" },
      { StartTime: "03:50 PM", EndTime: "04:40 PM" },
      { StartTime: "04:45 PM", EndTime: "05:35 PM" },
      { StartTime: "05:40 PM", EndTime: "06:30 PM" },
      { StartTime: "06:35 PM", EndTime: "07:25 PM" },
    ],
    labTimings: [
      { StartTime: "08:00 AM", EndTime: "08:50 AM" },
      { StartTime: "08:50 AM", EndTime: "09:40 AM" },
      { StartTime: "09:50 AM", EndTime: "10:40 AM" },
      { StartTime: "10:40 AM", EndTime: "11:30 AM" },
      { StartTime: "11:40 AM", EndTime: "12:30 PM" },
      { StartTime: "12:30 PM", EndTime: "01:20 PM" },
      { StartTime: "02:00 PM", EndTime: "02:50 PM" },
      { StartTime: "02:50 PM", EndTime: "03:40 PM" },
      { StartTime: "03:50 PM", EndTime: "04:40 PM" },
      { StartTime: "04:40 PM", EndTime: "05:30 PM" },
      { StartTime: "05:40 PM", EndTime: "06:30 PM" },
      { StartTime: "06:30 PM", EndTime: "07:20 PM" },
    ],
  },
  
  bhopal: {
    timeTableSlots: {
      Monday: {
        Theory: ["A11", "B11", "C11", "A21", "A14", "B21", "C21"],
        Lab: [],
      },
      Tuesday: {
        Theory: ["D11", "E11", "F11", "D21", "E14", "E21", "F21"],
        Lab: [],
      },
      Wednesday: {
        Theory: ["A12", "B12", "C12", "A22", "B14", "B22", "A24"],
        Lab: [],
      },
      Thursday: {
        Theory: ["D12", "E12", "F12", "D22", "F14", "E22", "F22"],
        Lab: [],
      },
      Friday: {
        Theory: ["A13", "B13", "C13", "A23", "C14", "B23", "B24"],
        Lab: [],
      },
      Saturday: {
        Theory: ["D13", "E13", "F13", "D23", "D14", "D24", "E23"],
        Lab: [],
      },
      Sunday: {
        Theory: [],
        Lab: [],
      },

    },
    theoryTimings: [
      { StartTime: "08:30 AM", EndTime: "10:00 AM" },
      { StartTime: "10:05 AM", EndTime: "11:35 AM" },
      { StartTime: "11:40 AM", EndTime: "01:10 PM" },
      { StartTime: "01:15 PM", EndTime: "02:45 PM" },
      { StartTime: "02:50 PM", EndTime: "04:20 PM" },
      { StartTime: "04:25 PM", EndTime: "05:55 PM" },
      { StartTime: "06:00 PM", EndTime: "07:30 PM" },
    ],
    labTimings: [],
  },
};

  // Guards
  if (!campus || !(campus in CAMPUS_CONFIGS)) return [];
  if (!day || !(day in CAMPUS_CONFIGS[campus].timeTableSlots)) return [];
  const timetable = timeTable?.timetable || [];
  if (timetable.length === 0) return [];

  // Memoization lookup
  const refKey = (timeTable as unknown as object) || NULL_TIMETABLE_KEY;
  const subKey = `${campus}:${day}`;
  const existing = cache.get(refKey)?.get(subKey);
  if (existing) return existing;

  const processedTimetable: Course[] = [];
  
  for (let i = 0; i < timetable.length; i++) {
    const table: Course = {
      name: timetable[i].name,
      code: timetable[i].code,
      venue: timetable[i].venue,
      slot: timetable[i].slot,
      type: timetable[i].type,
      start_time: null,
      end_time: null,
    };
    
    const slots = table.slot;
    const type = table.type;
    const slotList = CAMPUS_CONFIGS[campus].timeTableSlots[day]?.[type];
    if (!Array.isArray(slotList)) continue;

    const slotIndex = slotList.indexOf(slots);
    if (slotIndex === -1) continue;

    if (type === "Theory") {
      const timing = CAMPUS_CONFIGS[campus].theoryTimings[slotIndex];
      if (!timing) continue;
      table.start_time = timing.StartTime;
      table.end_time = timing.EndTime;
    } else {
      const timing = CAMPUS_CONFIGS[campus].labTimings[slotIndex];
      if (!timing) continue;
      table.start_time = timing.StartTime;
      table.end_time = timing.EndTime;
    }
    processedTimetable.push(table);
  }

  // Combine consecutive lab courses with the same course code
  const finalTimetable: Course[] = [];
  const labGroups: { [key: string]: Course[] } = {};

  // Group lab courses by course code
  for (const course of processedTimetable) {
    if (course.type === "Lab") {
      if (!labGroups[course.code]) {
        labGroups[course.code] = [];
      }
      labGroups[course.code].push(course);
    } else {
      // Theory courses are added directly
      finalTimetable.push(course);
    }
  }

  // Process lab groups to combine consecutive slots
  for (const courseCode in labGroups) {
    const labs = labGroups[courseCode];
    
    // Sort labs by slot index to ensure proper ordering
    const daySlots = CAMPUS_CONFIGS[campus].timeTableSlots[day].Lab;
    labs.sort((a, b) => daySlots.indexOf(a.slot) - daySlots.indexOf(b.slot));
    
    let i = 0;
    while (i < labs.length) {
      const currentLab = labs[i];
      const combinedSlots = [currentLab.slot];
      let j = i + 1;
      
      // Find consecutive slots for the same course
      while (j < labs.length) {
        const nextLab = labs[j];
        const currentSlotIndex = daySlots.indexOf(labs[j - 1].slot);
        const nextSlotIndex = daySlots.indexOf(nextLab.slot);
        
        // Check if the next slot is consecutive and has the same venue
        if (nextSlotIndex === currentSlotIndex + 1 && nextLab.venue === currentLab.venue) {
          combinedSlots.push(nextLab.slot);
          j++;
        } else {
          break;
        }
      }
      
      // Create the combined lab entry
      const combinedLab: Course = {
        name: currentLab.name,
        code: currentLab.code,
        venue: currentLab.venue,
        slot: combinedSlots.join(" + "),
        type: currentLab.type,
        start_time: currentLab.start_time,
        end_time: labs[j - 1].end_time, // End time of the last consecutive slot
      };
      
      finalTimetable.push(combinedLab);
      i = j;
    }
  }

  // Sort the final timetable by start time
  finalTimetable.sort((a, b) => {
    if (a.start_time && b.start_time) {
      return a.start_time.localeCompare(b.start_time);
    }
    return 0;
  });

  // Store in cache
  const bySubKey = cache.get(refKey) ?? new Map<string, Course[]>();
  bySubKey.set(subKey, finalTimetable);
  cache.set(refKey, bySubKey);

  return finalTimetable;
}
