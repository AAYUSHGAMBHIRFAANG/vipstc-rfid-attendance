// apps/frontend/src/services/auth.js
import apiClient from './apiClient.js';

export async function login({ email, password }) {
  const res = await apiClient.post('/auth/login', { email, password });
  const { access, refresh } = res.data;
  // persist tokens
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
  return res.data;
}

export async function refreshToken() {
  const refresh = localStorage.getItem('refreshToken');
  const res = await apiClient.post('/auth/refresh', { refresh });
  const { access } = res.data;
  localStorage.setItem('accessToken', access);
  return access;
}

export async function fetchProfile() {
  const res = await apiClient.get('/auth/profile');
  return res.data;
}

export async function updateProfile(payload) {
  const res = await apiClient.patch('/auth/profile', payload);
  return res.data;
}

export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
