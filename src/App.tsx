import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainView from './components/MainView';
import Player from './components/Player';
import { AuthProvider } from './context/AuthContext';
import { MusicProvider } from './context/MusicContext';

function AppContent() {
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'library' | 'liked'>('home');

  return (
    <div className="flex flex-col h-screen h-svh bg-black overflow-hidden font-sans">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onViewChange={setCurrentView} />
        <MainView view={currentView} />
      </div>
      <Player />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MusicProvider>
        <AppContent />
      </MusicProvider>
    </AuthProvider>
  );
}
