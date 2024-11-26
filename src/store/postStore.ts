import { create } from 'zustand';
import { Post } from '../types';
import { postAPI } from '../services/api';
import { TwoWayResponse } from '../types';

interface PostState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<TwoWayResponse>;
  addPost: (post: { userID: string; title: string; content: string }) => Promise<TwoWayResponse>;
  updatePost: (id: string, updatedPost: { title: string; content: string }) => Promise<TwoWayResponse>;
  deletePost: (id: string) => Promise<TwoWayResponse>;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,
  fetchPosts: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await postAPI.getPosts();
      
      if (response.status === 200) {
        set({ posts: response.data.data, isLoading: false });
        return {
          status: 200,
          message: 'Gönderiler başarıyla yüklendi'
        };
      } else {
        set({ isLoading: false, error: response.data.message });
        return {
          status: response.data.status,
          message: response.data.message || 'Gönderiler yüklenemedi'
        };
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Gönderiler yüklenemedi', isLoading: false });
      return {
        status: 404,
        message: error.response?.data?.message || 'Gönderiler yüklenirken bir hata oluştu'
      };
    }
  },
  addPost: async (post) => {
    try {
      console.log(post.userID, post.title, post.content);
      const token = localStorage.getItem('token');
      console.log(token);
      set({ isLoading: true, error: null });
      const response = await postAPI.createPost(post);
      
      if (response.status === 200) {
        set((state) => ({
          posts: [response.data, ...state.posts],
          isLoading: false,
        }));
        return {
          status: 200,
          message: 'Gönderi başarıyla oluşturuldu'
        };
      } else {
        set({ isLoading: false, error: response.data.message });
        return {
          status: response.data.status,
          message: response.data.message || 'Gönderi oluşturulamadı'
        };
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Gönderi oluşturulamadı', isLoading: false });
      return {
        status: 404,
        message: error.response?.data?.message || 'Gönderi oluşturulurken bir hata oluştu'
      };
    }
  },

  updatePost: async (id, updatedPost) => {
    try {
      set({ isLoading: true, error: null });
      const response = await postAPI.updatePost(id, updatedPost);
      
      if (response.status === 200) {
        set((state) => ({
          posts: state.posts.map((post) =>
            post._id === id ? response.data.post : post
          ),
          isLoading: false,
        }));
        return {
          status: 200,
          message: 'Gönderi başarıyla güncellendi'
        };
      } else {
        set({ isLoading: false, error: response.data.message });
        return {
          status: response.data.status,
          message: response.data.message || 'Gönderi güncellenemedi'
        };
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Gönderi güncellenemedi', isLoading: false });
      return {
        status: 404,
        message: error.response?.data?.message || 'Gönderi güncellenirken bir hata oluştu'
      };
    }
  },

  deletePost: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const response = await postAPI.deletePost(id);
      
      if (response.status === 200) {
        const newPosts = await postAPI.getPosts();
        set((state) => ({
          posts: newPosts.data.data,
          isLoading: false,
        }));
        return {
          status: 200,
          message: 'Gönderi başarıyla silindi'
        };
      } else {
        set({ isLoading: false, error: response.data.message });
        return {
          status: response.data.status,
          message: response.data.message || 'Gönderi silinemedi'
        };
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Gönderi silinemedi', isLoading: false });
      return {
        status: 404,
        message: error.response?.data?.message || 'Gönderi silinirken bir hata oluştu'
      };
    }
  },
}));