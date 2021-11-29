import React from 'react'
import { initializeApp } from 'firebase/app'
import Auth from './components/Auth'
// import './styles/App.css'

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

  return (
    <div>
      VITTY
      <Auth />
    </div>
  )
}

export default App
