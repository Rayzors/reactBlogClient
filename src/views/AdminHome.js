import React, { useContext, useState } from 'react';
import { PostContext } from '../store/postProvider';
import Popin from '../components/Popin/Popin';
import PostForm from '../components/Form/PostForm';

function AdminHome() {
  const { pages, posts, deletePost } = useContext(PostContext);
  const [isOpen, setPopinState] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  function toggle(post = null) {
    setPopinState(!isOpen);
    if (!isOpen && post) {
      setCurrentPost(post);
    } else {
      setCurrentPost(null);
    }
  }

  return (
    <>
      <h1>Administration</h1>
      <div className="two-columns">
        <div>
          <h2>Pages</h2>
          <table>
            <thead>
              <tr>
                <th>title</th>
                <th>date</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page._id}>
                  <td>{page.title}</td>
                  <td>{page.date}</td>
                  <td>
                    <button onClick={() => toggle(page)}>edit</button>
                    <button onClick={() => deletePost(page._id)}>delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Posts</h2>
          <table>
            <thead>
              <tr>
                <th>title</th>
                <th>date</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td>{post.date}</td>
                  <td>
                    <button onClick={() => toggle(post)}>edit</button>
                    <button onClick={() => deletePost(post._id)}>delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Popin isOpen={isOpen} toggle={toggle}>
        <PostForm post={currentPost} />
      </Popin>
    </>
  );
}

export default AdminHome;
