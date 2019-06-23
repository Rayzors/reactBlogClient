import React, { useState, useEffect, createContext } from 'react';
import PostService from './services/Post.service';

export const PostContext = createContext({});

function PostProvider(props) {
  const [pages, setPages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [nbPostPerPage] = useState(2);

  useEffect(() => {
    async function fetchData() {
      const result = await PostService.getPost();

      const posts = result.filter(({ type }) => type === 'post');
      const pages = result.filter(({ type }) => type === 'page');

      setPosts(posts);
      setPages(pages);
    }

    fetchData();
  }, []);

  return (
    <PostContext.Provider value={{ pages, posts, nbPostPerPage }}>
      {props.children}
    </PostContext.Provider>
  );
}

export default PostProvider;
