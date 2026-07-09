import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, MapPin, Flame, CheckCircle, RotateCcw } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import type { User, LikeType } from '../../types';
import './SwipeCards.css';

// Расширенный набор тестовых карточек
const CARDS_MOCK: User[] = [
  {
    id: '1',
    name: 'Мария',
    age: 23,
    location: 'Москва',
    bio: 'Люблю путешествия и хорошие кино 🌍',
    images: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop'],
    interests: ['Путешествия', 'Кино', 'Музыка'],
    verified: true,
    distance: 2,
    lastSeen: '5 минут назад',
    zodiac: 'Весы',
    isOnline: true,
    responseRate: 95,
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
    isOnline: true,
    responseRate: 88,
  },
  {
    id: '3',
    name: 'Елена',
    age: 24,
    location: 'Москва',
    bio: 'Йога инструктор, обожаю природу 🧘‍♀️',
    images: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop'],
    interests: ['Йога', 'Природа', 'Здоровье'],
    verified: true,
    distance: 3,
    lastSeen: '10 минут назад',
    isOnline: false,
    responseRate: 92,
  },
  {
    id: '4',
    name: 'Виктория',
    age: 26,
    location: 'Москва',
    bio: 'Дизайнер. Ищу интересного собеседника 🎨',
    images: ['https://images.unsplash.com/photo-1517111307730-430a63602ee4?w=400&h=600&fit=crop'],
    interests: ['Дизайн', 'Искусство', 'Культура'],
    verified: true,
    distance: 2,
    lastSeen: '20 минут назад',
    isOnline: true,
    responseRate: 85,
  },
  {
    id: '5',
    name: 'София',
    age: 22,
    location: 'Москва',
    bio: 'Студентка ВУЗа, люблю веселье и приключения 🎉',
    images: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop'],
    interests: ['Учеба', 'Путешествия', 'Спорт'],
    verified: false,
    distance: 1,
    lastSeen: 'онлайн',
    isOnline: true,
    responseRate: 90,
  },
  {
    id: '6',
    name: 'Ольга',
    age: 28,
    location: 'Москва',
    bio: 'Маркетолог с опытом. Люблю вино и искусство 🍷',
    images: ['https://images.unsplash.com/photo-1516756387261-38c46f338dfe?w=400&h=600&fit=crop'],
    interests: ['Искусство', 'Вино', 'Путешествия'],
    verified: true,
    distance: 4,
    lastSeen: '30 минут назад',
    isOnline: false,
    responseRate: 88,
  },
];

interface SwipeCardProps {
  user: User;
  onLike: (type: LikeType) => void;
  onDislike: () => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ user, onLike, onDislike }) => {
  const [x, setX] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const dragRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleDragEnd = (info: any) => {
    const swipeThreshold = 100;

    if (info.offset.x > swipeThreshold) {
      onLike('like');
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
          <div className="card-verified" title="Верифицированный профиль">
            <CheckCircle size={20} />
          </div>
        )}

        {user.zodiac && (
          <div className="card-zodiac">{user.zodiac}</div>
        )}

        {user.responseRate && (
          <div className="card-response-rate">
            {user.responseRate}% отвечают
          </div>
        )}

        <div className="card-info">
          <div className="card-header">
            <h2>{user.name}, {user.age}</h2>
            <div className="card-status">
              {user.isOnline ? (
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
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={onDislike}
            className="btn-dislike"
            title="Пропустить (Свайп влево или X)"
          >
            <X size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onLike('like')}
            className="btn-like"
            title="Нравится (Свайп вправо или ❤️)"
          >
            <Heart size={24} fill="currentColor" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onLike('super-like')}
            className="btn-super-like"
            title="Супер лайк - Выделись! (только 3 в день)"
          >
            <Flame size={24} fill="currentColor" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export const SwipeCards: React.FC = () => {
  const { 
    showNewMatch, 
    setShowNewMatch,
    toggleLike,
    undoLastCard,
    history,
    isLoading,
  } = useAppStore();
  const [displayCards, setDisplayCards] = useState<User[]>(CARDS_MOCK);
  const [likedProfiles, setLikedProfiles] = useState<Set<string>>(new Set());

  const handleLike = (userId: string, type: LikeType) => {
    const liked = displayCards.find(c => c.id === userId);
    
    if (liked) {
      toggleLike(userId, type);
      
      // Симуляция матча
      if (Math.random() > 0.65) {
        setShowNewMatch({ show: true, user: liked });
        setTimeout(() => setShowNewMatch({ show: false }), 3500);
      }
    }
    
    handleRemoveCard(userId);
  };

  const handleDislike = (userId: string) => {
    handleRemoveCard(userId);
  };

  const handleRemoveCard = (userId: string) => {
    setDisplayCards(prev => prev.filter(c => c.id !== userId));
  };

  const handleUndo = () => {
    if (history.length > 0) {
      undoLastCard();
      // Восстанавливаем карточку в отображение
      const lastCard = history[history.length - 1];
      if (lastCard) {
        setDisplayCards(prev => [lastCard, ...prev]);
      }
    }
  };

  const handleSuperLike = (userId: string) => {
    handleLike(userId, 'super-like');
  };

  if (displayCards.length === 0) {
    return (
      <motion.div 
        className="swipe-empty"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Flame size={56} color="#ff6b6b" />
        </motion.div>
        <h3>Нет больше профилей! 🎯</h3>
        <p>Хорошая новость — ты уже всех пересмотрел(-а)</p>
        <p>Загляни позже, загрузятся новые профили</p>
        {history.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUndo}
            className="btn-undo-empty"
          >
            <RotateCcw size={18} />
            Вернуть последнюю карточку
          </motion.button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="swipe-container">
      {/* Undo Button */}
      {history.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="undo-button-container"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUndo}
            className="btn-undo"
            title={`Вернуть последнюю карточку (осталось: ${history.length})`}
          >
            <RotateCcw size={18} />
            Отмена
          </motion.button>
        </motion.div>
      )}

      {/* Cards Counter */}
      <div className="cards-counter">
        <span>{displayCards.length} профилей осталось</span>
      </div>

      <AnimatePresence>
        {displayCards.map((card, index) => (
          index === 0 && (
            <SwipeCard
              key={card.id}
              user={card}
              onLike={(type) => handleLike(card.id, type)}
              onDislike={() => handleDislike(card.id)}
            />
          )
        ))}
      </AnimatePresence>

      {/* New Match Popup */}
      {showNewMatch.show && showNewMatch.user && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          className="new-match-overlay"
        >
          <motion.div
            className="new-match-card"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <motion.div
              className="match-hearts"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Heart size={40} fill="currentColor" color="#ff6b6b" />
              <Heart size={40} fill="currentColor" color="#ff6b6b" />
            </motion.div>
            <h2>🎉 Это судьба!</h2>
            <p>Вы нравитесь друг другу!</p>
            <img src={showNewMatch.user.images[0]} alt="match" className="match-image" />
            <h3>{showNewMatch.user.name}, {showNewMatch.user.age}</h3>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              💬 Написать сообщение
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
