import React, { useState, useEffect, createContext } from 'react';
import PostService from '../services/Post.service';

export const PostContext = createContext({});

function PostProvider(props) {
  const [pages, setPages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [nbPostPerPage] = useState(6);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const result = await PostService.getPost();

    const posts = result.filter(({ type }) => type === 'post');
    const pages = result.filter(({ type }) => type === 'page');

    setPosts(posts);
    setPages(pages);
  }

  async function deletePost(id) {
    const result = await PostService.deletePost(id);

    if (!result._id) return;

    await fetchData();
  }

  async function addPost(post) {
    const result = await PostService.addPost(post);

    if (!result._id) return;

    await fetchData();
  }

  return (
    <PostContext.Provider
      value={{ pages, posts, nbPostPerPage, deletePost, addPost }}
    >
      {props.children}
    </PostContext.Provider>
  );
}

export default PostProvider;
