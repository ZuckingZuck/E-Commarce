import React  from 'react'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useCartContext } from '../hooks/useCartContext'
import { useAuthContext } from '../hooks/useAuthContext'

const Header = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { carts } = useCartContext()

  let length = null;

  if(carts){
    length = carts.length;
  }

  const handleClick = () => {
    logout();
  }

  const way = user ? '/profil' : '/login';

  return (
    <div className='bg-light'>
      <div className='container'>
        
        <div style={{width: "100%"}} className='d-flex justify-content-between'>
            <div className='text-start'>
              <NavLink to='/'>
                <img style={{width: "200px"}} className="align-self-start d-inline md-6" src="https://cdn.cookielaw.org/logos/342262f8-3520-4b54-a891-87db0f86bb32/8d1e5729-a775-49ac-adfb-5180f03ccdc1/e6c0d8cc-0360-4eb9-8b35-605a31a2096a/FU_Logo_black_rgb.png" alt="logo" />
              </NavLink>
            </div>
            <div className='text-end mt-3'>
              <NavLink to='/sepet'  className='text-dark socialIcons'>
                <i className="fas fa-shopping-cart rounded-circle bg-light mx-3 fs-3 position-relative">
                    <span style={{fontSize: 12}} className='position-absolute top-0 start-100 translate-middle badge rounded-circle bg-info'>{length > 0 ? length : null}</span>
                </i>
              </NavLink>
              <NavLink to={way} className="text-dark">
                <i className="fas fa-user rounded-circle bg-light fs-3"></i>
              </NavLink>
              
              {
                user && <i onClick={handleClick} className="fa-solid fs-3 ms-3 fa-right-from-bracket cursor-pointer"></i>
              }
            </div>

        </div>
      </div>
        
    </div>
  )
}

export default Header