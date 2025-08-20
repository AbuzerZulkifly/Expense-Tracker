import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();
export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clear user data on logout
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;