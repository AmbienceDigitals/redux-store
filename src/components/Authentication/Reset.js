import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../../firebase";

const Reset = () => {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();

    useEffect(() => {
        if (loading) return;
        if (user) history.replace("/cart");
    }, [user, loading]);

    return (
        <div className="ui center aligned middle aligned grid" style={{height: "100vh"}}>
            <div className="column" style={{maxWidth: "450px"}}>
                <h2 className="ui teal center aligned header">
                    Reset Your Password</h2>
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
                        
                        <button 
                        className="ui teal large fluid button"
                        onClick={() => sendPasswordResetEmail()}>Send password reset email</button>
                    </div>
                </form>
                
                <div  iv className="ui message">
                    New to us? <Link to={'/register'}>Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Reset
