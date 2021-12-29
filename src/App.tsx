/* eslint-disable react/jsx-indent */
import React, { useContext, useEffect } from 'react'
import { AppContext } from './Context'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import EllipseTR from './assets/ellipse_tr.png'
import EllipseBL from './assets/ellipse_bl.png'
import Nav from './components/Nav'
import Auth from './components/Auth'
import HomeCarousel from './components/HomeCarousel'
import LoggedIn from './components/LoggedIn'
import './styles/App.css'

const App: React.FC = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAGsvEIEPrNKNj_0Z5IzoXBCQQAqEQXG48',
    authDomain: 'vitty-dev.firebaseapp.com',
    projectId: 'vitty-dev',
    storageBucket: 'vitty-dev.appspot.com',
    messagingSenderId: '266303676876',
    appId: '1:266303676876:web:2ab417fe6d09be56457d69',
    measurementId: 'G-3L22VJ3LVW'
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const app = initializeApp(firebaseConfig)

  const { userState } = useContext(AppContext)
  const [user, setUser] = userState

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user1) => {
      if (user1 !== null) setUser(user1.uid)
      else setUser('')
    })
  }, [setUser])

  return (
    <>
      <Nav />
      <main>
        {
          user === 'loading'
            ? <div>Loading</div>
            : user === ''
              ? <div className='landing'>
                  <HomeCarousel />
                  <Auth />
                </div>
              : <LoggedIn />
        }
        <div className='ellipse ellipse-tr'><img src={EllipseTR} alt='Vitty' /></div>
        <div className='ellipse ellipse-bl'><img src={EllipseBL} alt='Vitty' /></div>
      </main>
    </>
  )
}

export default App
