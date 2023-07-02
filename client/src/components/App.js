import React, {useEffect } from 'react';
import AppRouter from '../routes/AppRouter';
import { useAuthContext } from '../hooks/useAuthContext';
import { useCartContext } from '../hooks/useCartContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { user, userControl } = useAuthContext()

  console.log(userControl, 'bu user control');
  const {carts, dispatch} = useCartContext()
  
    useEffect(() => {
        const fetchCart = async () => {
        const response = await fetch('/api/cart', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        })
        const json = await response.json()
        if (response.ok) {
          dispatch({type: 'GET_CART', payload: json})
        }
      }
  
      if(user){
        fetchCart()
      }
    }, [dispatch, user])

    

  return (
    <>
      <ToastContainer />
      {
        userControl && <AppRouter user={user} carts={carts}/>
      }
    </>
   );
  
}

export default App;
