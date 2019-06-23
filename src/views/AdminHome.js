import React, { useContext } from 'react';
import { PostContext } from '../postProvider';

function AdminHome() {
  const { pages, posts, deletePost } = useContext(PostContext);

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
                    <button>edit</button>
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
                    <button>edit</button>
                    <button onClick={() => deletePost(post._id)}>delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
