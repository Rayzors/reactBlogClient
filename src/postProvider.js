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

  async function deletePost(id) {
    const result = await PostService.deletePost(id);

    const filteredPosts = posts.filter(({ _id }) => _id !== id);
    setPosts(filteredPosts);

    const filteredPages = pages.filter(({ _id }) => _id !== id);
    setPages(filteredPages);
  }

  return (
    <PostContext.Provider value={{ pages, posts, nbPostPerPage, deletePost }}>
      {props.children}
    </PostContext.Provider>
  );
}

export default PostProvider;
