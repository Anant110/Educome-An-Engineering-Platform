import React, { useEffect, useState } from 'react';
import './Login.css';
import { app } from '../Firebase/Firebase';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, sendPasswordResetEmail } from 'firebase/auth';
import UserAuth from '../Api/AuthFunction_Call';

const auth = getAuth();

function Login() {
    const [error, setError] = useState("");
      const { handleGoogleSignIn, handleEmailSignup, EmailSignin, handleForgotPassword } = UserAuth();

//----Login with Google----
    const GoogleSignIn = () => {
        handleGoogleSignIn();
    };

//-----Login with Email and Password----
    const EmailLogin = async (e) => {
      EmailSignin(e);
    }

//-----Forgot Password----
    const ForgotPassword = () => {
        handleForgotPassword();
    }

    return (
        <div className="signup-container">
            <div className="container">
                <span className='login-welcome-text'>Welcome Back !</span>
                <button className="button" onClick={GoogleSignIn}>
                    <img src="https://img.icons8.com/color/48/undefined/google-logo.png" alt="google logo" className="img" />
                    <p>Sign in with Google</p>
                </button>
                <p>or</p>
                <form className="forms" onSubmit={(e) => EmailLogin(e)}>
                    <input type="text" name="email" placeholder="Phone, email or username" required />
                    <input type="password" name="password" placeholder="Password..." required />
                    {error && <p className="error-message">{error}</p>}
                    <div className="signUp-btn">
                        <button id="next" type="submit">Login</button>
                        <span>or</span>
                        <button id="forgot" type="submit" value="Forgot Password ?" onClick={ForgotPassword}>Forgot Password</button>
                    </div>
                </form>
                <p id="signup">Haven't signed up yet ?<Link to="/signup">SignUp</Link></p>
            </div>
        </div>
    );
}

export default Login;
