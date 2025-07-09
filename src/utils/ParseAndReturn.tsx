import { TimeTable, Course } from "../store/authStore";

export default function ParseAndReturn(
  timeTable: TimeTable | null,
  day: string
) {
  type TimeTableSlot = {
    [key: string]: {
      [key: string]: string[];
    };
  };

  const TimeTableSlots: TimeTableSlot = {
    Monday: {
      Theory: [
        "A1",
        "F1",
        "D1",
        "TB1",
        "TG1",
        "A2",
        "F2",
        "D2",
        "TB2",
        "TG2",
        "V3",
      ],
      Lab: [
        "L1",
        "L2",
        "L3",
        "L4",
        "L5",
        "L6",
        "L31",
        "L32",
        "L33",
        "L34",
        "L35",
        "L36",
      ],
    },
    Tuesday: {
      Theory: [
        "B1",
        "G1",
        "E1",
        "TC1",
        "TAA1",
        "B2",
        "G2",
        "E2",
        "TC2",
        "TAA2",
        "V4",
      ],
      Lab: [
        "L7",
        "L8",
        "L9",
        "L10",
        "L11",
        "L12",
        "L37",
        "L38",
        "L39",
        "L40",
        "L41",
        "L42",
      ],
    },
    Wednesday: {
      Theory: [
        "C1",
        "A1",
        "F1",
        "V1",
        "V2",
        "C2",
        "A2",
        "F2",
        "TD2",
        "TBB2",
        "V5",
      ],
      Lab: [
        "L13",
        "L14",
        "L15",
        "L16",
        "L17",
        "L18",
        "L43",
        "L44",
        "L45",
        "L46",
        "L47",
        "L48",
      ],
    },
    Thursday: {
      Theory: [
        "D1",
        "B1",
        "G1",
        "TE1",
        "TCC1",
        "D2",
        "B2",
        "G2",
        "TE2",
        "TCC2",
        "V6",
      ],
      Lab: [
        "L19",
        "L20",
        "L21",
        "L22",
        "L23",
        "L24",
        "L49",
        "L50",
        "L51",
        "L52",
        "L53",
        "L54",
      ],
    },
    Friday: {
      Theory: [
        "E1",
        "C1",
        "TA1",
        "TF1",
        "TD1",
        "E2",
        "C2",
        "TA2",
        "TF2",
        "TDD2",
        "V7",
      ],
      Lab: [
        "L25",
        "L26",
        "L27",
        "L28",
        "L29",
        "L30",
        "L55",
        "L56",
        "L57",
        "L58",
        "L59",
        "L60",
      ],
    },
    Saturday: {
      Theory: [
        "V8",
        "X11",
        "X12",
        "Y11",
        "Y12",
        "X21",
        "Z21",
        "Y21",
        "W21",
        "W22",
        "V9",
      ],
      Lab: [
        "L71",
        "L72",
        "L73",
        "L74",
        "L75",
        "L76",
        "L77",
        "L78",
        "L79",
        "L80",
        "L81",
        "L82",
      ],
    },
    Sunday: {
      Theory: [
        "V10",
        "Y11",
        "Y12",
        "X11",
        "X12",
        "Y21",
        "Z21",
        "X21",
        "W21",
        "W22",
        "V11",
      ],
      Lab: [
        "L83",
        "L84",
        "L85",
        "L86",
        "L87",
        "L88",
        "L89",
        "L90",
        "L91",
        "L92",
        "L93",
        "L94",
      ],
    },
  };

  interface Timings {
    StartTime: string;
    EndTime: string;
  }

  const TheoryTimings: Timings[] = [
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
  ];

  const LabTimings: Timings[] = [
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
  ];

  const timetable = timeTable?.timetable || [];
  const finalTimetable: Course[] = [];
   
  const courseMap = new Map<string, Course>();
  
  for (let i = 0; i < timetable.length; i++) {
    const table: Course = {
      name: timetable[i].name,
      code: timetable[i].code,
      venue: timetable[i].venue,
      slot: timetable[i].slot,
      type: timetable[i].type,
      start_time: null,
      end_time: null,
    }
    

    if (timetable[i].slot.includes('+')) {
      console.log(`Found combined slot: ${timetable[i].slot} for ${timetable[i].code} on ${day}`);
    }
    
    const slots = table.slot;
    let type = table.type;
    
    if (slots.startsWith('L')) {
      if (type !== 'Lab') {
        console.log(`Correcting slot type: ${slots} from ${type} to Lab`);
        type = 'Lab';
      }
    }
    
    const slot = TimeTableSlots[day][type];
    
    let courseId = `${table.code}-${table.slot}-${type}`;
    let isConsecutiveLabSlot = false;
    
    if (type === 'Lab' && slots.match(/^L\d+$/)) {
      const slotNumber = parseInt(slots.substring(1));
      const consecutiveSlot = `L${slotNumber + 1}`;
      
      const hasConsecutiveSlot = timetable.some(course => 
        course.code === table.code && 
        course.slot === consecutiveSlot &&
        course.venue === table.venue
      );
      
      if (hasConsecutiveSlot) {
        const baseSlot = slotNumber % 2 === 1 ? slots : `L${slotNumber - 1}`;
        courseId = `${table.code}-${baseSlot}-${type}`;
        isConsecutiveLabSlot = true;
      }
    }
 
    let slotExists = false;
    let startTime = "";
    let endTime = "";
    
    if (slot.includes(slots)) {
      slotExists = true;
      const slotIndex = slot.indexOf(slots);
      if(type === "Theory"){
        startTime = TheoryTimings[slotIndex].StartTime;
        endTime = TheoryTimings[slotIndex].EndTime;
      } else {
        startTime = LabTimings[slotIndex].StartTime;
        endTime = LabTimings[slotIndex].EndTime;
      }
    } else if (slots.includes('+')) {
      const slotParts = slots.split('+');
      const firstSlot = slotParts[0];
      const lastSlot = slotParts[slotParts.length - 1];
      
      const firstSlotIndex = slot.indexOf(firstSlot);
      const lastSlotIndex = slot.indexOf(lastSlot);
      
      if (firstSlotIndex !== -1 && lastSlotIndex !== -1) {
        slotExists = true;
        if(type === "Theory"){
          startTime = TheoryTimings[firstSlotIndex].StartTime;
          endTime = TheoryTimings[lastSlotIndex].EndTime;
        } else {
          startTime = LabTimings[firstSlotIndex].StartTime;
          endTime = LabTimings[lastSlotIndex].EndTime;
        }
      }
    } else if (isConsecutiveLabSlot && type === 'Lab') {
      const slotNumber = parseInt(slots.substring(1));
      const firstSlot = slotNumber % 2 === 1 ? slots : `L${slotNumber - 1}`;
      const secondSlot = slotNumber % 2 === 1 ? `L${slotNumber + 1}` : slots;
      
      const firstSlotIndex = slot.indexOf(firstSlot);
      const secondSlotIndex = slot.indexOf(secondSlot);
      
      
      if (firstSlotIndex !== -1 && secondSlotIndex !== -1) {
        slotExists = true;
        startTime = LabTimings[firstSlotIndex].StartTime;
        endTime = LabTimings[secondSlotIndex].EndTime;
      }
    }
 
    if (slotExists) {
      const existingCourse = courseMap.get(courseId);
      if (!existingCourse || (existingCourse.venue === "NIL" && table.venue !== "NIL")) {
        if (isConsecutiveLabSlot && type === 'Lab') {
          const slotNumber = parseInt(slots.substring(1));
          const firstSlot = slotNumber % 2 === 1 ? slots : `L${slotNumber - 1}`;
          const secondSlot = slotNumber % 2 === 1 ? `L${slotNumber + 1}` : slots;
          table.slot = `${firstSlot}+${secondSlot}`;
        }
        
        table.start_time = startTime;
        table.end_time = endTime;
        
        courseMap.set(courseId, table);
      }
    } else {
      console.log(`Slot not found: ${slots} (type: ${type}) on ${day}`);
      if (slots.includes('+')) {
        const slotParts = slots.split('+');
      }
    }
  }
  
  finalTimetable.push(...courseMap.values());

  return finalTimetable;
}
