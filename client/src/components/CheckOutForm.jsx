import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51MxaYkJH6v2VqZATbT9eXDqK9xvQD9T7LXRc5dvk6eLVaTSGSsi8nu17ndZoNPJq8RxRKKE50jaWdIDZKvMGY2BH00tXk9uzcd');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
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
   
    const { clientSecret } = await fetch('https://eticaretbackend.azurewebsites.net/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: 1099 // 10.99 USD
      })
    }).then((res) => res.json());

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: cardHoldersName
        }
      }
    });

    if (result.error) {
      setError(result.error.message);
      setSucceeded(false);
      setLoading(false);
    } else {
      setError(null);
      setSucceeded(true);
      clearForm();
      setLoading(false);
    }

    
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
