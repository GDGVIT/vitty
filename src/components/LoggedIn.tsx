import React, { useState, useEffect } from 'react'
import './../styles/LoggedIn.css'
import Upload from './Upload'

const LoggedIn: React.FC = () => {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    // if (no userdata) setStatus('upload')
    setStatus('upload')
  }, [])

  const changeStatus = (str: string): void => { setStatus(str) }

  return (
    <section className='logged-in'>
      {
        status === 'upload'
          ? <Upload changeStatus={changeStatus} />
          : <span>Loading</span>
      }
    </section>
  )
}

export default LoggedIn
