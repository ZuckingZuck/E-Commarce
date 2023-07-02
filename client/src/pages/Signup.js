import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { NavLink } from 'react-router-dom'
const Signup = () => {
    const { signup, isLoading, error }= useSignup();
    const [name, setName] = useState('');
    const [surname, setSurName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(name, surname, email, phone, password);
    }

  return (
    <div className="container d-flex align-items-center justify-content-center">
        <div className='card' style={{width: "45rem"}}>
            <div className='card-header text-center'>
                <h3>
                    Kayıt Ol
                </h3>
            </div>
            <div className='card-body'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Ad
                        </label>
                        <input
                            onChange={(e) => {setName(e.target.value)}}
                            type="text"
                            className="form-control"
                            id="name"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label">
                            Soyad
                        </label>
                        <input
                            onChange={(e) => {setSurName(e.target.value)}}
                            type="text"
                            className="form-control"
                            id="surname"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Eposta Adresi
                        </label>
                        <input
                            onChange={(e) => {setEmail(e.target.value)}}
                            type="email"
                            className="form-control"
                            id="email"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                            Telefon
                        </label>
                        <input
                            onChange={(e) => {setPhone(e.target.value)}}
                            type="tel"
                            className="form-control"
                            id="phone"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Parola
                        </label>
                        <input
                            onChange={(e) => {setPassword(e.target.value)}}
                            type="password"
                            className="form-control"
                            id="password"
                        />
                    </div>
                    <div className='d-grid gap-2'>
                        <button disabled={isLoading} type="submit" className="btn btn-dark">
                            Kayıt ol
                        </button>
                    </div>
                    
                </form>
            </div>
            <div className='card-footer'>
                {error && <div className="error">{error}</div>}
                Zaten hesabın var mı? Hemen
                <NavLink to="/giris" className="ms-1">
                    Giriş yap!
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default Signup