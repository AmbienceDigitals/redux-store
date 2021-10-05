import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import {Link, useHistory} from 'react-router-dom';
import {auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "../../firebase";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();

    const register = async (e) => {
        e.preventDefault();
        try {
            if (!name){ 
                alert("Please enter name")
            } 
            else if (confirmPassword !== password) {
                alert("ensure that your password match")
            }
            else {
                registerWithEmailAndPassword(name, email, password);
            }
        } catch (err) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (loading) return;
        if (user) history.push("/cart");
    }, [user, loading]);
    
    return (
        <div className="ui center aligned middle aligned grid" style={{height: "100vh"}}>
            <div className="column" style={{maxWidth: "450px"}}>
                <h2 className="ui teal center aligned header">
                    Register your account</h2>
                <form
                className="ui large form"
                onSubmit={register}>
                    <div className="ui stacked segment">
                        <div className="field">
                            <label>Name</label>
                            <div className="ui fluid left icon input">
                                <input 
                                placeholder="Name" 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}/>
                                <i aria-hidden="true" className="user icon"></i>
                            </div>
                        </div>

                        <div className="field">
                            <label>Email</label>
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
                            <label>Password</label>
                            <div className="ui fluid left icon input">
                                <input 
                                placeholder="Password" 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                                <i aria-hidden="true" className="lock icon"></i>
                            </div>
                        </div>

                        <div className="field">
                            <label>Confirm Password</label>
                            <div className="ui fluid left icon input">
                                <input 
                                placeholder="Confirm Password" 
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}/>
                                <i aria-hidden="true" className="lock icon"></i>
                            </div>
                        </div>
                        
                        <button 
                        className="ui teal large fluid button"
                        >Register</button>
                    </div>
                </form>

                <div>
                <button 
                        className="ui large fluid button"
                        style={{marginTop: '20px'}}
                        onClick={() =>signInWithGoogle()}>Register With Google</button>
                </div>
                
                <div  className="ui message">
                    Already have an account? <Link to={'/login'}>login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register
