import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin';
const Login = () => {
    const { login, error, isLoading } = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }

  return (
    <div className='container d-flex align-items-center justify-content-center'>
        <div className='card' style={{width: "45rem"}}>
            <div className='card-header text-center'>
                <h3>
                    Giriş Yap
                </h3>
            </div>
            <div className='card-body'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Eposta Adresi
                        </label>
                        <input
                            type="email"
                            onChange={(e) => {setEmail(e.target.value)}}
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Parola
                        </label>
                        <input
                            type="password"
                            onChange={(e) => {setPassword(e.target.value)}}
                            className="form-control"
                            id="password"
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                            Beni hatırla
                        </label>
                    </div>
                    <div className='d-grid gap-2'>
                        <button disabled={isLoading} type="submit" className="btn btn-dark">
                             Giriş yap
                        </button>
                    </div>
                    
                </form>
            </div>
            <div className='card-footer'>
                Hesabın yok mu? Hemen
                <NavLink to="/signup" className="ms-1">
                    kayıt ol!
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default Login