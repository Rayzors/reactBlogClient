import React, { useContext } from 'react';
import { PostContext } from '../postProvider';
import NotFound from './NotFound';

function Page({ match, location }) {
  const { pages } = useContext(PostContext);
  const currentPages = pages.find(({ slug }) => slug === match.params.slug);
  if (!currentPages) return <NotFound />;

  return (
    <>
      <h1>{currentPages.title}</h1>
      <p>{currentPages.date}</p>
      <p>{currentPages.content}</p>
    </>
  );
}

export default Page;
