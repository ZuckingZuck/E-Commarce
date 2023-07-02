import { createContext, useReducer, useEffect, useState } from 'react'

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {user: action.payload}
        case "LOGOUT":
            return {user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [userControl, setUserControl] = useState(false);
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    })

    
    useEffect(() => {
        setUserControl(true);
        const user = localStorage.getItem('user');
        if (!user){
            return
        }
        const lsUser = JSON.parse(user);
        dispatch({type: "LOGIN", payload: lsUser});
        
    }, [])

    console.log("Auth context state: ", state);

    return(
        <AuthContext.Provider value={{...state, dispatch, userControl}}>
            { children }
        </AuthContext.Provider>
    )
}