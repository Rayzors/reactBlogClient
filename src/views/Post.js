import React, { useContext } from 'react';
import { PostContext } from '../store/postProvider';
import NotFound from './NotFound';
import styled from 'styled-components';
import moment from 'moment';

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin: 1em 0;
  color: #000;
  text-align: left;
`;

const Date = styled.p`
  margin-bottom: 1em;
  color: #000;
`;

function Post({ match, location }) {
  const { posts } = useContext(PostContext);
  const currentPost = posts.find(({ slug }) => slug === match.params.slug);
  if (!currentPost) return <NotFound />;

  return (
    <>
      <Title>{currentPost.title}</Title>
      <Date>{moment(currentPost.date).format('DD MMMM YYYY')}</Date>
      <p>{currentPost.content}</p>
    </>
  );
}

export default Post;
