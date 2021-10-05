import React from "react";
import { useSelector,useDispatch } from 'react-redux';
import {cart, removeFromCart} from '../../features/cartSlice';

import '../../App.css'

const CartComponent = () => {
    const storeCart = useSelector(cart);
    const dispatch = useDispatch();

    const cartList = storeCart.map((product) => {
        const {uniqueId, title, image, price, category} = product
        return (
            <div className='four wide column' key={uniqueId}>
                <div className='ui link cards'>
                <div className='card'>
                    <div className='image'>
                        <img src={image} alt={title}></img>
                    </div>
                    <div className='content'>
                        <div className='header'>{title} </div>
                        <div className='meta price'>$ {price}</div>
                        <div className='meta'> {category}</div>
                    </div>
                    <div className="ui vertical animated button" tabIndex="0" onClick={() => dispatch(removeFromCart(product))}>
                        <div className="hidden content">
                            <i className="shop icon"></i>
                        </div>
                        <div className="visible content">Remove From Cart</div>
                    </div>
                </div>
            </div>
            
            </div>
        )
    })
    return (
        <>{storeCart.length === 0 ? (
            <div className='list'>
                <h1>Your cart is empty</h1>
            </div>
        ): (
            cartList
        )}</>
    )

}

export default CartComponent
