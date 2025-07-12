// apps/frontend/src/services/apiClient.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach access token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401, try refresh once, then retry original request
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      !original._retry &&
      !original.url.includes('/auth/login') &&
      !original.url.includes('/auth/refresh')
    ) {
      original._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${API_URL}/auth/refresh`,
            { refresh: refreshToken },
            { headers: { 'Content-Type': 'application/json' } }
          );
          localStorage.setItem('accessToken', data.access);
          // update header and retry
          original.headers.Authorization = `Bearer ${data.access}`;
          return apiClient(original);
        } catch (refreshError) {
          // refresh failed—fall through
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
