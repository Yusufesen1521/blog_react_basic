import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { PenSquare, LogOut, BookOpen } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-lg backdrop-blur-md bg-opacity-80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold gradient-text">
              <BookOpen className="animate-bounce-slow" size={28} />
              <span>BlogHub</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/new-post"
                  className="flex items-center space-x-2 px-4 py-2 rounded-md button-gradient text-white transition-transform hover:scale-105"
                >
                  <PenSquare size={20} />
                  <span>New Post</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md button-gradient text-white transition-transform hover:scale-105"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}