import { Course } from "../store/authStore";

export function deduplicateTimetable(courses: Course[]): Course[] {
  const courseMap = new Map<string, Course>();
  
  for (const course of courses) {
    const courseId = `${course.code}-${course.slot}-${course.type}`;
    
    const existingCourse = courseMap.get(courseId);
    
    if (!existingCourse || (existingCourse.venue === "NIL" && course.venue !== "NIL")) {
      courseMap.set(courseId, course);
    }
  }
  
  return Array.from(courseMap.values());
}
