import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './styles/main.scss'
import { ProductsContextProvider } from './context/ProductContext'
import { AuthContextProvider } from './context/AuthContext'
import { CartsContextProvider } from './context/CartsContext'

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <AuthContextProvider>
        <ProductsContextProvider>
            <CartsContextProvider>
                <App/>
            </CartsContextProvider>
        </ProductsContextProvider>
    </AuthContextProvider>
);