/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import VTLogo from './../assets/landing_logo.png'
import userIcon from './../assets/icon.png'
import './../styles/Nav.css'
import { useAuthStore } from '../store/authStore'
import { useShowProfileStore } from '../store/profileStore'

const Nav: React.FC = () => {

  const [text, setText] = useState('Sign In');
  const { name, profile, email, logout } = useAuthStore()
  const { toggleProfile, showProfile } = useShowProfileStore()
  const user = name;
  const pic = profile;
  const logOut = (): void => {
    const auth = getAuth()
    signOut(auth).then(() => {
      logout()
    }).catch((error) => {
      console.error(error)
    })
  }

  const toggle = (): void => {
    toggleProfile()
    console.log(showProfile, "profile");
  }

  useEffect(() => {
    if (user !== '' && user !== 'loading') setText('Sign Out')
  }, [user])

  return (
    <header>
      <div className='logo'>
        <img src={VTLogo} alt='VITTY' />
        {/* <img src={Logo} alt='VITTY' /> */}
      </div>
      {
        user !== null && user !== '' &&
          <div className='user-pfp' onClick={toggle} >
            <img src={(pic !== null && pic !== '') ? pic : userIcon} alt='DP' />
          </div>
      }
      {/* <div className='nav-right'>
        <div className='sign-out' onClick={() => logOut()}>{text}</div>
      </div> */}
    </header>
  )
}

export default Nav
