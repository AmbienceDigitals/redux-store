import React, {useState} from 'react';
import { CardNumberElement, CardExpiryElement,
    CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { totalPrice, clearCart} from '../../features/cartSlice';

const Checkout = () => {
    const history = useHistory();
    const total = useSelector(totalPrice);
    const [isPaymentLoading, setPaymentLoading] = useState(false);
    const dispatch = useDispatch()
    const stripe = useStripe();
    const elements = useElements();

    const name = localStorage.getItem('username')

    const payOut = () => {
        dispatch(clearCart())
        history.push('/stripe')
    }

    const payMoney = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
    }
    setPaymentLoading(true);
    // const clientSecret = getClientSecret();
    const paymentResult = await stripe.confirmCardPayment("{PAYMENT_INTENT_CLIENT_SECRET}", {
        payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
                name: name
            }
        },
    });
    setPaymentLoading(false);
    if (paymentResult.error) {
        alert(paymentResult.error.message);
    } 
    else {
        if (paymentResult.paymentIntent.status === "succeeded") {
            alert("Success!");
        }
        }
    };


    return (
            <div className="ui center aligned middle aligned grid" style={{height: "100vh"}}>
            <div className="column" style={{maxWidth: "450px"}}>
                <h2 className="ui teal center aligned header"> Make Payment</h2>

                <form
                onSubmit={payMoney}
                className="ui large form">
                    <div className="ui stacked segment">
                        <div className="field">
                            <CardNumberElement/>
                            <div className="ui fluid right icon input"> 
                                <i aria-hidden="true" className="credit card icon"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div className="ui stacked segment">
                        <div className="field">
                            <CardExpiryElement/>
                            <div className="ui fluid right icon input"> 
                                <i aria-hidden="true" className="credit card icon"></i>
                            </div>
                        </div>
                    </div>

                    <div className="ui stacked segment">
                        <div className="field">
                            <CardCvcElement/>
                            <div className="ui fluid right icon input"> 
                                <i aria-hidden="true" className="credit card icon"></i>
                            </div>
                        </div>
                    </div>
                </form>

                <button 
                    style={{marginTop: '20px'}}
                    disabled={isPaymentLoading}
                    type='submit'
                    className="ui teal large fluid button"
                    onClick={() => payOut()}>{isPaymentLoading ? "Loading..." : `Pay $ ${total.toFixed(2)}`}</button>
                
        </div>
        </div>
    )
}

export default Checkout
