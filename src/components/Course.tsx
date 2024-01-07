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
