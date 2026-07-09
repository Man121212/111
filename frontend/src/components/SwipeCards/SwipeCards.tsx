import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, MapPin, Flame, CheckCircle } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import type { User } from '../../types';
import './SwipeCards.css';

const CARDS_MOCK: User[] = [
  {
    id: '1',
    name: 'Мария',
    age: 23,
    location: 'Москва',
    bio: 'Люблю путешествия и хорошие кино',
    images: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop'],
    interests: ['Путешествия', 'Кино', 'Музыка'],
    verified: true,
    distance: 2,
    lastSeen: '5 минут назад',
    zodiac: 'Весы',
  },
  {
    id: '2',
    name: 'Анна',
    age: 25,
    location: 'Москва',
    bio: 'Фотограф и любительница кофе ☕',
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop'],
    interests: ['Фотография', 'Кино', 'Кулинария'],
    verified: true,
    distance: 1,
    lastSeen: 'онлайн',
  },
  {
    id: '3',
    name: 'Елена',
    age: 24,
    location: 'Москва',
    bio: 'Йога инструктор, обожаю природу',
    images: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop'],
    interests: ['Йога', 'Природа', 'Здоровье'],
    verified: true,
    distance: 3,
    lastSeen: '10 минут назад',
  },
  {
    id: '4',
    name: 'Виктория',
    age: 26,
    location: 'Москва',
    bio: 'Дизайнер. Ищу интересного собеседника',
    images: ['https://images.unsplash.com/photo-1517111307730-430a63602ee4?w=400&h=600&fit=crop'],
    interests: ['Дизайн', 'Искусство', 'Культура'],
    verified: true,
    distance: 2,
    lastSeen: '20 минут назад',
  },
  {
    id: '5',
    name: 'София',
    age: 22,
    location: 'Москва',
    bio: 'Студентка ВУЗа, люблю веселье и приключения',
    images: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop'],
    interests: ['Учеба', 'Путешествия', 'Спорт'],
    verified: false,
    distance: 1,
    lastSeen: 'онлайн',
  },
];

interface SwipeCardProps {
  user: User;
  onLike: () => void;
  onDislike: () => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ user, onLike, onDislike }) => {
  const [x, setX] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const dragRef = useRef(null);

  const handleDragEnd = (info: any) => {
    const swipeThreshold = 100;

    if (info.offset.x > swipeThreshold) {
      onLike();
    } else if (info.offset.x < -swipeThreshold) {
      onDislike();
    }
  };

  return (
    <motion.div
      ref={dragRef}
      drag="x"
      dragElastic={0.3}
      onDragEnd={handleDragEnd}
      onDrag={(_, info) => {
        setX(info.offset.x);
        setOpacity(1 - Math.abs(info.offset.x) / 500);
      }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: x > 0 ? 500 : -500, opacity: 0, transition: { duration: 0.3 } }}
      className="swipe-card"
      style={{
        x,
        opacity,
        cursor: 'grab',
      }}
    >
      <div className="card-image-container">
        <img src={user.images[0]} alt={user.name} className="card-image" />

        {user.verified && (
          <div className="card-verified">
            <CheckCircle size={20} />
          </div>
        )}

        {user.zodiac && (
          <div className="card-zodiac">{user.zodiac}</div>
        )}

        <div className="card-info">
          <div className="card-header">
            <h2>{user.name}, {user.age}</h2>
            <div className="card-status">
              {user.lastSeen === 'онлайн' ? (
                <span className="status-online">🟢 Онлайн</span>
              ) : (
                <span className="status-offline">{user.lastSeen}</span>
              )}
            </div>
          </div>

          <div className="card-location">
            <MapPin size={14} />
            <span>{user.location} • {user.distance} км</span>
          </div>

          <p className="card-bio">{user.bio}</p>

          <div className="card-tags">
            {user.interests.slice(0, 3).map((interest, idx) => (
              <span key={idx} className="tag">{interest}</span>
            ))}
          </div>
        </div>

        <div className="card-actions">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDislike}
            className="btn-dislike"
            title="Не нравится"
          >
            <X size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLike}
            className="btn-like"
            title="Нравится"
          >
            <Heart size={24} fill="currentColor" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="btn-super-like"
            title="Супер нравится"
          >
            <Flame size={24} fill="currentColor" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export const SwipeCards: React.FC = () => {
  const { showNewMatch, setShowNewMatch } = useAppStore();
  const [displayCards, setDisplayCards] = useState<User[]>(CARDS_MOCK);

  const handleLike = (userId: string) => {
    const liked = displayCards.find(c => c.id === userId);
    if (liked && Math.random() > 0.7) {
      setShowNewMatch({ show: true, user: liked });
      setTimeout(() => setShowNewMatch({ show: false }), 3000);
    }
    handleRemoveCard(userId);
  };

  const handleDislike = (userId: string) => {
    handleRemoveCard(userId);
  };

  const handleRemoveCard = (userId: string) => {
    setDisplayCards(prev => prev.filter(c => c.id !== userId));
  };

  if (displayCards.length === 0) {
    return (
      <div className="swipe-empty">
        <Flame size={48} />
        <h3>Нет больше профилей!</h3>
        <p>Загляни позже, могут появиться новые</p>
      </div>
    );
  }

  return (
    <div className="swipe-container">
      <AnimatePresence>
        {displayCards.map((card, index) => (
          index === 0 && (
            <SwipeCard
              key={card.id}
              user={card}
              onLike={() => handleLike(card.id)}
              onDislike={() => handleDislike(card.id)}
            />
          )
        ))}
      </AnimatePresence>

      {showNewMatch.show && showNewMatch.user && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="new-match-overlay"
        >
          <div className="new-match-card">
            <div className="match-hearts">
              <Heart size={40} fill="currentColor" />
              <Heart size={40} fill="currentColor" />
            </div>
            <h2>Это судьба!</h2>
            <p>Вы нравитесь друг другу</p>
            <img src={showNewMatch.user.images[0]} alt="match" className="match-image" />
            <h3>{showNewMatch.user.name}, {showNewMatch.user.age}</h3>
            <button className="btn-primary">Написать сообщение</button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
