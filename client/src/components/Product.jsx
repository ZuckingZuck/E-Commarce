import React from 'react'
import { useCartContext } from '../hooks/useCartContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { FaCheckCircle } from 'react-icons/fa';

const Product = (props) => {
    const navigate = useNavigate();
    const divs = [];
    const { product } = props;
    const { user } = useAuthContext();
    const { dispatch } = useCartContext();
    const handleClick = async (e) => {

        if(!user){
            navigate('/login');
        }

        const response = await fetch('/api/cart/addtocart', {
            method: 'POST',
            body: JSON.stringify({'ProductId': product._id}),
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }, 
            
        })

        const handleNotifClick = () => {
            navigate('/sepet');
        }

        const CustomIcon = () => <FaCheckCircle className="text-info" />;

        const json = await response.json();

        if(response.ok){
            dispatch({type: 'ADD_TOCART', payload: json})
            toast.success('Ürün sepetinize eklendi!', {
                position: toast.POSITION.TOP_CENTER,
                theme: 'dark',
                onClick: handleNotifClick,
                progressClassName: 'bg-info',
                icon: <CustomIcon />
            });
        }

        
    }

    const numberFormat = (value) =>
    new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
    }).format(value);

    for(let i = 0; i < product.star; i++){
        divs.push(<i key={i} className="fa-solid fa-star"></i>)
    }

  return (
    <div className='my-3 col-lg-4 col-xl-3 col-md-6'>
    <div className="d-flex justify-content-center">
        <figure className="card card-product-grid card-md">
            <div className="img-wrap" data-abc="true">
                <img className='card-img-top' src={product.productImage} alt="product"/>
                <div className="rating text-info mt-1">
                    {divs}<p className='text-start'style={{fontSize: 'small'}}>(25)</p>
                </div>

            </div>
            <figcaption className="info-wrap">
            <div className="row">
                <div className="col text-center">
                    <a href='/' className="title" data-abc="true">
                        { product.productName }
                    </a>
                    <span className="rated">{product.topCategory}/{product.subCategory}</span>
                </div>
            </div>
                <div className="save mt-2">
                    <button onClick={handleClick} className="btn text-light btn-info btn-sm float-right" data-abc="true">
                        <i className="fa-solid fa-basket-shopping"></i>
                    </button>
                </div>
                <div className='text-center text-info'>
                    { numberFormat(product.price)}
                </div>
            </figcaption>
        </figure>
    </div>
    </div>
    );
}

export default Product