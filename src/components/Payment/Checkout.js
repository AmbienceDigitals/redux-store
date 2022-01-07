import React from 'react';
import { CardNumberElement, CardExpiryElement, CardElement,
    CardCvcElement, useStripe, useElements,} from "@stripe/react-stripe-js";
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { totalPrice, clearCart} from '../../features/cartSlice';


const Checkout = () => {

    const history = useHistory();
    const total = useSelector(totalPrice);
    const clear = useSelector(clearCart);
    const dispatch = useDispatch()
    const stripe = useStripe();
    const elements = useElements();

    const name = localStorage.getItem('username')

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (elements == null) {
            return
          }
          
          const res = await stripe.createPaymentMethod({
              type: 'card',
              card: elements.getElement(CardNumberElement, CardExpiryElement, CardCvcElement)
          })

        //   confirmParams: {
        //       return_url: history.goBack()
        //   }
        if (res.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(res.error.message);
          } else {
            console.log(res)
          }
    }

    const Payout = () => {
        dispatch(clear);
        history.go("/")
    }

    return (
        <div className="ui center aligned middle aligned grid" style={{height: "100vh"}}>
            <div className="column" style={{maxWidth: "450px"}}>
                <h2 className="ui teal center aligned header"> Make Payment</h2>

                <form
                onSubmit={(e) => handleSubmit(e)}
                className="ui large form">
                    <div className="ui stacked segment">
                        <div className="field">
                            <label> 
                                Card Details        
                                <CardNumberElement/>
                            </label>
                            
                            <div className="ui fluid right icon input"> 
                                <i aria-hidden="true" className="credit card icon"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div className="ui stacked segment">
                        <div className="field">
                            <label>
                                Expiration Date
                                <CardExpiryElement/>
                            </label>
                            
                            <div className="ui fluid right icon input"> 
                                <i aria-hidden="true" className="credit card icon"></i>
                            </div>
                        </div>
                    </div>

                    <div className="ui stacked segment">
                        <div className="field">
                            <label>
                                Card CVC
                                <CardCvcElement/>
                            </label>
                            <div className="ui fluid right icon input"> 
                                <i aria-hidden="true" className="credit card icon"></i>
                            </div>
                        </div>
                    </div>

                    <button 
                    style={{marginTop: '20px'}}
                    type='submit'
                    disabled={!stripe || !elements}
                    className="ui teal large fluid button"
                    >{`$${total.toFixed(2)}`}</button>

                </form>
                
        </div>
        </div>
    )
}

export default Checkout
