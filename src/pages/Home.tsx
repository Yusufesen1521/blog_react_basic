import React, { useEffect } from 'react';
import { usePostStore } from '../store/postStore';
import PostCard from '../components/PostCard';
import { BookOpen } from 'lucide-react';

export default function Home() {
  const { posts, isLoading, error, fetchPosts, deletePost } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (isLoading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-bold gradient-text mb-4 flex items-center justify-center">
          <BookOpen className="mr-2" size={48} />
          Welcome to BlogHub
        </h1>
        <p className="text-xl text-gray-600">Share your thoughts with the world</p>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 animate-fade-in">
          <p className="text-xl">No posts yet. Be the first to share your story!</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}