import React from 'react'
import OrderProduct from './OrderProduct'
const Orders = () => {
  return (
    <div className='container'>
        <div className="row ms-1">
            <div style={{height: "180px"}} className='menu col-md-2 mt-3 bg-light rounded text-center pt-3'>
                <ul className='menu-list fs-4 p-auto'>
                    <li className='border-bottom bg-secondary rounded'>
                        <a href="/" className='btn btn-secondary btn-lg'>
                           Aktif Siparişler 
                        </a>
                    </li>
                    <li className='border-bottom bg-secondary rounded'>
                        <a href="/" className='btn btn-secondary btn-lg'>
                           Teslim Edilen 
                        </a>
                    </li>
                    <li className='bg-secondary rounded'>
                        <a href="/" className='btn btn-secondary btn-lg'>
                           İadeler
                        </a>
                    </li>
                </ul>
            </div>
            <div className='products col-md-10 text-secondary'>
                <OrderProduct img="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MME73?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1632861342000" productName="AirPods Pro" price="120" category="Kulaklık" star="3"/>
                <OrderProduct img="https://cdn.vatanbilgisayar.com/Upload/PRODUCT/samsung/thumb/137192-1_large.jpg" productName="Samsung S23" price="1000" category="Telefon" star="4"/>
                <OrderProduct img="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MKUU3_VW_PF+watch-45-alum-starlight-nc-8s_VW_PF_WF_CO_GEO_TR?wid=1400&hei=1400&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171096000%2C1661970455486" productName="Apple Watch" price="1250" category="Saat" star="5"/>
                <OrderProduct img="https://market.samm.com/arduino-nano-every-headers-orijinal-arduino-modelleri-arduino-3798-13-B.jpg" productName="Arduino Nano" price="35" category="Elektronik" star="3"/>
            </div> 
        </div>
        
        
    </div>
  )
}



export default Orders