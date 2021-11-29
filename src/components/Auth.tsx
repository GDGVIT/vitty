import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { FaApple } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import '../styles/auth.css'

const Auth: React.FC = () => {
  const auth = getAuth()
  const googleProvider = new GoogleAuthProvider()
  const logIn = (auth: any, provider: any): void => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        // TODO: Create context and add
        console.log(user)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        console.log(errorCode, errorMessage, email)
      })
  }
  // TODO: Apple sign in
  return (
    <div className='auth'>
      <div className='google-sign-in'>
        <button onClick={() => logIn(auth, googleProvider)}> <FcGoogle /> Sign in with Google</button>
      </div>
      <div className='apple-sign-in'>
        <button onClick={() => logIn(auth, googleProvider)}> <FaApple /> Sign in with Apple</button>
      </div>
    </div>
  )
}

export default Auth
