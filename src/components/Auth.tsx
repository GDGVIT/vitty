import React, { useContext } from 'react'
import { AppContext } from './../Context'
import { getAuth, GoogleAuthProvider, OAuthProvider, getRedirectResult, signInWithRedirect } from 'firebase/auth'
import { FaApple } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import '../styles/Auth.css'

const Auth: React.FC = () => {
  const { userState } = useContext(AppContext)
  const [, setUser] = userState

  const auth = getAuth()
  const appleProvider = new OAuthProvider('apple.com')
  const googleProvider = new GoogleAuthProvider()
  const logIn = (auth: any, provider: any): void => {
    void signInWithRedirect(auth, provider)
    getRedirectResult(auth)
      .then((result) => {
        if (result !== null) {
          const user = result.user
          setUser(user.uid)
          console.log(user)
        }
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        console.log(errorCode, errorMessage, email)
      })
  }
  return (
    <div className='auth'>
      <h1>Welcome to VIT<span>TY</span></h1>
      <div className='google-sign-in'>
        <button onClick={() => logIn(auth, googleProvider)}> <FcGoogle /> Sign in with Google</button>
      </div>
      <div className='apple-sign-in'>
        <button onClick={() => logIn(auth, appleProvider)}> <FaApple /> Sign in with Apple</button>
      </div>
    </div>
  )
}

export default Auth
