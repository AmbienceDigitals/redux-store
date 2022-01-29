import React, {useState} from 'react';
import { CardNumberElement, CardExpiryElement,
        CardCvcElement, useStripe, useElements,} from "@stripe/react-stripe-js";
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { totalPrice, clearCart} from '../../features/cartSlice';
import alertify from 'alertify.js';
import 'alertify.js/dist/css/alertify.css';

const initialValues = {
    name: "",
    email: "",
    address: {},
}

const Checkout = () => {
    const [values, setValues] = useState(initialValues);
    const history = useHistory();
    const total = useSelector(totalPrice);
    const clear = useSelector(clearCart);
    const dispatch = useDispatch()
    const stripe = useStripe();
    const elements = useElements();

    const handleOnchange = (e) => {
        const {name, value} = e.target;
        setValues({...values,
            [name]: value
        })
    }

    console.log(values);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const onSuccess = () => {
            dispatch(clear);
             history.push("/");
        };

        if (elements == null) {
            return
          }
          
        const res = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardNumberElement, CardExpiryElement, CardCvcElement),
            billing_details: {
                address: {line1: values.address},
                email: values.email,
                name: values.name
            }
        })

        if (res.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(res.error.message);
            alertify.error(`Your transaction was not successful due to "${res.error.message}" error`)
        } else {
              console.log(res)
                alertify.success(`You have successfully paid $${total.toFixed(2)}
                                You are now being redirected to the landing page`)
                setTimeout(onSuccess, 1000)
                
        }
         
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
                                Name        
                                <input type="text" 
                                name="name"
                                value={values.name}
                                onChange={handleOnchange} />
                            </label>
                            
                            <div className="ui fluid right icon input"> 
                                <i aria-hidden="true" className="user icon"></i>
                            </div>
                        </div>
                    </div>

                    <div className="ui stacked segment">
                        <div className="field">
                            <label> 
                                Email        
                                <input type="email" 
                                name="email"
                                value={values.email}
                                onChange={handleOnchange} />
                            </label>
                            
                            <div className="ui fluid right icon input"> 
                                <i aria-hidden="true" className="envelope icon"></i>
                            </div>
                        </div>
                    </div>

                    <div className="ui stacked segment">
                        <div className="field">
                            <label> 
                                Address        
                            </label>
                            <input type="text" 
                            name="address"
                            value={values.address}
                            onChange={handleOnchange} />
                            
                            <div className="ui fluid right icon input"> 
                                <i aria-hidden="true" className="home icon"></i>
                            </div>
                        </div>
                    </div>

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
                    className="ui teal large fluid button">{`$${total.toFixed(2)}`}</button>

                </form>
                
        </div>
        </div>
    )
}

export default Checkout
