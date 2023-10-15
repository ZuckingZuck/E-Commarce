import React, {useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import OrderProduct from './OrderProduct';
const Orders = (props) => {
    const { setLoadingBarProgress } = props;
    const { user } = useAuthContext();
    const [orders, setOrders] = useState([])
    useEffect(() => {
        console.log("test")
        const fetchOrders = async () => {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + '/api/cart/orders', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        })
        console.log(response)
        const json = await response.json()
        console.log(json + "bu json kardes")
        if (response.ok) {
          setOrders(json);
        }
      }
  
      if(user){
        fetchOrders()
      }
    }, [user])

  return (
    <div className='container'>
        {
            orders.map(order => {
                let tarih = new Date(order.createdAt);
                
                return (
                <div className="card">
                    <div className="card-header bg-dark text-light d-flex justify-content-between">
                        <h6>{tarih.getDate()}.{tarih.getMonth()+1}.{tarih.getFullYear()} {tarih.getHours()}:{tarih.getMinutes()} tarihli sipariş</h6>
                        <h6 className='text-warning'>Sipariş durumu: {order.status}</h6>
                    </div>
                    
                    <div className=''>
                        {
                            order.Products.map(data=> {
                                return(
                                    <OrderProduct img={data.product.productImage} productName={data.product.productName} price={data.product.price} category={data.product.topCategory + "/" + data.product.subCategory} star="3"/>
                                )

                            })
                        }
                    </div>
                </div>
                )
            })
        }
    </div>
  )
}



export default Orders