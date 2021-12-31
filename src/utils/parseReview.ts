interface CourseProps {
  slot: string
  courseCode: string
  courseType: string
  courseName: string
  location: string
  startTime: Date
  endTime: Date
}

export const removeSlot =
  (slot: string,
    monSlots: CourseProps[],
    tueSlots: CourseProps[],
    wedSlots: CourseProps[],
    thuSlots: CourseProps[],
    friSlots: CourseProps[]
  ): CourseProps[][] => {
    monSlots = monSlots.filter((course) => course.slot !== slot)
    tueSlots = tueSlots.filter((course) => course.slot !== slot)
    wedSlots = wedSlots.filter((course) => course.slot !== slot)
    thuSlots = thuSlots.filter((course) => course.slot !== slot)
    friSlots = friSlots.filter((course) => course.slot !== slot)
    return [monSlots, tueSlots, wedSlots, thuSlots, friSlots]
  }
