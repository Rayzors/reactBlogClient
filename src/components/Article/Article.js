import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Thumbnail = styled.article`
  background: #fff;
  border-radius: 15px;
  padding: 2em;
  text-align: left;
  height: 100%;

  h2 {
    font-size: 26px;
    font-weight: bold;
    margin: 0.5em 0 0;
    color: #000;
    letter-spacing: 1px;
  }
`;

const Date = styled.p`
  margin-bottom: 1em;
  color: #78c1ea;
`;

function Article({ title, date, content }) {
  return (
    <Thumbnail>
      <header>
        <h2>{title}</h2>
      </header>
      <div>
        <Date>{moment(date).format('DD MMMM YYYY')}</Date>
        <p>{content}</p>
      </div>
    </Thumbnail>
  );
}

export default Article;
