import React from 'react'
import Product from '../components/Product'

import { useEffect }from 'react'
import { useProductsContext } from "../hooks/useProductsContext"

const Home = (props) => {
  const { products, dispatch } = useProductsContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products/',{
      });

      const json = await response.json();
      if(response.ok){
        dispatch({type: "SET_PRODUCTS", payload: json})
      }
    } 
    fetchProducts();
  }, [dispatch])

  
  return (
    <div className="container p-0">
        <div className='row'>
          {products &&
            products.products.map((product, index) => {
              return(
                <Product 
                  setCartLength={props.setCartLength}
                  key={product._id} 
                  product={product}
                />
              )
              
            })
          }         
        </div> 
    </div>
  )
}

export default Home