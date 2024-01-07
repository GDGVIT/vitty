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
  for (let i = 0; i < timetable.length; i++) {
    const table:Course = {
      name: timetable[i].name,
      code: timetable[i].code,
      venue: timetable[i].venue,
      slot: timetable[i].slot,
      type: timetable[i].type,
      start_time: "",
      end_time: "",
    }
    const slots = table.slot;
    const type = table.type;
    const slot = TimeTableSlots[day][type];
    console.log(table, "table");
    if (slot.includes(slots)) {
      if(type === "Theory"){
        console.log(slot.indexOf(slots), "start time")
        table.start_time = TheoryTimings[slot.indexOf(slots)].StartTime;
        table.end_time = TheoryTimings[slot.indexOf(slots)].EndTime;
      }
      else{
        table.start_time = LabTimings[slot.indexOf(slots)].StartTime;
        table.end_time = LabTimings[slot.indexOf(slots)].EndTime;
      }
      finalTimetable.push(table);
    }
  }

  return finalTimetable;
}
