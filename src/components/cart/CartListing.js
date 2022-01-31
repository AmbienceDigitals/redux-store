import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import CartComponent from './CartComponent';
import { useAuthState } from "react-firebase-hooks/auth";
import {auth } from "../../firebase";
import { useSelector} from 'react-redux';
import { totalPrice} from '../../features/cartSlice';


const CartListing = () =>{
    const total = useSelector(totalPrice);
    const [name, setName] = useState(localStorage.getItem('username'));
    const [refresh, setRefresh] = useState(false);
    const [mobile, setMobile] = useState(window.innerWidth <= 760);
    const history = useHistory();
    const [user] = useAuthState(auth);


    const checkOut = () => {
        history.push('/stripe')
    }

    useEffect(() => {
        setName(name)
        setRefresh(!refresh)
        window.addEventListener("resize", () => {
            const isMobile = window.innerWidth <= 760;
            if (isMobile !== mobile) setMobile(isMobile);
            }, false)
        return (() => {

        })
    }, [mobile])

    if(!user) history.push('/login')

    return (
        <div className="ui center aligned middle aligned grid">
            <div className={mobile ? "list ui center aligned middle aligned container flex" : "ui grid container"}>
                <CartComponent></CartComponent>
            </div>
            <div className="ui card">
                <div className="content">
                    <div 
                    className="header center aligned middle aligned grid"
                    style={{marginBottom: '20px'}}>
                        Total Price : ${total.toFixed(2)} 
                    </div>
                    <div className="meta">
                    <button 
                    className="ui fluid button"
                    onClick={() => checkOut()}>Check Out</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default CartListing
