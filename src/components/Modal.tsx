import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import './../styles/Modal.css'

interface Props {
  onClose: any
  slot?: string
  status: string
}

const Modal: React.FC<Props> = ({ onClose, slot, status }) => {
  const [slotAdd, setSlotAdd] = useState('')
  const [tip, setTip] = useState<string|undefined>('')

  useEffect(() => {
    if (status === 'remove') {
      if (slot?.match(/[A-G]/) !== null) {
        if (slot?.includes('T') === true) {
          setTip(`Tip: Don't forget to take out ${slot?.slice(1)} as well!`)
        } else setTip(`Tip: Don't forget to take out T${String(slot)} as well!`)
      }
    }
  }, [])

  return (
    <div className='modal' onClick={onClose}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <h3>{`${status === 'remove' ? 'Remove' : 'Add'}`} Slot</h3>
          <FaTimes onClick={onClose} />
        </div>
        <div className='modal-body'>
          {
            status === 'remove'
              ? <div className='modal-message'>Do you want to remove all <span>{slot}</span> slots?</div>
              : <div className='modal-message'>Enter course details (<span>A1-CSE2001-TH-SJT602-ALL</span>)</div>
          }
          {
            status === 'add' &&
              <input className='modal-input' type='text' value={slotAdd} onChange={e => setSlotAdd(e.target.value)} />
          }
          <div className='modal-buttons'>
            {
              status === 'remove'
                ?
                  <>
                    <button className='modal-yes'>Yes</button>
                    <button className='modal-no'>No</button>
                  </>
                : <button className='modal-yes'>Confirm</button>
            }
          </div>
          <div className='modal-tip'>{tip}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
