import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import CartComponent from './CartComponent';

const CartListing = () =>{
    const [name, setName] = useState(localStorage.getItem('username'))
    const [refresh, setRefresh] = useState(false)
    const history = useHistory();

    useEffect(() => {
        if(!name) {
            setName(!name)
            history.push('/login')
        }
        setRefresh(!refresh)
    }, [])


    return (
        <div className='ui grid container'>
            <CartComponent></CartComponent>
        </div>
    )
}

export default CartListing
