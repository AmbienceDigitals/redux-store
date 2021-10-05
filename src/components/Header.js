import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import {auth, db, logout } from "../firebase";
import '../App.css';
import Login from './Authentication/Login';

const Header = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [user] = useAuthState(auth);
    
    const fetchUserName = async () => {
        try {
        const query = await db
            .collection("users")
            .where("uid", "==", user?.uid)
            .get();
        const data = await query.docs[0].data();
        if(localStorage.getItem('username') && localStorage.getItem('username') === name) {
            console.log(name)
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
        console.error(err);
        alert("An error occurred while fetching user data");
        }
    };
    const loggedOut = () => {
        logout();
        history.push('/login')
        setName('')
    }

    useEffect(() => {
        fetchUserName();
        if(name) {
            setName(name)
        }
    }, []);
    
    if (loggedOut)  history.replace('/login')

    return (
        <div className='ui fixed menu'>
        <div className='ui container center'>
            <Link to ='/'>
            <h2> Ambience Store</h2>
            </Link>
        </div>
            {user ? (
                <div className="column rp" style={{marginRight: '20px'}}>
                <div 
                className="ui vertical animated button"
                tabIndex="0"
                onClick={() =>loggedOut()}>
                <div className="hidden content"><i className="logout icon"/></div>
                <div className="visible content">
                <Link to={'/login'}>Logout</Link>
                </div>
                </div>
                </div>
            ) :    ('')}

        <div className="column rp" style={{marginRight: '20px'}}>
            <div className="ui vertical  button">
            <Link to = '/login'>
            <div className="visible content">
                {!name ? ("Login") : (name)}
            </div>
            </Link>
            </div>
        </div>


        <div className="column rp">
            <div className="ui vertical animated button" tabIndex="0">
            {user ? (<Link to = '/cart'>
            <div className="hidden content">
                Cart
            </div>
            <div className="visible content"><i className="shop icon"></i></div>
            </Link>) : 
            (<Link to = '/login'>
            <div className="hidden content">
                Cart
            </div>
            <div className="visible content"><i className="shop icon"></i></div>
            </Link>
            )}
            </div>
        </div>

        </div>
    )
}

export default Header
