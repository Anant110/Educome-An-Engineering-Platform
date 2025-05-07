import React, { createContext, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from '../Firebase/Firebase';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    profileImage: null,
  });

  const[data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    photoURL: "",
  });
  const auth = getAuth(app);

  return (
    <AuthContext.Provider value={{ user, setUser, auth, data, setData }}>
      {children}
    </AuthContext.Provider>
  );
};
