import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth, 
    signInWithEmailAndPassword, 
    signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import '../App.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();
    
    useEffect (() => {
        if (loading) {
            <h2>...Loading</h2>
        return;
        }
        if (user) history.replace("/cart");
    }, [user, loading]);

    return (
        <div className="ui center aligned middle aligned grid" style={{height: "100vh"}}>
            <div className="column" style={{maxWidth: "450px"}}>
                <h2 className="ui teal center aligned header">
                    Log-in to your account</h2>
                <form className="ui large form">
                    <div className="ui stacked segment">
                        <div className="field">
                            <div className="ui fluid left icon input">
                                <input 
                                placeholder="E-mail address" 
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                                <i aria-hidden="true" className="user icon"></i>
                            </div>
                        </div>

                        <div className="field">
                            <div className="ui fluid left icon input">
                                <input 
                                placeholder="Password" 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                                <i aria-hidden="true" className="lock icon"></i>
                            </div>
                        </div>
                        
                        <button 
                        className="ui teal large fluid button"
                        onClick={() => signInWithEmailAndPassword(email, password)}>Login</button>
                        <button 
                        className="ui large fluid button"
                        style={{marginTop: '20px'}}
                        onClick={() =>signInWithGoogle()}>Login With Google</button>
                    </div>
                </form>
                
                <div  iv className="ui message">
                    New to us? <Link to={'/register'}>Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
