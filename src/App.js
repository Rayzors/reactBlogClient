import React from 'react';
import PostProvider from './store/postProvider';
import UserProvider from './store/userProvider';
import Router from './Router';
import './App.css';

export default function App() {
  return (
    <UserProvider>
      <PostProvider>
        <div className="App">
          <Router />
        </div>
      </PostProvider>
    </UserProvider>
  );
}
