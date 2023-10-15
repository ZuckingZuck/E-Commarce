import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useCartContext } from '../hooks/useCartContext';
import { useAuthContext } from '../hooks/useAuthContext';

import { FaCheckCircle } from 'react-icons/fa';

const CartItem = (props) => {
    const [selectedOption, setSelectedOption] = useState("");
    const { cartItem, totalPrice, setTotalPrice} = props;
    const [product, setProduct] = useState({});
    const { dispatch } = useCartContext();
    const { user } = useAuthContext();

    useEffect(()=>{
        setSelectedOption(cartItem.quantity);

        const getProduct = async () => {
           const response = await fetch(process.env.REACT_APP_SERVER_URL + `/api/products/${cartItem.ProductId}`);
            const json = await response.json();
            setTotalPrice((prevtotalPrice) => prevtotalPrice + (parseInt(json.price) * cartItem.quantity))
           if(response.ok){
            setProduct(json)
           }
        }

        getProduct();
    }, [cartItem.quantity, cartItem.ProductId])

    console.log(product)
    const numberFormat = (value) =>
    new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
    }).format(value);

  return (
    <div className="card">
        <div className="card-header d-flex justify-content-between">
            <div style={{fontSize: 'small'}} className='card-title'>#{cartItem._id.slice(13)}</div>
            <div className='card-title'>{product.productName}</div>
            <div>
                Adet: {selectedOption}
            </div>
        </div>
        <div className="card-body d-flex">
            <img width={100} className='rounded-start' src={product.productImage} alt="" />
            <div className='count-group flex-grow-1'>
                <div>
                    <span className='text-warning'>{product.topCategory}/{product.subCategory}</span>
                </div>
                <div className='my-1'>
                    <span className='bg-success text-light p-1 rounded'>
                        Stokta var<i className="ms-1 fs-6 fas fa-check"></i>
                    </span>
                </div>
                <div className='my-2'>
                    <span className='p-1 text-light bg-primary rounded'>
                        Ücretsiz kargo <i className="fas fa-shipping-fast"></i>
                    </span>
                </div>
            </div>
        </div>
        <div className="card-footer">
            Toplam Fiyat: {selectedOption ? numberFormat(product.price * parseInt(selectedOption)) : numberFormat(product.price)}
        </div>
    </div>
  )
}

export default CartItem