import React, { useState, useEffect } from 'react'
import './../styles/LoggedIn.css'
import Upload from './Upload'
import Review from './Review'

const LoggedIn: React.FC = () => {
  const [status, setStatus] = useState('loading')
  const [monSlots, setMonSlots] = useState()
  const [tueSlots, setTueSlots] = useState()
  const [wedSlots, setWedSlots] = useState()
  const [thuSlots, setThuSlots] = useState()
  const [friSlots, setFriSlots] = useState()

  useEffect(() => {
    // if (no userdata) setStatus('upload')
    setStatus('upload')
  }, [])

  // useEffect(() => {
  // console.log('mon', monSlots)
  //   console.log('tue', tueSlots)
  //   console.log('wed', wedSlots)
  //   console.log('thu', thuSlots)
  //   console.log('fri', friSlots)
  // }, [friSlots, monSlots, thuSlots, tueSlots, wedSlots])

  return (
    <section className='logged-in'>
      {
        status === 'upload'
          ? <Upload
              setStatus={setStatus}
              setMonSlots={setMonSlots}
              setTueSlots={setTueSlots}
              setWedSlots={setWedSlots}
              setThuSlots={setThuSlots}
              setFriSlots={setFriSlots}
            />
          : status === 'review'
            ? <Review
                monSlots={monSlots}
                tueSlots={tueSlots}
                wedSlots={wedSlots}
                thuSlots={thuSlots}
                friSlots={friSlots}
              />
            : <span>Loading</span>
      }
    </section>
  )
}

export default LoggedIn
