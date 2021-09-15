import React, {useEffect, useState} from 'react'
import CartComponent from './CartComponent';

const CartListing = () =>{
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        setRefresh(!refresh)
    }, [refresh])
    return (
        <div className='ui grid container'>
            <CartComponent></CartComponent>
        </div>
    )
}

export default CartListing
