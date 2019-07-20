import React, { useState, useEffect, useContext } from 'react';
import { PostContext } from '../../store/postProvider';
import { UserContext } from '../../store/userProvider';

function PostForm({ post, postType }) {
  const { addPost } = useContext(PostContext);
  const { user } = useContext(UserContext);

  let schema = {
    title: '',
    slug: '',
    content: '',
    type: postType,
  };

  if (post && !schema.hasOwnProperty('_id')) {
    schema['_id'] = '';
  }

  const [form, setForm] = useState(schema);

  useEffect(() => {
    const schema = {
      title: post ? post.title : '',
      slug: post ? post.slug : '',
      content: post ? post.content : '',
      type: postType,
    };
    if (post && !schema.hasOwnProperty('_id')) {
      schema['_id'] = post ? post._id : '';
    }
    setForm(schema);
  }, [post, postType]);

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

    formData.append('author', user._id);

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

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={form.content}
          onChange={onChange}
          name="content"
        />

        <input type="hidden" id="type" value={form.type} name="type" />

        <input type="submit" value={post ? 'Modifier' : 'Envoyer'} />
      </form>
    </div>
  );
}

export default PostForm;
