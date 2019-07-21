import React, { useState, useEffect, useContext } from 'react';
import { PostContext } from '../../store/postProvider';
import { UserContext } from '../../store/userProvider';
import useForm from '../../hooks/useForm';
import { Input, Textarea, Group, Button } from '../../styled-components/Form';
import { SubTitle } from '../../styled-components/Title';

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

  const [form, setForm, onChange] = useForm(schema);

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
  }, [post, postType, setForm]);

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
      <SubTitle>
        {post ? `Modification d'un ${form.type}` : `Ajout d'un ${form.type}`}
      </SubTitle>
      <form onSubmit={handleSubmit}>
        <Group>
          <label htmlFor="title">Titre</label>
          <Input
            type="text"
            value={form.title}
            onChange={onChange}
            placeholder="Entrez un titre"
            id="title"
            name="title"
          />
        </Group>

        <Group>
          <label htmlFor="slug">Slug</label>
          <Input
            type="text"
            value={form.slug}
            onChange={onChange}
            placeholder="ici-un-slug"
            id="slug"
            name="slug"
          />
        </Group>

        <Group>
          <label htmlFor="content">Contenu</label>
          <Textarea
            id="content"
            value={form.content}
            onChange={onChange}
            placeholder="Votre contenu"
            name="content"
          />
        </Group>

        <Button type="submit" value={post ? 'Modifier' : 'Envoyer'} />
      </form>
    </div>
  );
}

export default PostForm;
