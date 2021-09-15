import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {cart, removeFromCart} from '../../features/cartSlice';

const CartComponent = () => {
    const storeCart = useSelector(cart);
    const dispatch = useDispatch();

return  (
    storeCart.map((product) => {
        const {uniqueId, title, image, price, category} = product
    
        const removeProductFromCart = () => {
            dispatch(removeFromCart(product))
        }
        
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
                <div className="ui vertical animated button" tabIndex="0" onClick={() => removeProductFromCart()}>
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
)

}

export default CartComponent
