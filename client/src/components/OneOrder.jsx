import React from 'react'

const OneOrder = (props) => {
    const { orders } = props;
  return (
    <div className='products col-md-10 text-secondary'>
        {
            orders.map(order => {

            })
        }
    </div>
  )
}

export default OneOrder