import React from 'react'

const OrderProduct = (props) => {
  return (
    <div className='bg-light mt-3 rounded-pill col d-flex pe-4'>
                    <img className='rounded-circle float-left' width={80} src={props.img} alt="" />
                    <div className='mt-2 ms-3 col'>
                        <h5>{props.productName}</h5>
                        <span>#127-346745</span>
                    </div>
                    <div className='mt-2 col text-center'>
                        <h5>
                            Sipariş Tarihi
                        </h5>
                        <span className='text-center'>
                            11.04.2023
                        </span> 
                    </div>
                    
                    <div className='col text-end mt-2'>
                        <h5>Sipariş Durumu</h5>
                        <span className='text-center'>
                            <i className="fa-solid fa-check fs-5 text-success me-2 rounded-circle"></i>
                            <span>Teslim Edildi</span>
                        </span>
                        
                    </div>
                </div>
  )
}

export default OrderProduct