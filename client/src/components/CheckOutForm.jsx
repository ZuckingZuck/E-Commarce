import React, { useState, useEffect } from 'react';
import { useCartContext } from '../hooks/useCartContext';
import { useNavigate } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthContext } from '../hooks/useAuthContext';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51MxaYkJH6v2VqZATbT9eXDqK9xvQD9T7LXRc5dvk6eLVaTSGSsi8nu17ndZoNPJq8RxRKKE50jaWdIDZKvMGY2BH00tXk9uzcd');

const CheckoutForm = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext();
  const stripe = useStripe();
  const elements = useElements();
  const { dispatch } = useCartContext();
  const [loading, setLoading] = useState(false);
  const [cardHoldersName, setCardHoldersName] = useState("");
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSucceeded(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [succeeded]);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    // Stripe Elements'dan kart bilgilerini alın
    const cardElement = elements.getElement(CardElement);
  
    // Kart bilgilerini doğrulayın
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: cardHoldersName,
      },
    });
  
    if (error) {
      // Kart bilgileri doğrulanamadıysa hata mesajını gösterin
      setError(error.message);
      setLoading(false);
      return;
    }
  
    // Kart bilgileri doğrulandıysa ödeme işlemini gerçekleştirin
    const { clientSecret } = await fetch('./api/cart/pay', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id, // Doğrulanan kart bilgilerini kullanın
    });
  
    if (result.error) {
      setError(result.error.message);
      setSucceeded(false);
    } else {
      setError(null);
      setSucceeded(true);
      clearForm();
      dispatch({ type: 'DELETE_ALL' });
      setTimeout(() => {
        navigate('/profil');
      }, 2000);
    }
  
    setLoading(false);
  };
  
    const clearForm = () => {
        elements.getElement(CardElement).clear();
        setCardHoldersName('');
      };
 


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mt-1">
      <div className="form-group">
        <label htmlFor="cardholderName">Kart Sahinin Adı:</label>
        <input
          type="text"
          id="cardholderName"
          className="form-control"
          value={cardHoldersName}
          onChange={(e) => setCardHoldersName(e.target.value)}
          required
        />
      </div>
        <label htmlFor="cardDetails">Kart Detayları:</label>
        <CardElement
          id="cardDetails"
          className="form-control"
          options={{
            style: {
              base: {
                fontSize: '16px',
              },
            },
          }}
        />
      </div>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {succeeded && <div className="alert alert-success mt-2">Ödeme başarılı!</div>}
      <button type="submit" className="btn btn-primary float-end w-100 mt-2" disabled={!stripe || loading}>
        {loading ? 'Bekleniyor...' : 'Öde'}
      </button>
    </form>
  );
};

const PaymentForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentForm;
