import React from 'react'

const OrderProduct = (props) => {
  return (
    <div className='bg-light mb-3 rounded-pill col d-flex pe-4'>
                    <img className='rounded-circle float-left' width={80} src={props.img} alt="" />
                    <div className='mt-2 ms-3 col'>
                        <h6>{props.productName}</h6>
                        <span>#127-346745</span>
                    </div>
                    <div className='mt-2 col text-center'>
                        <h6>
                            Sipariş Tarihi
                        </h6>
                        <span className='text-center'>
                            11.04.2023
                        </span> 
                    </div>
                    
                    <div className='col text-end mt-2'>
                        <h6>Sipariş Durumu</h6>
                        <span className='text-center text-warning'>
                            <i className="fa-solid fa-clock me-1"></i>
                            <span>Hazırlanıyor</span>
                        </span>
                        
                    </div>
                </div>
  )
}

export default OrderProduct