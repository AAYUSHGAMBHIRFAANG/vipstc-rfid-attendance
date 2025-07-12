// apps/frontend/src/components/ProfileModal.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchProfile, updateProfile } from '../services/auth.js';
import { toast } from 'react-toastify';

export default function ProfileModal({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: '', email: '', phone: '', password: '' },
  });

  React.useEffect(() => {
    if (isOpen) {
      // Populate form
      fetchProfile().then((u) => {
        reset({ name: u.name, email: u.email, phone: u.phone, password: '' });
      });
    }
  }, [isOpen, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateProfile(data);
      toast.success('Profile updated');
      onClose();
    } catch (err) {
      toast.error('Failed to update');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
        style={{
          background: '#fff',
          padding: 'var(--spacing-lg)',
          borderRadius: 'var(--radius)',
          minWidth: 300,
        }}
      >
        <h2>My Profile</h2>
        <label>Name</label>
        <input {...register('name')} />
        <label>Email</label>
        <input type="email" {...register('email')} />
        <label>Phone</label>
        <input {...register('phone')} />
        <label>New Password</label>
        <input type="password" {...register('password')} />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          style={{ marginLeft: 'var(--spacing)' }}
          onClick={logout}
        >
          Logout
        </button>
      </form>
    </div>
  );
}
