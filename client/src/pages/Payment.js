import React, {useEffect, useState} from 'react'
import PaymentForm from '../components/CheckOutForm';
import PaymentItem from '../components/PaymentItem';
const Payment = (props) => {
    const [totalPrice, setTotalPrice] = useState(0)
    const numberFormat = (value) =>
    new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
    }).format(value);
    const { carts } = props
  return (
    <div className='container'>
        <div className="col mt-4">
                <div className='bg-dark text-light p-2 rounded '>Satın alacağınız ürünler</div>
                {
                  carts && carts.map(cartItem => {
                    return <PaymentItem key={cartItem._id} cartItem={cartItem} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>
                  })
                }
            </div>
        <div className="card">
            <div className="card-header bg-dark text-light">
                Ödeme: {numberFormat(totalPrice)}
            </div>
            <div className="card-body">
                <PaymentForm />
            </div>
        </div>
        
    </div>
  )
}

export default Payment