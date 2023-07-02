import React from 'react';
import CartItem from './CartItem';
import PaymentForm from './CheckOutForm';
function CustomerCart(props) {
  const { carts } = props;
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
                        Ödeme: {props.TotalPrice}
                    </div>
                    <div className="card-body">
                        <PaymentForm />
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  );
}


export default CustomerCart;
