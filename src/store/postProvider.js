import React, { useState, useEffect, createContext } from 'react';
import PostService from '../services/Post.service';

export const PostContext = createContext({});

function PostProvider(props) {
  const [pages, setPages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [nbPostPerPage] = useState(6);

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
    const filteredPages = pages.filter(({ _id }) => _id !== id);

    setPosts(filteredPosts);
    setPages(filteredPages);
  }

  async function addPost(post) {
    const result = await PostService.addPost(post);

    if (!result._id) return;

    let postArray = [];
    let pageArray = [];
    const postIndex = posts.findIndex((post) => post._id === result._id);
    const pageIndex = pages.findIndex((page) => page._id === result._id);

    if (result.type === 'post') {
      if (postIndex === -1) {
        postArray = [result, ...posts];
      } else {
        postArray = [...posts];
        postArray[postIndex] = result;
      }
      setPosts(postArray);
    }

    if (result.type === 'page') {
      if (pageIndex === -1) {
        pageArray = [result, ...pages];
      } else {
        pageArray = [...pages];
        pageArray[pageIndex] = result;
      }
      setPages(pageArray);
    }
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
