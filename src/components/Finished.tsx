/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react'
import { deleteTimetable } from '../utils/firestoreCalls'
import { AiFillEdit } from 'react-icons/ai'
// import { DiAndroid } from 'react-icons/di'
// import { FaAppStoreIos, FaChrome } from 'react-icons/fa'
import Phone from './../assets/fin.png'
import Chrome from './../assets/chrome_store.png'
import Ios from './../assets/app_store.svg'
import './../styles/Finished.css'

const Finished: React.FC<any> = ({ setStatus, name, userId, db }) => {
  const handleClick = (): void => {
    deleteTimetable(userId, db)
    setStatus('upload')
  }

  return (
    <div className='fin-wrapper'>
      <h1>You're all set{name !== '' && name !== undefined && name !== null ? `, ${name?.split(' ')[0]}` : ''}!</h1>
      <div className='fin'>
        <div className='fin-hero'>
          <img src={Phone} alt='Download Vitty!' />
        </div>
        <div className='fin-interact'>
          <div className='fin-links'>
            <p>Make sure you never miss another class!</p>
            <a className='android' href='https://play.google.com/store/apps/details?id=com.dscvit.vitty&utm_source=website&utm_campaign=vitty_website&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' /></a>
            <a className='disabled' href='/'><img alt='Get it on Chrome Web Store' src={Ios} /></a>
            <a className='chrome' href='https://chrome.google.com/webstore/detail/vitty/eeohmkjefmpmddidkjadpifbfcplkifh'><img alt='Get it on Chrome Web Store' src={Chrome} /></a>

            {/* <a href='https://play.google.com/store/apps/details?id=com.dscvit.vitty'><DiAndroid /> Get it on the Play Store</a>
            <a className='disabled' href='/'><FaAppStoreIos /> Get it on the App Store (coming soon)</a>
            <a href='https://chrome.google.com/webstore/detail/vitty/eeohmkjefmpmddidkjadpifbfcplkifh'><FaChrome /> Get it on the Chrome Web Store</a> */}
          </div>
          <button className='fin-edit' onClick={handleClick}><AiFillEdit />Edit Timetable</button>
        </div>
      </div>
    </div>
  )
}

export default Finished
