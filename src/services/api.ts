import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // API URL'nizi buraya yazın

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// İstek interceptor'ı
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (username: string, password: string) => 
    api.post('/auth/sign-in', { username, password }),
  register: (username: string, email: string, password: string) => 
    api.post('/auth/sign-up', { username, email, password }),
};

export const postAPI = {
  getPosts: () => api.get('/posts'),
  getPost: (id: string) => api.get(`/posts/${id}`),
  createPost: (data: { userID: string; title: string; content: string }) => 
    api.post('/posts', data),
  updatePost: (id: string, data: { title: string; content: string }) => 
    api.put(`/posts/${id}`, data),
  deletePost: (id: string) => api.delete(`/posts/${id}`),
};