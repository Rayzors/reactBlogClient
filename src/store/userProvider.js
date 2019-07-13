import React, { useState, useEffect, createContext } from 'react';
import jwt_decode from 'jwt-decode';
import UserService from '../services/User.service';
import PostService from '../services/Post.service';
import { Redirect } from 'react-router-dom';

export const UserContext = createContext({});

function UserProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      auth();
    }
  });

  async function register(data) {
    const { user, error } = await UserService.register(data);
    if (error) return error;
    return user;
  }

  async function login(data) {
    const { token, error } = await UserService.login(data);
    if (error) return error;
    localStorage.setItem('token', token);
    auth();
    return token;
  }

  function auth() {
    const token = localStorage.getItem('token');
    if (token) {
      PostService.headers.append('auth-token', token);
      const decoded = jwt_decode(token);
      setUser(decoded);
      setIsAuthenticated(true);
    } else {
      PostService.headers.delete('auth-token');
      setIsAuthenticated(false);
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }

  return (
    <UserContext.Provider
      value={{ isAuthenticated, user, register, login, logout }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
