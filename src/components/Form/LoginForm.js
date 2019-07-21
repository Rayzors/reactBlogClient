import React, { useState, useContext } from 'react';
import { UserContext } from '../../store/userProvider';
import useForm from '../../hooks/useForm';

function LoginForm({ isLogin }) {
  const { register, login } = useContext(UserContext);

  let schema = {
    name: '',
    email: '',
    password: '',
  };

  if (isLogin) {
    schema = {
      email: '',
      password: '',
    };
  }

  const [form, setForm, onChange] = useForm(schema);
  const [error, setError] = useState({});

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      if (form.hasOwnProperty(key)) {
        const element = form[key];
        formData.append(key, element);
      }
    }

    if (!isLogin) {
      const { error } = await register(formData);
      if (error) setError({ error });
    } else {
      const { error } = await login(formData);
      if (error) setError({ error });
    }
  }

  return (
    <>
      {error && <p>{error.error}</p>}
      <form onSubmit={onSubmit}>
        {!isLogin && (
          <>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={onChange}
            />
          </>
        )}

        <label htmlFor="email">Email</label>
        <input type="text" id="email" value={form.email} onChange={onChange} />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={form.password}
          onChange={onChange}
        />

        <input
          type="submit"
          value={isLogin ? 'Se connecter' : "S'enregistrer"}
        />
      </form>
    </>
  );
}

export default LoginForm;
