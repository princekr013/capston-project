export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  duration: number; // in seconds
  genre: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  likedSongs: string[]; // array of song IDs
}

export interface Playlist {
  id: string;
  name: string;
  ownerId: string;
  songIds: string[];
  isPublic: boolean;
  createdAt: string;
}
