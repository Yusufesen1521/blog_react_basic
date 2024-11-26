import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { useAuthStore } from '../store/authStore';
import { Edit, Trash2, Calendar, User } from 'lucide-react';
import { usePostStore } from '../store/postStore';
import { toast } from 'react-hot-toast';
import DeleteConfirmModal from './DeleteConfirmModal';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { user } = useAuthStore();
  const deletePost = usePostStore((state) => state.deletePost);
  const isAuthor = user?._id === post.createdBy;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await deletePost(post._id);
      if (response.status === 200) {
        toast.success('Gönderi başarıyla silindi', {
          position: 'top-right',
          duration: 3000
        });
      } else {
        toast.error(`Hata: ${response.message}`, {
          position: 'top-right',
          duration: 3000
        });
      }
    } catch (error) {
      toast.error('Gönderi silinirken bir hata oluştu', {
        position: 'top-right',
        duration: 3000
      });
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <article className="bg-white rounded-xl shadow-md overflow-hidden card-hover animate-fade-in">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold hover:text-primary-600 transition-colors duration-300">
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h2>
            {isAuthor && (
              <div className="flex space-x-2">
                <Link
                  to={`/edit-post/${post._id}`}
                  className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-300"
                >
                  <Edit size={20} />
                </Link>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            )}
          </div>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.content}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <User size={16} />
                <span>{post.author}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </span>
            </div>
          </div>
        </div>
      </article>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title={post.title}
      />
    </>
  );
}