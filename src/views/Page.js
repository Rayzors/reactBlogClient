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

function Page({ match, location }) {
  const { pages } = useContext(PostContext);
  const currentPages = pages.find(({ slug }) => slug === match.params.slug);
  if (!currentPages) return <NotFound />;

  return (
    <>
      <Title>{currentPages.title}</Title>
      <Date>{moment(currentPages.date).format('DD MMMM YYYY')}</Date>
      <p>{currentPages.content}</p>
    </>
  );
}

export default Page;
