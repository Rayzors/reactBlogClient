import React, { useContext } from 'react';
import { PostContext } from './postProvider';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Page from './views/Page';
import Blog from './views/Blog';
import AdminHome from './views/AdminHome';
import NotFound from './views/NotFound';

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
            <Switch>
              <Route path="/" exact component={Blog} />
              <Route path="/admin" exact component={AdminHome} />
              <Route path="/blog" exact component={Blog} />
              <Route path="/blog/:page(\d+)" exact component={Blog} />
              <Route path="/:slug([\w-]+)" exact component={Page} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      )}
    </Router>
  );
}

export default Nav;
