import React, { useContext } from 'react';
import { PostContext } from '../store/postProvider';
import Pagination from '../components/BlogPagination/BlogPagination';
import Article from '../components/Article/Article';
import NotFound from './NotFound';
import styled from 'styled-components';
import { Container } from '../styled-components/Container';

const ArticleList = styled.div`
  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2em;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin: 1em 0;
  color: #000;
  text-align: left;
`;

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
      <Title>Blog</Title>
      <ArticleList>
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
      </ArticleList>
      <Pagination currentPage={match.params.page || 1} />
    </>
  );
}

export default Blog;
