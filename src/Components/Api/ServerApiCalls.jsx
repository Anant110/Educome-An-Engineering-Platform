// Signup.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
})

export const showUser = (user) => {
    return apiClient.post('/sign-up', user);
}
