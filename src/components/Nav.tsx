import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './../Context'
import { getAuth, signOut } from 'firebase/auth'
import './../styles/Nav.css'
import VTLogo from './../assets/landing_logo.png'

const Nav: React.FC = () => {
  const { userState } = useContext(AppContext)
  const [user, setUser] = userState
  const [text, setText] = useState('')

  const logOut = (): void => {
    const auth = getAuth()
    signOut(auth).then(() => {
      setText('')
      setUser('')
    }).catch((error) => {
      console.error(error)
    })
  }

  useEffect(() => {
    if (user !== '') setText('Sign Out')
  }, [user])

  return (
    <header>
      <div className='logo'>
        <img src={VTLogo} alt='VITTY' />
        {/* <img src={Logo} alt='VITTY' /> */}
      </div>
      <div className='sign-out' onClick={() => logOut()}>{text}</div>
    </header>
  )
}

export default Nav
