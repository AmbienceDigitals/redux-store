import React, {useState} from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from './Checkout';

const Api_Key = process.env.REACT_APP_API_KEY;
const stripePromise =loadStripe(
    Api_Key 
);

const Stripe = () => {
    return ( 
        <Elements stripe={stripePromise}>
            <Checkout/>
        </Elements>
    )
}

export default Stripe
