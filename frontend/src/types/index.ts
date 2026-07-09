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
}

export interface Match {
  id: string;
  user: User;
  matchedAt: string;
  lastMessage?: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface UserProfile extends User {
  createdAt: string;
  likeCount: number;
  matchCount: number;
}
