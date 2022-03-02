import React from 'react'
import { FaTimes } from 'react-icons/fa'
import './../styles/Modal.css'

const Profile: React.FC<any> = ({ onClose, onLogOut, name, email }) => {
  return (
    <div className='modal' onClick={onClose}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <h3>Profile</h3>
          <FaTimes onClick={onClose} />
        </div>
        <div className='modal-body'>
          {name !== null && <div className='modal-message'><span>Name:</span> {name}</div>}
          <div className='modal-message'><span>Email:</span> {email}</div>
          <div className='modal-buttons'>
            <button className='modal-yes' onClick={onLogOut}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
