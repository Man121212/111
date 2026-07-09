import { create } from 'zustand';
import type { User, Match, Message, UserProfile, LikeType } from '../types';

interface AppStore {
  // Current user
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;

  // Cards
  cards: User[];
  setCards: (cards: User[]) => void;
  removeCard: (userId: string) => void;
  history: User[];
  undoLastCard: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Matches
  matches: Match[];
  setMatches: (matches: Match[]) => void;
  addMatch: (match: Match) => void;

  // Messages
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;

  // Likes with types (like, super-like, pass)
  likedUsers: Map<string, LikeType>;
  toggleLike: (userId: string, type: LikeType) => void;

  // UI
  activeTab: 'discover' | 'likes' | 'matches' | 'messages' | 'profile';
  setActiveTab: (tab: 'discover' | 'likes' | 'matches' | 'messages' | 'profile') => void;

  selectedMatch: string | null;
  setSelectedMatch: (matchId: string | null) => void;

  showNewMatch: { show: boolean; user?: User };
  setShowNewMatch: (data: { show: boolean; user?: User }) => void;

  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Filters
  ageMin: number;
  ageMax: number;
  setAgeRange: (min: number, max: number) => void;
  distanceMax: number;
  setDistanceMax: (distance: number) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),

  cards: [],
  setCards: (cards) => set({ cards }),
  removeCard: (userId) =>
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== userId),
      history: [...state.history, state.cards.find((c) => c.id === userId)!],
    })),

  history: [],
  undoLastCard: () =>
    set((state) => {
      if (state.history.length === 0) return state;
      const lastCard = state.history[state.history.length - 1];
      return {
        cards: [lastCard, ...state.cards],
        history: state.history.slice(0, -1),
      };
    }),

  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

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

  likedUsers: new Map(),
  toggleLike: (userId, type) =>
    set((state) => {
      const newLiked = new Map(state.likedUsers);
      if (newLiked.has(userId)) {
        newLiked.delete(userId);
      } else {
        newLiked.set(userId, type);
      }
      return { likedUsers: newLiked };
    }),

  activeTab: 'discover',
  setActiveTab: (tab) => set({ activeTab: tab }),

  selectedMatch: null,
  setSelectedMatch: (matchId) => set({ selectedMatch: matchId }),

  showNewMatch: { show: false },
  setShowNewMatch: (data) => set({ showNewMatch: data }),

  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  ageMin: 18,
  ageMax: 60,
  setAgeRange: (min, max) => set({ ageMin: min, ageMax: max }),

  distanceMax: 100,
  setDistanceMax: (distance) => set({ distanceMax: distance }),
}));
