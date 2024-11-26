import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePostStore } from '../store/postStore';
import { Post } from '../types';
import { Calendar, User, ArrowLeft } from 'lucide-react';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts } = usePostStore();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const currentPost = posts.find((p) => p._id === id);
    if (currentPost) {
      setPost(currentPost);
    } else {
      navigate('/');
    }
  }, [id, posts, navigate]);

  if (!post) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors duration-300"
      >
        <ArrowLeft size={20} />
        <span>Geri Dön</span>
      </button>

      <article className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{post.title}</h1>
        
        <div className="flex items-center space-x-4 text-gray-500 mb-8">
          <span className="flex items-center space-x-2">
            <User size={20} />
            <span>{post.author}</span>
          </span>
          <span className="flex items-center space-x-2">
            <Calendar size={20} />
            <span>{new Date(post.createdAt).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </span>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 whitespace-pre-wrap">{post.content}</p>
        </div>
      </article>
    </div>
  );
} 