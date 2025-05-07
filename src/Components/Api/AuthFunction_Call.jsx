
//Importing Firebase functions-----------------
import { app } from '../Firebase/Firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

//Imporing backend api functions----------------
import { showUser } from '../Api/ServerApiCalls';

//Importing context hooks-----------------------
import {AuthContext} from '../Context/AuthProvider';

//Importing routing functions-------------------
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const auth = getAuth();
const db = getFirestore(app);

function UserAuth() {

//Some Daa members-----------------
    const navigate = useNavigate();
    const {setUser, user} = useContext(AuthContext);
    const authContext = useContext(AuthContext);


//Load user data---------------
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);


//Signup with Google------------------------------
const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log('Google Sign-in successful:', user);
            // Store user data in Firestore
            setUserDataInFirestore(user.uid, {
                name: user.displayName,
                email: user.email
            });
             setUser(user);
            localStorage.setItem('userData', JSON.stringify(user));
             navigate('/pacifics-path');
        })
        .catch((error) => {
            console.error('Google Sign-in error:', error);
        });
};

//Signup with Email and Password------------------------
const handleEmailSignup = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Email/password Sign-up successful:', user);
            setUserDataInFirestore(user.uid, {
                email: email
            });
            setUser(user);
            localStorage.setItem('userData', JSON.stringify(user));
            navigate('/pacifics-path');
        })
        .catch((error) => {
            console.error('Email/password Sign-up error:', error);
        });
};

//Login with Email and Password--------------------
const EmailSignin = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('User logged in successfully');
            const user = userCredential.user;
            setUser(user);
            localStorage.setItem('userData', JSON.stringify(user));
            navigate('/pacifics-path');
        })
        .catch((error) => {
            console.error('Error logging in:', error);
        });
};

//Helper function to store user data in Firestore--------------------
const setUserDataInFirestore = async (userId, userData) => {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, userData);
        console.log('User data stored in Firestore successfully');
    } catch (error) {
        console.error('Error storing user data in Firestore:', error);
    }
};

//Handle Forgot Password----------------------
const handleForgotPassword = () => {
    const email = prompt('Enter your email:');
    if (email) {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent. Please check your inbox.');
            })
            .catch((error) => {
                alert(error.message);
            });
    }

};
//Logout function-----------------------
 const handleLogout = () => {
    signOut(authContext.auth)
      .then(() => {
        navigate("/pacifics-path");
        localStorage.removeItem('userData');
        // Clear user context
        authContext.setUser(null);
        console.log('User logged out successfully');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });

  };

return { handleGoogleSignIn,
    handleEmailSignup,
    EmailSignin,
    handleForgotPassword,
    handleLogout,
    setUserDataInFirestore };
}


export default UserAuth;