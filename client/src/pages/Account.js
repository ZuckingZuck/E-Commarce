import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

import '../styles/profileStyle.scss';

import ProfileMenu from '../components/ProfileMenu';
import UserInfo from '../components/UserInfo';
const Account = () => {
    const { user } = useAuthContext();
    console.log(user);
  return (
    <div className='container'>
        <div className='row'>
            <ProfileMenu />
            <UserInfo />
        </div>
        
    </div>
  )
}

export default Account