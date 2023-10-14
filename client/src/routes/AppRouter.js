import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CostumerCart from '../components/CostumerCart';
import NotFound from '../pages/Notfound';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Account from '../pages/Account';
import Payment from '../pages/Payment';
import Orders from '../components/Orders'
import ProductDetail from '../components/ProductDetail'
import LoadingBarWrapper from '../components/LoadingBarWrapper';

const AppRouter = (props) => {
    const { user, carts } = props;
  return (
    <Router>
      <LoadingBarWrapper>
      <Header/>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sepet' element={user ? <CostumerCart carts={carts} /> : <Navigate to='/login'/>} />
        <Route path='/orders' element={user ? <Orders /> : <Navigate to='/login' /> } />
        <Route path='/profil' element={user ? <Account /> : <Navigate to='/login'/>} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/'/>} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/'/>}/>
        <Route path='/detail' element={user ? <ProductDetail /> : <Navigate to='/'/>}/>
        <Route path='/odeme' element={user ? <Payment carts={carts}/> : <Navigate to='/login'/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </LoadingBarWrapper>
    </Router>
  )
}

export default AppRouter