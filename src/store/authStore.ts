import { create } from 'zustand';
import { User, TwoWayResponse } from '../types';
import { authAPI } from '../services/api';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<TwoWayResponse>;
  register: (username: string, email: string, password: string) => Promise<TwoWayResponse>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  login: async (username, password) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authAPI.login(username, password);
      
      if (response.status === 200) {
        localStorage.setItem('token', response.data.user.token);
        set({ user: response.data.user, isLoading: false });
        return {
          status: 200,
          message: 'Giriş başarılı'
        };
      } else {
        set({ isLoading: false, error: response.data.message });
        return {
          status: response.data.status,
          message: response.data.message || 'Giriş başarısız oldu'
        };
      }
    } catch (error: any) {
      set({ isLoading: false, error: error.response?.data?.message || 'Giriş başarısız oldu' });
      return {
        status: 404,
        message: error.response?.data?.message || 'Giriş sırasında bir hata oluştu'
      };
    }
  },
  register: async (username, email, password) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authAPI.register(username, email, password);
      
      if (response.status === 200) {
        set({ isLoading: false });
        return {
          status: 200,
          message: response.data.message || 'Kayıt başarılı',
          data: response.data
        };
      } else {
        set({ isLoading: false, error: response.data.message });
        return {
          status: response.data.status,
          message: response.data.message || 'Kayıt başarısız oldu'
        };
      }
    } catch (error: any) {
      set({ isLoading: false, error: error.response?.data?.message || 'Bir hata oluştu' });
      return {
        status: 404,
        message: error.response?.data?.message || 'Kayıt işlemi sırasında bir hata oluştu'
      };
    }
  },
  logout: () => {
    localStorage.clear();
    set({ user: null });
  },
}));