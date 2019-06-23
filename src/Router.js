import React, { useContext } from 'react';
import { PostContext } from './postProvider';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Page from './views/Page';
import Blog from './views/Blog';

function Nav() {
  const { pages } = useContext(PostContext);

  return (
    <Router>
      {pages.length > 0 && (
        <>
          <nav>
            <ul>
              <li>
                <Link to="/">Blog</Link>
              </li>
              {pages.map((page, index) => (
                <li key={page._id}>
                  <Link to={`/${page.slug}`}>{page.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="view">
            <Route path="/" exact component={Blog} />
            <Route path="/blog/:page(\d+)" exact component={Blog} />
            <Route path="/:slug([\w-]+)" exact component={Page} />
          </div>
        </>
      )}
    </Router>
  );
}

export default Nav;
