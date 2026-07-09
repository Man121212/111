export interface User {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  images: string[];
  interests: string[];
  verified: boolean;
  distance: number;
  lastSeen: string;
  zodiac?: string;
  isOnline?: boolean;
  responseRate?: number;
}

export interface Match {
  id: string;
  user: User;
  matchedAt: string;
  lastMessage?: string;
  unreadCount: number;
  isOnline?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
  type?: 'text' | 'image' | 'emoji';
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface UserProfile extends User {
  createdAt: string;
  likeCount: number;
  matchCount: number;
  premium?: boolean;
  role?: 'male' | 'female' | 'other';
}

export type LikeType = 'like' | 'super-like' | 'pass';
