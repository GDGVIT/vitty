/* eslint-disable @typescript-eslint/no-misused-promises */
import { doc, setDoc, collection, getDocs, deleteDoc, getDoc } from 'firebase/firestore/lite'

interface CourseProps {
  slot: string
  courseCode: string
  courseType: string
  courseName: string
  location: string
  startTime: Date
  endTime: Date
}

export const isAvailable = async (userId: string, db: any): Promise<boolean> => {
  const ref = doc(db, 'users', userId)
  const docSnap = await getDoc(ref)
  if (docSnap.exists()) {
    return docSnap.data().isTimetableAvailable
  } else return false
}

const uploadDailySlots = (courses: CourseProps[], day: string, userId: string, db: any): void => {
  deleteDailySlots(day, userId, db).then(() => {
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
  }, () => {})
}

const getVersion = async (userId: string, db: any): Promise<number> => {
  const ref = doc(db, 'users', userId)
  const docSnap = await getDoc(ref)
  if (docSnap.exists()) {
    const version = docSnap.data().timetableVersion
    if (isNaN(version)) return -1
    else return version
  } else return -1
}

export const uploadSlots = (courses: CourseProps[][], userId: string, db: any): void => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  for (let i = 0; i < days.length; i++) uploadDailySlots(courses[i], days[i], userId, db)
  void getVersion(userId, db).then((ver) => {
    const ref = doc(db, 'users', userId)
    void setDoc(ref, {
      isTimetableAvailable: true,
      isUpdated: true,
      timetableVersion: ver + 1
    })
  })
}

const deleteDailySlots = async (day: string, userId: string, db: any): Promise<void> => {
  const querySnapshot = await getDocs(collection(db, 'users', userId, 'timetable', day, 'periods'))
  querySnapshot.forEach(async (qsD) => {
    await deleteDoc(doc(db, 'users', userId, 'timetable', day, 'periods', qsD.id))
  })
}

export const deleteTimetable = (userId: string, db: any): void => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  days.forEach(day => {
    deleteDailySlots(day, userId, db).then(() => {}, () => {})
  })
  void getVersion(userId, db).then((ver) => {
    const ref = doc(db, 'users', userId)
    void setDoc(ref, {
      isTimetableAvailable: false,
      isUpdated: true,
      timetableVersion: ver + 1
    })
  })
}
