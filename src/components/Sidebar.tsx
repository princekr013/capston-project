import React from 'react';
import { Home, Search, Library, PlusSquare, Heart, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { logout, signInWithGoogle } from '../lib/firebase';

const Sidebar: React.FC<{ onViewChange: (view: 'home' | 'search' | 'library' | 'liked') => void }> = ({ onViewChange }) => {
  const { user, profile } = useAuth();

  return (
    <div className="w-64 bg-black h-full flex flex-col p-6 text-gray-400 font-medium">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Library className="text-black w-5 h-5" />
          </div>
          Spotify
        </h1>
      </div>

      <nav className="space-y-4 mb-8">
        <button 
          onClick={() => onViewChange('home')}
          className="flex items-center gap-4 hover:text-white transition-colors w-full text-left"
        >
          <Home className="w-6 h-6" />
          Home
        </button>
        <button 
          onClick={() => onViewChange('search')}
          className="flex items-center gap-4 hover:text-white transition-colors w-full text-left"
        >
          <Search className="w-6 h-6" />
          Search
        </button>
        <button 
          onClick={() => onViewChange('library')}
          className="flex items-center gap-4 hover:text-white transition-colors w-full text-left"
        >
          <Library className="w-6 h-6" />
          Your Library
        </button>
      </nav>

      <div className="space-y-4 mb-auto">
        <button 
          onClick={() => onViewChange('home')} // Simplified for this demo
          className="flex items-center gap-4 hover:text-white transition-colors w-full text-left"
        >
          <div className="bg-gray-400 text-black p-1 rounded-sm">
            <PlusSquare className="w-4 h-4" />
          </div>
          Create Playlist
        </button>
        <button 
          onClick={() => onViewChange('liked')}
          className="flex items-center gap-4 hover:text-white transition-colors w-full text-left"
        >
          <div className="bg-gradient-to-br from-indigo-700 to-blue-300 p-1 rounded-sm">
            <Heart className="w-4 h-4 text-white fill-current" />
          </div>
          Liked Songs
        </button>
      </div>

      <div className="border-t border-gray-800 pt-6">
        {user ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {profile?.photoURL ? (
                <img src={profile.photoURL} alt="User" className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-white" />
                </div>
              )}
              <span className="text-white text-sm truncate">{profile?.displayName || user.email}</span>
            </div>
            <button 
              onClick={() => logout()}
              className="flex items-center gap-2 hover:text-white text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        ) : (
          <button 
            onClick={() => signInWithGoogle()}
            className="w-full bg-white text-black py-2 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
