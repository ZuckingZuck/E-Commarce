import React from 'react';
import { NavLink } from 'react-router-dom';
import CartItem from './CartItem';
function CustomerCart(props) {
  const { carts } = props;
  console.log(carts);
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-8 mt-4">
                <div className='bg-dark text-light p-2 rounded '>Sepetiniz</div>
                {
                  carts && carts.map(cartItem => {
                    return <CartItem key={cartItem._id} cartItem={cartItem} />
                  })
                }
            </div>
            <div className="col-md-4">
                <div className='card'>
                    <div className="card-header bg-dark text-light">
                        İşlemler
                    </div>
                    <div className="card-body">
                        <NavLink to="/" className='btn btn-primary'> <i className="fa-solid fa-arrow-left"></i> Alışverişe devam et</NavLink>
                        <NavLink to="/odeme" className='btn btn-success ms-2'> <i className="fa-solid fa-credit-card"></i> Alışverişi tamamla</NavLink>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  );
}


export default CustomerCart;
