import React, { useEffect, useState } from 'react';
import './Signup.css';
import { app } from '../Firebase/Firebase';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { showUser } from '../Api/ServerApiCalls';
import { useNavigate } from 'react-router-dom'
import UserAuth from '../Api/AuthFunction_Call';

function Signup() {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    const navigate = useNavigate();

    const { handleGoogleSignIn, handleEmailSignup, EmailSignin, handleForgotPassword } = UserAuth();

//----Signup with Google----
const GoogleSignIn = () => {   
    handleGoogleSignIn();
    // navigate('/profile');
};

//-----Signup with Email and Password----
  const EmailSignup = (e) => {
    handleEmailSignup(e);
    // navigate('/profile');
}

    return (
        <div className="signup-container">
            <div className="container">
                <span className="login-welcome-text">Welcome at Educome!</span>
                <button className="button" onClick={GoogleSignIn}>
                    <img src="https://img.icons8.com/color/48/undefined/google-logo.png" alt="google logo" className="img" />
                    <p>Sign up with Google</p>
                </button>
                <p>or</p>
                <form className="forms" onSubmit={(e) => EmailSignup(e)}>
                    <input type="text" placeholder="Phone, email or username" required />
                    <input type="password" placeholder="Password..." required />
                    <div className="signUp-btn">
                        <button id="next" type="submit">Sign Up</button>
                    </div>
                </form>
                <p id="signup">Already have an account ?<Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default Signup;
