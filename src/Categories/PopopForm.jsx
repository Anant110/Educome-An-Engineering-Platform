import React, { useState, useContext } from 'react';
import './PopopForm.css';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../Components/Firebase/Firebase';
import { AuthContext } from '../Components/Context/AuthProvider';

function PopupForm({ onClose, category }) {
    const db = getFirestore(app);

    const { setUser, user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        number: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        console.log('Category:', category); // Log the category variable

        try {
            // Reference the collection using the category variable
            const docRef = await addDoc(collection(db, `${category}/user-data/${formData.firstName}`), formData);
            console.log('User data stored in Firestore successfully with ID:', docRef.id);
        } catch (error) {
            console.error('Error storing user data in Firestore:', error);
        }

        // Clear form data and close popup
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            number: ''
        });
        onClose();
    };

    return (
        <div className="popup-form">
            <div className="popup-form-inner">
                <button className="close-btn" onClick={onClose}>×</button>
                <form className="form" onSubmit={handleSubmit}>
            <div><p className="title">Register</p>
            <p className="message">Signup now and get full access to our app.</p></div>
            <div className="flex">
                <label>
                    <input
                        className="input"
                        type="text"
                        placeholder=""
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                    <span>Firstname</span>
                </label>

                <label>
                    <input
                        className="input"
                        type="text"
                        placeholder=""
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                    <span>Lastname</span>
                </label>
            </div>

            <label>
                <input
                    className="input"
                    type="email"
                    placeholder=""
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <span>Email</span>
            </label>

            <label>
                <input
                    className="input"
                    type="number"
                    placeholder=""
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                />
                <span>Number</span>
            </label>

            <button className="submit" type="submit">Submit</button>
            </form>

            </div>
        </div>
    );
}

export default PopupForm;
