import React, { useState, useEffect, createContext } from 'react';
import PostService from '../services/Post.service';

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

    if (!result._id) return;

    const filteredPosts = posts.filter(({ _id }) => _id !== id);
    setPosts(filteredPosts);

    const filteredPages = pages.filter(({ _id }) => _id !== id);
    setPages(filteredPages);
  }

  async function addPost(post) {
    const result = await PostService.addPost(post);

    if (!result._id) return;

    const filteredPosts = posts.map((post) => {
      if (post._id === result._id) {
        return result;
      }
      return post;
    });
    setPosts(filteredPosts);

    const filteredPages = pages.map((page) => {
      if (page._id === result._id) {
        return result;
      }
      return page;
    });
    setPages(filteredPages);
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
