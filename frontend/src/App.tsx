import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SwipeCards } from './components/SwipeCards/SwipeCards';
import { Matches } from './components/Matches/Matches';
import { Chat } from './components/Chat/Chat';
import { Profile } from './components/Profile/Profile';
import { Likes } from './components/Likes/Likes';
import { Navigation } from './components/Navigation/Navigation';
import { useAppStore } from './store/appStore';
import './App.css';

function App() {
  const { activeTab, setCurrentUser } = useAppStore();

  useEffect(() => {
    // Initialize current user (simulating API call)
    setCurrentUser({
      id: 'user-1',
      name: 'Дмитрий',
      age: 27,
      location: 'Москва',
      bio: 'Программист, люблю путешествия',
      images: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'],
      interests: ['Путешествия', 'Технологии'],
      verified: true,
      distance: 0,
      lastSeen: 'сейчас',
      zodiac: 'Близнецы',
      createdAt: '2024-01-15',
      likeCount: 243,
      matchCount: 12,
    });
  }, [setCurrentUser]);

  const renderContent = () => {
    switch (activeTab) {
      case 'discover':
        return <SwipeCards />;
      case 'likes':
        return <Likes />;
      case 'matches':
        return <Matches />;
      case 'messages':
        return <Chat />;
      case 'profile':
        return <Profile />;
      default:
        return <SwipeCards />;
    }
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1 className="app-title">💕 СвайпикЛав</h1>
        <p className="app-subtitle">Найди свою судьбу</p>
      </div>

      <div className="app-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="tab-content"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      <Navigation />
    </div>
  );
}

export default App;
