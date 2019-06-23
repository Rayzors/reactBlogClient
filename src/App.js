import React from 'react';
import PostProvider from './postProvider';
import Router from './Router';
import './App.css';

export default function App() {
  return (
    <PostProvider>
      <div className="App">
        <Router />
      </div>
    </PostProvider>
  );
}
