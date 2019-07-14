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
import styled from 'styled-components';
import { Container } from './styled-components/Container';
import Page from './views/Page';
import Blog from './views/Blog';
import AdminHome from './views/AdminHome';
import LoginForm from './components/Form/LoginForm';
import NotFound from './views/NotFound';

const Topbar = styled.nav`
  padding: 1em 0;
  background: #fff;

  ul {
    list-style: none;

    > li {
      display: inline-block;

      &:not(:last-child) {
        margin-right: 1em;
      }

      a {
        color: black;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const Wrapper = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items; center;
`;

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
        <Topbar>
          <Wrapper>
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
            <ul>
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
          </Wrapper>
        </Topbar>
        <Container>
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
        </Container>
      </>
    </Router>
  );
}

export default Nav;
