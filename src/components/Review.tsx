import React, { useContext } from 'react'
import { AppContext } from './../Context'
import { uploadDailySlots } from './../utils/firebaseUpload'
import Course from './Course'
import './../styles/Review.css'

const Review: React.FC<any> = ({ setStatus, monSlots, tueSlots, wedSlots, thuSlots, friSlots, db }): JSX.Element => {
  const { userState } = useContext(AppContext)
  const [user] = userState

  const handleConfirm = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault()
    uploadDailySlots(monSlots, 'monday', user, db)
    uploadDailySlots(tueSlots, 'tuesday', user, db)
    uploadDailySlots(wedSlots, 'wednesday', user, db)
    uploadDailySlots(thuSlots, 'thursday', user, db)
    uploadDailySlots(friSlots, 'friday', user, db)
    setStatus('finished')
  }

  return (
    <div className='review-wrapper'>
      <h1>Review Timetable</h1>
      <div className='review'>
        <div className='day'>
          <h3>Monday</h3>
          <Course slots={monSlots} />
        </div>
        <div className='day'>
          <h3>Tuesday</h3>
          <Course slots={tueSlots} />
        </div>
        <div className='day'>
          <h3>Wednesday</h3>
          <Course slots={wedSlots} />
        </div>
        <div className='day'>
          <h3>Thursday</h3>
          <Course slots={thuSlots} />
        </div>
        <div className='day'>
          <h3>Friday</h3>
          <Course slots={friSlots} />
        </div>
      </div>
      <button className='review-confirm' onClick={handleConfirm}>Confirm</button>
    </div>
  )
}

export default Review
