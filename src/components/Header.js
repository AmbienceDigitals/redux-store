import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import {auth, db, logout } from "../firebase";
import { useSelector } from 'react-redux';
import {cartLength} from '../features/cartSlice';
import '../App.css';

const Header = () => {
    const cartList = useSelector(cartLength);
    const history = useHistory();
    const [name, setName] = useState(localStorage.getItem('username'));
    const [user] = useAuthState(auth);
    
    const fetchUserName = async () => {
        try {
        const query = await db
            .collection("users")
            .where("uid", "==", user?.uid)
            .get();
        const data = await query.docs[0].data();
        if(localStorage.getItem('username') && localStorage.getItem('username') === name) {
            setName(data.name)
            }
        else {
        // clearing localStorage
        localStorage.clear();
        // passing name into localStorage if user exists
        localStorage.setItem('username', name);
        history.push('/cart');
        setName(data.name);
        }
    } catch (err) {
        return;
        }
    };
    const loggedOut = () => {
        logout();
        localStorage.clear();
        history.push('/login')
        setName('')
    }

    useEffect(() => {
        fetchUserName();
        if(!name) {
            setName(!name)
        }
    }, [name]);
    

    return (
        <div className='ui fixed menu'>
        <div className='ui container center'>
            <Link to ='/'>
            <h2 
            style={{marginRight: '20px'}}> Ambience Store</h2>
            </Link>
        </div>
            {user ? (
                <div className="column rp" style={{marginRight: '10px'}}>
                <div 
                className="ui vertical animated button"
                tabIndex="0"
                onClick={() =>loggedOut()}>
                <div className="hidden content">{!name  ? <i className="logout icon"/> : (name)}</div>
                <div className="visible content">
                <Link to={'/login'}>Logout</Link>
                </div>
                </div>
                </div>
            ) :    ('')}


        <div className="column rp">
            <div className="ui vertical animated button" tabIndex="0">
            {user ? (<Link to = '/cart'>
            <div className="hidden content">
                Cart
            </div>
            <div className="visible content"><i className="shop icon">{cartList}</i></div>
            </Link>) : (<Link to = '/cart'>
            <div className="hidden content">
                Cart
            </div>
            <div className="visible content"><i className="shop icon"></i></div>
            </Link>)}
            </div>
        </div>

        </div>
    )
}

export default Header
