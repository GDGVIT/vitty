import React, { useState, useEffect } from 'react'
import './../styles/LoggedIn.css'
import Upload from './Upload'

const LoggedIn: React.FC = () => {
  const [status, setStatus] = useState('')

  useEffect(() => {
    // if no userdata
    if (status !== 'upload') setStatus('upload')
  }, [status])

  return (
    <section className='logged-in'>
      {
        status === 'upload'
          ? <Upload />
          : <span>Loading</span>
      }
    </section>
  )
}

export default LoggedIn
