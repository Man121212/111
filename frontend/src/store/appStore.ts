import { create } from 'zustand';
import type { User, Match, Message, UserProfile } from '../types';

interface AppStore {
  // Current user
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;

  // Cards
  cards: User[];
  setCards: (cards: User[]) => void;
  removeCard: (userId: string) => void;

  // Matches
  matches: Match[];
  setMatches: (matches: Match[]) => void;
  addMatch: (match: Match) => void;

  // Messages
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;

  // Likes
  likedUsers: Set<string>;
  toggleLike: (userId: string) => void;

  // UI
  activeTab: 'discover' | 'likes' | 'matches' | 'messages' | 'profile';
  setActiveTab: (tab: 'discover' | 'likes' | 'matches' | 'messages' | 'profile') => void;

  selectedMatch: string | null;
  setSelectedMatch: (matchId: string | null) => void;

  showNewMatch: { show: boolean; user?: User };
  setShowNewMatch: (data: { show: boolean; user?: User }) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),

  cards: [],
  setCards: (cards) => set({ cards }),
  removeCard: (userId) =>
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== userId),
    })),

  matches: [],
  setMatches: (matches) => set({ matches }),
  addMatch: (match) =>
    set((state) => ({
      matches: [match, ...state.matches],
    })),

  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  likedUsers: new Set(),
  toggleLike: (userId) =>
    set((state) => {
      const newLiked = new Set(state.likedUsers);
      if (newLiked.has(userId)) {
        newLiked.delete(userId);
      } else {
        newLiked.add(userId);
      }
      return { likedUsers: newLiked };
    }),

  activeTab: 'discover',
  setActiveTab: (tab) => set({ activeTab: tab }),

  selectedMatch: null,
  setSelectedMatch: (matchId) => set({ selectedMatch: matchId }),

  showNewMatch: { show: false },
  setShowNewMatch: (data) => set({ showNewMatch: data }),
}));
