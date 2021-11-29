import React, { useEffect, useState } from 'react'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import './../styles/Nav.css'
import Logo from './../assets/logo.svg'

const Nav: React.FC = () => {
  const [text, setText] = useState('')

  const logOut = (): void => {
    const auth = getAuth()
    signOut(auth).then(() => {
      setText('')
    }).catch((error) => {
      console.error(error)
    })
  }

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user !== null) setText('Sign Out')
    })
  }, [])

  return (
    <header>
      <div className='logo'>
        <img src={Logo} alt='VITTY' />
      </div>
      <div className='sign-out' onClick={() => logOut()}>{text}</div>
    </header>
  )
}

export default Nav
