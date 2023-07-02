import { useState } from 'react';
import { NavLink } from 'react-router-dom';
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container ps-4'>
        <NavLink to='/' className='navbar-brand'>
          Ana Sayfa
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          onClick={toggle}
          aria-controls='navbarNav'
          aria-expanded={isOpen}
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id='navbarNav'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <a href='/' className='nav-link'>
                Elektronik
              </a>
            </li>
            <li className='nav-item'>
              <a href='/' className='nav-link'>
                Hediyelik
              </a>
            </li>
          </ul>
          <div className='d-flex'>
            
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;