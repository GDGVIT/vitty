import { doc, setDoc } from 'firebase/firestore/lite'

interface CourseProps {
  slot: string
  courseCode: string
  courseType: string
  courseName: string
  location: string
  startTime: Date
  endTime: Date
}

export const uploadDailySlots = (courses: CourseProps[], day: string, userId: string, db: any): void => {
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i]
    if (course.courseType === 'Lab') {
      const labSlot = parseInt(course.slot.slice(1))
      course.slot = `L${labSlot} + L${labSlot + 1}`
    }
    const ref = doc(db, 'users', userId, 'timetable', day, 'periods', `P${String(i)}`)
    void setDoc(ref, {
      slot: course.slot,
      courseCode: course.courseCode,
      courseName: course.courseName,
      Course_type: course.courseType,
      location: course.location,
      startTime: course.startTime,
      endTime: course.endTime
    })
  }
  const ref = doc(db, 'users', userId)
  void setDoc(ref, {
    isTimetableAvailable: true,
    isUpdated: true
  })
}
