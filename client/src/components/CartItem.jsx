import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useCartContext } from '../hooks/useCartContext';
import { useAuthContext } from '../hooks/useAuthContext';

import { FaCheckCircle } from 'react-icons/fa';

const CartItem = (props) => {
    const [selectedOption, setSelectedOption] = useState("");
    const { cartItem } = props;
    const [product, setProduct] = useState({});
    const { dispatch } = useCartContext();
    const { user } = useAuthContext();

    useEffect(()=>{
        setSelectedOption(cartItem.quantity);

        const getProduct = async () => {
           const response = await fetch(process.env.REACT_APP_SERVER_URL + `${cartItem.ProductId}`);
            const json = await response.json();
           if(response.ok){
            setProduct(json)
           }
        }

        getProduct();
    }, [cartItem.quantity, cartItem.ProductId])
    
    const handleChange = async(event) => {
        const value = event.target.value;
        setSelectedOption(value);
        const id = cartItem._id;
        const response = await fetch(process.env.REACT_APP_SERVER_URL + '/api/cart/update', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, value})
        })

        const updatedItem = {_id: cartItem._id, quantity: value};
        if(response.ok){
            dispatch({type: "UPDATE_CART", payload: updatedItem})
        }
        
        
    };

    const handleDelete = async(e) => {
        const id = cartItem._id;
        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/api/cart/delete`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        });

        const CustomIcon = () => <FaCheckCircle className="text-info" />;

        const json = await response.json();
        console.log(json);
        if(response.ok){
            dispatch({type: "DELETE_FROMCART", payload: json})
            toast.success('Ürün sepetinizden kaldırıldı!', {
                position: toast.POSITION.TOP_CENTER,
                theme: 'dark',
                progressClassName: 'bg-info',
                icon: <CustomIcon />
            });
        }
    }

    const options = [];

    const numberFormat = (value) =>
    new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
    }).format(value);

    for(let i = 1; i <= product.stock; i++){
        options.push(<option key={i} value={i}>{i}</option>)
    }

  return (
    <div className="card">
        <div className="card-header d-flex justify-content-between">
            <div style={{fontSize: 'small'}} className='card-title'>#{cartItem._id.slice(13)}</div>
            <div className='card-title'>{product.productName}</div>
            <div className="buttons">
                <button className='me-1 btn btn-sm btn-secondary text-light'>
                    <i className="fas fa-bookmark"></i>
                </button>
                <button className='btn btn-sm btn-danger' onClick={handleDelete}>
                    <i className="fas fa-trash"></i>
                </button>
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
            <div className='process mt-4'>
                <select className="form-control" value={selectedOption} onChange={handleChange}>
                    {options}
                </select>
            </div>
        </div>
        <div className="card-footer">
            Toplam Fiyat: {selectedOption ? numberFormat(product.price * parseInt(selectedOption)) : numberFormat(product.price)}
        </div>
    </div>
  )
}

export default CartItem