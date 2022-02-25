import React, {useState} from 'react';
import logo from "../images/logo2.svg"
import SignIn from "./SignIn"
import Login from './Login';

function Auth() {

    const [isSignIn, setIsSignIn] = useState(false);

    const toLogin = () => {
        setIsSignIn(!isSignIn)
    }

    const state = isSignIn ? (<Login toLogin={toLogin}/>) : <SignIn toLogin={toLogin}/>

    return (


        <div className='auth-container'>
            <img src={logo} alt="" />
            {
                state
            }
        </div>
        
    )
}

export default Auth