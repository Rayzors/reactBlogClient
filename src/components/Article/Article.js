import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';

const Thumbnail = styled.article`
  background: #fff;
  border-radius: 15px;
  padding: 2em;
  height: 100%;
  box-shadow: 0px 4px 20px rgba(120, 193, 234, 0.15);

  h2 {
    font-size: 26px;
    font-weight: bold;
    margin: 0;
    color: #000;
    letter-spacing: 1px;
  }
`;

const Author = styled.p`
  margin: 1em 0 0;
  color: #676767;
`;

const DateString = styled.p`
  margin-bottom: 1em;
  color: #78c1ea;
`;

const Description = styled.p`
  color: #676767;
`;

function Article({ title, date, content, author, slug }) {
  return (
    <Link to={`/blog/${slug}`}>
      <Thumbnail>
        <header>
          <h2>{title}</h2>
          <Author>Écrit par {author}</Author>
        </header>
        <div>
          <DateString>Le {moment(date).format('DD MMMM YYYY')}</DateString>
          <Description>{content}</Description>
        </div>
      </Thumbnail>
    </Link>
  );
}

export default Article;
