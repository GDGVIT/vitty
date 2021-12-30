import React from 'react'
import Course from './Course'
import './../styles/Review.css'

const Review: React.FC<any> = ({ monSlots, tueSlots, wedSlots, thuSlots, friSlots }): JSX.Element => {
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
      <button className='review-confirm'>Confirm</button>
    </div>
  )
}

export default Review
