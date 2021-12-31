import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from './../Context'
import { isAvailable } from '../utils/firestoreCalls'
import Upload from './Upload'
import Review from './Review'
import Finished from './Finished'
import './../styles/LoggedIn.css'

const LoggedIn: React.FC<any> = ({ db, name }) => {
  const { userState } = useContext(AppContext)
  const [user] = userState
  const [status, setStatus] = useState('loading')
  const [monSlots, setMonSlots] = useState()
  const [tueSlots, setTueSlots] = useState()
  const [wedSlots, setWedSlots] = useState()
  const [thuSlots, setThuSlots] = useState()
  const [friSlots, setFriSlots] = useState()

  useEffect(() => {
    // if (no userdata) setStatus('upload')
    isAvailable(user, db).then((bool) => {
      if (bool) setStatus('finished')
      else setStatus('upload')
    }, () => {})
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
              ? <Finished name={name} />
              : <span>Loading</span>
      }
    </section>
  )
}

export default LoggedIn
