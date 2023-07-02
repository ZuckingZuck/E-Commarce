import { createContext, useReducer } from 'react'

export const CartsContext = createContext()

export const cartsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_CART': 
      return {
        carts: action.payload
      }
    case 'ADD_TOCART':
      return {
        carts: action.payload
      }
      case 'UPDATE_CART':
        return {
          ...state,
          carts: state.carts.map((c) => {
            if (c._id === action.payload._id) {
              return {
                ...c,
                quantity: action.payload.quantity
              };
            }
            return c;
          })
        }
    case 'DELETE_FROMCART':
      return {
        carts: state.carts.filter((c) => c._id !== action.payload._id)
      }
    case 'DELETE_ALL':
      return{
        carts: []
      }
    default:
      return state
  }
}

export const CartsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartsReducer, {
      carts: null
    })
  
    return (
      <CartsContext.Provider value={{...state, dispatch}}>
        { children }
      </CartsContext.Provider>
    )
}