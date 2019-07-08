import React, { useContext } from 'react';
import { PostContext } from '../store/postProvider';
import Pagination from '../components/BlogPagination/BlogPagination';
import Article from '../components/Article/Article';
import NotFound from './NotFound';

function Blog({ match, location }) {
  const { posts, nbPostPerPage } = useContext(PostContext);

  const currentPosts = posts.filter((_, i) => {
    const page = match.params.page ? +match.params.page : 1;
    const max = nbPostPerPage * page;
    const offset = nbPostPerPage * (page - 1);
    if (i >= offset && i < max) {
      return true;
    }
    return false;
  });

  if (!currentPosts.length) return <NotFound />;

  return (
    <>
      <h1>Blog</h1>
      <div className="article-list">
        <ul>
          {currentPosts &&
            currentPosts.map((post) => (
              <li key={post._id}>
                <Article
                  title={post.title}
                  date={post.date}
                  content={post.content}
                />
              </li>
            ))}
        </ul>
      </div>
      <Pagination currentPage={match.params.page || 1} />
    </>
  );
}

export default Blog;
