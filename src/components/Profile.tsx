import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import './../styles/Modal.css'
import { useShowProfileStore } from '../store/profileStore'
import { useAuthStore, campusType } from '../store/authStore'
import { getAuth, signOut } from 'firebase/auth'
import { AiFillEdit } from 'react-icons/ai'
import { patchCampus } from '../utils/apicalls'
import toast from 'react-hot-toast'

const Profile: React.FC = () => {

    const { toggleProfile } = useShowProfileStore()
    const { name, email, campus, updateCampus, logout, token } = useAuthStore()
    const [isEditingCampus, setIsEditingCampus] = useState(false)
    const [tempCampus, setTempCampus] = useState<campusType>(campus)
    const [isCampusLoading, setIsCampusLoading] = useState(false)

    const toggle = (): void => {
        toggleProfile()
    }

    const logOut = (): void => {
        const auth = getAuth()
        signOut(auth).then(() => {
            logout();
            toggleProfile();
        }).catch(() => {
        })
    }

    const handleCampusSave = () => {
        setIsCampusLoading(true)
        patchCampus(tempCampus!, token).then((res) => {
            if(res.detail === "Campus updated successfully"){
                toast.success("Campus updated successfully")
                updateCampus(tempCampus)
            }
            setIsEditingCampus(false)
            setIsCampusLoading(false)
        }).catch((err) => {
            toast.error(err.detail)
            setIsEditingCampus(false)
            setIsCampusLoading(false)
        })
    }

    const handleCampusCancel = () => {
        setTempCampus(campus)
        setIsEditingCampus(false)
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
          <div className='modal-message flex flex-row items-center gap-2'>
            <span>Campus:</span>
            {isEditingCampus ? (
              <div className='campus-edit-container'>
                <select 
                  value={tempCampus || ''} 
                  onChange={(e) => setTempCampus(e.target.value as campusType)}
                  className='campus-select'
                >
                  <option value="">Select Campus</option>
                  <option value="vellore">Vellore</option>
                  <option value="chennai">Chennai</option>
                  <option value="bhopal">Bhopal</option>
                </select>
                <div className='campus-edit-buttons'>
                  <button 
                    onClick={handleCampusSave} 
                    className='campus-save-btn'
                    disabled={isCampusLoading}
                  >
                    {isCampusLoading ? 'Saving...' : 'Save'}
                  </button>
                  <button 
                    onClick={handleCampusCancel} 
                    className='campus-cancel-btn'
                    disabled={isCampusLoading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className='campus-display'>
                <span>{campus ? campus.charAt(0).toUpperCase() + campus.slice(1) : 'Not set'}</span>
                <button 
                  onClick={() => setIsEditingCampus(true)}
                  className='campus-edit-btn'
                >
                  <AiFillEdit />
                </button>
              </div>
            )}
          </div>
          <div className='modal-buttons'>
            <button className='modal-yes' onClick={logOut}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
