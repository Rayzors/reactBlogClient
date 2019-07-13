import React, { useContext } from 'react';
import { PostContext } from './store/postProvider';
import { UserContext } from './store/userProvider';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';
import Page from './views/Page';
import Blog from './views/Blog';
import AdminHome from './views/AdminHome';
import LoginForm from './components/Form/LoginForm';
import NotFound from './views/NotFound';

function Nav() {
  const { pages } = useContext(PostContext);
  const { isAuthenticated, logout } = useContext(UserContext);

  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          rest.condition ? (
            <Component {...props} {...rest.componentProps} />
          ) : (
            <Redirect
              to={{
                ...rest.redirectTo,
                state: { from: props.location },
                pathname:
                  rest.redirectTo === 'referer' &&
                  props.location.state &&
                  props.location.state.hasOwnProperty('from')
                    ? props.location.state.from.pathname
                    : rest.redirectTo.pathname,
              }}
            />
          )
        }
      />
    );
  }

  return (
    <Router>
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
            {isAuthenticated ? (
              <li>
                <button onClick={logout}>Déconnexion</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">Connexion</Link>
                </li>
                <li>
                  <Link to="/register">S'inscrire</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="view">
          <Switch>
            <Route path="/" exact component={Blog} />
            <PrivateRoute
              path="/admin"
              exact
              component={AdminHome}
              condition={isAuthenticated}
              redirectTo={{ pathname: '/login' }}
            />
            <PrivateRoute
              path="/register"
              exact
              component={LoginForm}
              componentProps={{ isLogin: false }}
              condition={!isAuthenticated}
              redirectTo={{ pathname: '/' }}
            />
            <PrivateRoute
              path="/login"
              exact
              component={LoginForm}
              componentProps={{ isLogin: true }}
              condition={!isAuthenticated}
              redirectTo={'referer'}
            />
            <Route path="/blog" exact component={Blog} />
            <Route path="/blog/:page(\d+)" exact component={Blog} />
            <Route path="/:slug([\w-]+)" exact component={Page} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </>
    </Router>
  );
}

export default Nav;
