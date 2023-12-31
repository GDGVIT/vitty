import React from 'react'
import { FaTimes } from 'react-icons/fa'
import './../styles/Modal.css'
import { useShowProfileStore } from '../store/profileStore'
import { useAuthStore } from '../store/authStore'
import { getAuth, signOut } from 'firebase/auth'

const Profile: React.FC = () => {

    const { toggleProfile } = useShowProfileStore()
    const { name, email, logout } = useAuthStore()

    const toggle = (): void => {
        toggleProfile()
    }

    const logOut = (): void => {
        const auth = getAuth()
        signOut(auth).then(() => {
            console.log(auth.currentUser)
            logout();
            toggleProfile();
        }).catch((error) => {
            console.error(error)
        })
    }

  return (
    <div className='modal' onClick={toggle}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <h3>Profile</h3>
          <FaTimes onClick={toggle}/>
        </div>
        <div className='modal-body'>
          {name !== null && <div className='modal-message'><span>Name:</span> {name}</div>}
          <div className='modal-message'><span>Email:</span> {email}</div>
          <div className='modal-buttons'>
            <button className='modal-yes' onClick={logOut}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
