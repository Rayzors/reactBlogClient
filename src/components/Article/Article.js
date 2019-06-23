import React from 'react';

function Article({ title, date, content }) {
  return (
    <article>
      <header>
        <h1>{title}</h1>
      </header>
      <div className="description">
        <p>{date}</p>
        <p>{content}</p>
      </div>
    </article>
  );
}

export default Article;
