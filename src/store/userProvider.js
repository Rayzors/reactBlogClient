import React, { useState, createContext } from 'react';
import jwt_decode from 'jwt-decode';
import UserService from '../services/User.service';
import { Redirect } from 'react-router-dom';

export const UserContext = createContext({});

function UserProvider(props) {
  let myHeaders = new Headers();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  async function register(data) {
    const { user, error } = await UserService.register(data);
    if (user) return <Redirect to="/login" />;
    return error;
  }

  async function login(data) {
    const { token, error } = await UserService.login(data);
    if (error) return error;
    localStorage.setItem('token', token);
    if (token) {
      myHeaders.append('auth-token', token);
    } else {
      myHeaders.delete('auth-token');
    }
    const decoded = jwt_decode(token);
    setUser(decoded);
    setIsAuthenticated(true);
  }

  return (
    <UserContext.Provider value={{ isAuthenticated, user, register, login }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
