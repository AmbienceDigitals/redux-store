import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import CartComponent from './CartComponent';
import { useAuthState } from "react-firebase-hooks/auth";
import {auth } from "../../firebase";
import { useSelector } from 'react-redux';
import {cart} from '../../features/cartSlice';

const CartListing = () =>{
    const storeCart = useSelector(cart);
    const [name, setName] = useState(localStorage.getItem('username'))
    const [refresh, setRefresh] = useState(false);
    const [totalPrice] = useState(0);
    const history = useHistory();
    const [user] = useAuthState(auth);

    const total = storeCart.reduce((accumulator, current) => accumulator + current.price, totalPrice);

    useEffect(() => {
        setName(name)
        setRefresh(!refresh)
    }, [])

    if(!user) history.push('/login')

    return (
        <div className='ui grid container'>
            <div className="ui grid container">
                <CartComponent></CartComponent>
            </div>
            <div className='ui message'>
                Total Price : #{total}
                <div>
                    <button>Check Out</button>
                </div>
            </div>
        </div>
    )
}

export default CartListing
