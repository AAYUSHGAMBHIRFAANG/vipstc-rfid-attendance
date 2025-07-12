// apps/frontend/src/pages/Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext.jsx';
import { isEmail, isNonEmpty } from '../utils/validators.js';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input
            {...register('email', {
              validate: (v) => isEmail(v) || 'Invalid email',
            })}
          />
          {errors.email && (
            <p style={{ color: 'var(--color-error)' }}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            {...register('password', {
              validate: (v) => isNonEmpty(v) || 'Password required',
            })}
          />
          {errors.password && (
            <p style={{ color: 'var(--color-error)' }}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
