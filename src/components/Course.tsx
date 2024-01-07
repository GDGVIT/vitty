import { FaEdit, FaMapMarkerAlt } from "react-icons/fa";
import { Course } from "../store/authStore";

export default function CourseCard({
  Courses,
  setModalSlot,
  setShowModal,
  setModalStatus,
}: {
  Courses: Course[] | null;
  setModalSlot: (slot: string) => void;
  setShowModal: (show: boolean) => void;
  setModalStatus: (status: string) => void;
}) {
  const slots: Course[] = Courses || [];

  // Sort all courses
  // const sortedSlots = [...slots].sort((a: Course, b: Course) => {
  //   const startTimeA = new Date(`1970-01-01T${a.start_time}`);
  //   const startTimeB = new Date(`1970-01-01T${b.start_time}`);
  //   return startTimeA.getTime() - startTimeB.getTime();
  // });

  const onClickEdit = (slot: string): void => {
    setModalSlot(slot);
    setShowModal(true);
    setModalStatus("remove");
  };

  return (
    <div className='course-wrapper'>
      {
        slots.map((course: Course) => {
          return (
            <div key={course.slot} className='course'>
              <div className='course-deets'>
                <div className='course-name'>{course.name}</div>
                <div className='course-time'>
                  {course.start_time} - {course.end_time}
                </div>
                <div className='course-slot-loc'>
                  <div className='course-slot'>{course.slot}</div>
                  <div className='course-loc'>{course.venue} <FaMapMarkerAlt /></div>
                </div>
              </div>
              <div className='course-edit' onClick={() => onClickEdit(course.slot)}><FaEdit /></div>
            </div>
          )
        })
      }
    </div>
  );
}
