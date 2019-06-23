import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { PostContext } from '../../postProvider';

function BlogPagination({ currentPage }) {
  const { posts, nbPostPerPage } = useContext(PostContext);

  function getNbPage(nbPosts) {
    return function(nbPostPerPage) {
      return Math.ceil(nbPosts / nbPostPerPage);
    };
  }

  const nbPage = getNbPage(posts.length)(nbPostPerPage);

  function paginationNumbers(nbPage) {
    const pageArray = [];

    for (let i = 1; i <= nbPage; i++) {
      pageArray.push(i);
    }

    return pageArray;
  }

  function generatedElement(pageArray) {
    const elementArray = pageArray.map((el) => {
      if ((+currentPage === 1 && +currentPage === el) || +currentPage === el) {
        return <li key={Math.random() * 1000}>{el}</li>;
      }
      return (
        <li key={Math.random() * 1000}>
          <Link to={`/blog/${el}`}>{el}</Link>
        </li>
      );
    });

    if (+currentPage > 1) {
      elementArray.unshift(
        <li key={Math.random() * 1000}>
          <Link to={`/blog/${+currentPage - 1}`}>{`<`}</Link>
        </li>
      );
    }

    if (+currentPage < nbPage && paginationNumbers(nbPage).length) {
      elementArray.push(
        <li key={Math.random() * 1000}>
          <Link to={`/blog/${+currentPage + 1}`}>{`>`}</Link>
        </li>
      );
    }

    return elementArray;
  }

  return (
    <div className="blog-pagination">
      <ul>{generatedElement(paginationNumbers(nbPage)).map((el) => el)}</ul>
    </div>
  );
}

export default BlogPagination;
