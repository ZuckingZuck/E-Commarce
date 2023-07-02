import { CartsContext } from '../context/CartsContext'
import { useContext } from 'react'

export const useCartContext = () => {
  const context = useContext(CartsContext)

  if (!context) {
    throw Error('useCaartContext must be used inside an CartContextProvider')
  }

 
  return context
}