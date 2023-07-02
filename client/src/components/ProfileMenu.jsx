import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
const ProfileMenu = () => {
    const { user } = useAuthContext();
  return (
    <div className="profile-nav col-md-3 mt-3">
        <div className="panel">
            <div className="user-heading round">
            <a href="#">
                <img src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg" alt="" />
            </a>
            <h1>{user.name} {user.surname}</h1>
            <p>
                {user.email}   
            </p>
            </div>
            <ul className="list-group">
                <a href="/profil" className='list-group-item'>
                    <i className="fa fa-user text-info" /> Bilgilerim
                </a>
                <a href="/profil" className='list-group-item'>
                    <i className="fa-solid fa-list text-info"></i> Siparişlerim
                    <span className="bg-danger rounded-circle badge text-light ms-2">2</span>
                </a>
                <a href="/profil" className='list-group-item'>
                    <i className="fa-regular fa-bookmark text-info"></i> Kayıtlı Ürünlerim
                    <span className="bg-danger rounded-circle badge text-light ms-2">5</span>
                </a>
                <a href="/profil" className='list-group-item'>
                    <i class="fa-solid fa-location-dot text-info"></i> Kayıtlı Adresim
                </a>
                <a href="/profil" className='list-group-item'>
                    <i className="fa fa-edit text-info" /> Bilgilerimi Düzenle
                </a>
            </ul>
        </div>
        </div>

  )
}

export default ProfileMenu