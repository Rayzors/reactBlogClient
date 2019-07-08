import React, { useState, useContext } from 'react';
import { UserContext } from '../../store/userProvider';

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

  const [form, setForm] = useState(schema);

  function onChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      if (form.hasOwnProperty(key)) {
        const element = form[key];
        formData.append(key, element);
      }
    }

    if (!isLogin) {
      register(formData);
    } else {
      login(formData);
    }
  }

  return (
    <>
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
          type="text"
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
