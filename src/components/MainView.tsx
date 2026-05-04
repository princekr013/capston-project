import React, { useState, useMemo } from 'react';
import { Play, Search, Heart } from 'lucide-react';
import { DUMMY_SONGS } from '../constants';
import { useMusic } from '../context/MusicContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Song } from '../types';

interface MainViewProps {
  view: 'home' | 'search' | 'library' | 'liked';
}

const MainView: React.FC<MainViewProps> = ({ view }) => {
  const { playSong } = useMusic();
  const { profile, toggleLike } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const displayedSongs = useMemo(() => {
    let list = DUMMY_SONGS;
    if (view === 'liked') {
      list = DUMMY_SONGS.filter(s => profile?.likedSongs.includes(s.id));
    }
    if (view === 'search' && searchTerm) {
      list = list.filter(s => 
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return list;
  }, [view, searchTerm, profile?.likedSongs]);

  const Greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-[#1e1e1e] to-black overflow-y-auto p-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          {view === 'search' ? (
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text"
                placeholder="What do you want to listen to?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white text-black py-3 pl-12 pr-4 rounded-full font-medium focus:outline-none focus:ring-2 ring-green-500"
                autoFocus
              />
            </div>
          ) : (
            <h2 className="text-3xl font-bold text-white">
              {view === 'liked' ? 'Liked Songs' : <Greeting />}
            </h2>
          )}
        </header>

        {/* Content */}
        {view === 'home' && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Made for you</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {DUMMY_SONGS.slice(0, 5).map((song) => (
                <SongCard key={song.id} song={song} onPlay={() => playSong(song)} />
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-2xl font-bold text-white">
               {view === 'search' ? 'Search results' : view === 'liked' ? '' : 'New releases'}
             </h3>
          </div>
          
          {displayedSongs.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">Nothing found here yet.</p>
              {view === 'liked' && <p className="text-sm">Songs you like will appear here.</p>}
            </div>
          ) : (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {displayedSongs.map((song) => (
                <SongCard key={song.id} song={song} onPlay={() => playSong(song)} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const SongCard: React.FC<{ song: Song, onPlay: () => void }> = ({ song, onPlay }) => {
  const { profile, toggleLike } = useAuth();
  const isLiked = profile?.likedSongs.includes(song.id);

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-colors group cursor-pointer relative"
      onClick={onPlay}
    >
      <div className="relative mb-4 aspect-square shadow-2xl">
        <img 
          src={song.coverUrl} 
          alt={song.title} 
          className="w-full h-full object-cover rounded-sm shadow-black/50"
        />
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-green-400"
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
        >
          <Play className="text-black fill-current w-6 h-6 ml-1" />
        </motion.button>

        <button
           onClick={(e) => {
             e.stopPropagation();
             toggleLike(song.id);
           }}
           className={`absolute top-2 right-2 p-2 rounded-full bg-black/40 backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100 ${isLiked ? 'text-green-500 opacity-100' : 'text-white'}`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>
      <h4 className="text-white font-bold truncate mb-1">{song.title}</h4>
      <p className="text-gray-400 text-sm truncate">{song.artist}</p>
    </motion.div>
  );
};

export default MainView;
