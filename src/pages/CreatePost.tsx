import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostStore } from '../store/postStore';
import { useAuthStore } from '../store/authStore';
import { Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CreatePost() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const addPost = usePostStore((state) => state.addPost);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const response = await addPost({
        userID: user._id,
        title: formData.title,
        content: formData.content,
      });
      
      if (response.status === 200) {
        toast.success('Gönderi başarıyla oluşturuldu!', {
          position: 'top-right',
          duration: 3000
        });
        navigate('/');
      } else {
        toast.error(`Hata: ${response.message}`, {
          position: 'top-right',
          duration: 3000
        });
      }
    } catch (error) {
      toast.error('Gönderi oluşturulurken bir hata oluştu', {
        position: 'top-right',
        duration: 3000
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            rows={12}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Send size={20} />
          <span>Publish Post</span>
        </button>
      </form>
    </div>
  );
}