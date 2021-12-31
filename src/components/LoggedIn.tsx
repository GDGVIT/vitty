import React, { useState, useEffect } from 'react'
import './../styles/LoggedIn.css'
import Upload from './Upload'
import Review from './Review'

const LoggedIn: React.FC<any> = ({ db }) => {
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
                setStatus={setStatus}
                monSlots={monSlots}
                tueSlots={tueSlots}
                wedSlots={wedSlots}
                thuSlots={thuSlots}
                friSlots={friSlots}
                setMonSlots={setMonSlots}
                setTueSlots={setTueSlots}
                setWedSlots={setWedSlots}
                setThuSlots={setThuSlots}
                setFriSlots={setFriSlots}
                db={db}
              />
            : status === 'finished'
              ? <div className=''>Finished</div>
              : <span>Loading</span>
      }
    </section>
  )
}

export default LoggedIn
