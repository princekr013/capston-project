import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Heart } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

const Player: React.FC = () => {
  const { currentSong, isPlaying, togglePlay, nextSong, prevSong, progress, duration, seek } = useMusic();
  const { profile, toggleLike } = useAuth();

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const isLiked = currentSong && profile?.likedSongs.includes(currentSong.id);

  if (!currentSong) return (
    <div className="h-24 bg-[#181818] border-t border-[#282828] px-4 flex items-center justify-center text-gray-500">
      Select a song to start listening
    </div>
  );

  return (
    <div className="h-24 bg-[#181818] border-t border-[#282828] px-4 flex items-center justify-between">
      {/* Song Info */}
      <div className="flex items-center gap-4 w-[30%]">
        <img src={currentSong.coverUrl} alt={currentSong.title} className="w-14 h-14 rounded shadow-lg" />
        <div className="min-w-0">
          <h4 className="text-white text-sm font-medium truncate">{currentSong.title}</h4>
          <p className="text-gray-400 text-xs truncate">{currentSong.artist}</p>
        </div>
        <button 
          onClick={() => toggleLike(currentSong.id)}
          className={`ml-2 transform active:scale-125 transition-transform ${isLiked ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-2 max-w-[40%] w-full">
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white"><Shuffle className="w-4 h-4" /></button>
          <button onClick={prevSong} className="text-gray-400 hover:text-white transition-colors">
            <SkipBack className="w-6 h-6 fill-current" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="w-5 h-5 text-black fill-current" /> : <Play className="w-5 h-5 text-black fill-current ml-1" />}
          </button>
          <button onClick={nextSong} className="text-gray-400 hover:text-white transition-colors">
            <SkipForward className="w-6 h-6 fill-current" />
          </button>
          <button className="text-gray-400 hover:text-white"><Repeat className="w-4 h-4" /></button>
        </div>
        <div className="flex items-center gap-2 w-full text-xs text-gray-400">
          <span>{formatTime(progress)}</span>
          <div className="relative flex-1 group h-1 bg-gray-600 rounded-full cursor-pointer overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-white group-hover:bg-green-500 transition-colors"
              style={{ width: `${(progress / duration) * 100}%` }}
            />
            <input 
              type="range"
              min="0"
              max={duration || 0}
              value={progress}
              onChange={(e) => seek(parseFloat(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume & Extras */}
      <div className="flex items-center justify-end gap-3 w-[30%]">
        <Volume2 className="w-5 h-5 text-gray-400" />
        <div className="w-24 h-1 bg-gray-600 rounded-full relative group">
           <div className="absolute left-0 top-0 h-full bg-gray-400 group-hover:bg-green-500 w-[70%]" />
        </div>
      </div>
    </div>
  );
};

export default Player;
