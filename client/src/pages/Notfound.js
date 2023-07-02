import React from 'react'
import { NavLink } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='container mt-3 text-center'>
        <h1>
            404 - Aradığınız sayfayı bulamadık!
        </h1>
        <NavLink to='/' className="btn btn-warning">
            Ana Sayfa
        </NavLink>
    </div>
  )
}

export default NotFound