import React, { useState, useEffect, useContext } from 'react';
import { PostContext } from '../../postProvider';

function PostForm({ post }) {
  const { addPost } = useContext(PostContext);

  const [form, setForm] = useState({
    _id: '',
    title: '',
    slug: '',
    author: '',
    content: '',
    type: '',
  });

  useEffect(() => {
    setForm({
      _id: post ? post._id : '',
      title: post ? post.title : '',
      slug: post ? post.slug : '',
      author: post ? post.author : '',
      content: post ? post.content : '',
      type: post ? post.type : '',
    });
  }, [post]);

  function onChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    for (const key in form) {
      if (form.hasOwnProperty(key)) {
        const element = form[key];
        formData.append(key, element);
      }
    }

    addPost(formData);
  }

  return (
    <div className="form__edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={onChange}
          id="title"
          name="title"
        />

        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          value={form.slug}
          onChange={onChange}
          id="slug"
          name="slug"
        />

        <label htmlFor="author">Author</label>
        <input
          type="text"
          value={form.author}
          onChange={onChange}
          id="author"
          name="author"
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={form.content}
          onChange={onChange}
          name="content"
        />

        <input type="hidden" id="type" value={form.type} name="type" />

        {post && <input type="hidden" id="type" value={form._id} name="type" />}

        <input type="submit" value={post ? 'Modifier' : 'Envoyer'} />
      </form>
    </div>
  );
}

export default PostForm;
