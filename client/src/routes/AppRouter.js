import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CostumerCart from '../components/CostumerCart';
import NotFound from '../pages/Notfound';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Account from '../pages/Account';



const AppRouter = (props) => {
    const { user, carts } = props;
  return (
    <BrowserRouter>
      <Header/>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sepet' element={user ? <CostumerCart carts={carts}/> : <Navigate to='/login'/>} />
        <Route path='/profil' element={user ? <Account /> : <Navigate to='/login'/>} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/'/>} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/'/>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter