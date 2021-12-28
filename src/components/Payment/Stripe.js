import React, {useState} from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from './Checkout';

const Stripe = () => {
    const Api_Key = process.env.REACT_APP_API_KEY;
    const [stripePromise, setStripePromise] = useState(() => loadStripe(
        Api_Key 
    ));

    return ( 
        <Elements stripe={stripePromise}>
            {Api_Key}
            <Checkout></Checkout>
        </Elements>
    )
}

export default Stripe
