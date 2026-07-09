import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import './Matches.css';

const MATCHES_MOCK = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Мария',
      age: 23,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      status: 'онлайн',
    },
    matchedAt: '2 дня назад',
    lastMessage: 'Привет! Как дела? 😊',
    unreadCount: 2,
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'Анна',
      age: 25,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      status: 'онлайн',
    },
    matchedAt: '1 день назад',
    lastMessage: 'Давай встретимся?',
    unreadCount: 0,
  },
  {
    id: '3',
    user: {
      id: '3',
      name: 'Елена',
      age: 24,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      status: 'был(а) 15 мин',
    },
    matchedAt: '3 дня назад',
    lastMessage: 'Спасибо за приглашение!',
    unreadCount: 0,
  },
  {
    id: '4',
    user: {
      id: '4',
      name: 'Виктория',
      age: 26,
      image: 'https://images.unsplash.com/photo-1517111307730-430a63602ee4?w=100&h=100&fit=crop',
      status: 'был(а) 1ч',
    },
    matchedAt: '5 дней назад',
    lastMessage: 'Я тебе нравлюсь? 😁',
    unreadCount: 1,
  },
];

export const Matches: React.FC = () => {
  const { setSelectedMatch, setActiveTab } = useAppStore();

  const handleSelectMatch = (matchId: string) => {
    setSelectedMatch(matchId);
    setActiveTab('messages');
  };

  return (
    <div className="matches-container">
      <div className="matches-header">
        <h2>Мэтчи</h2>
        <p className="matches-count">{MATCHES_MOCK.length} совпадений</p>
      </div>

      <div className="matches-list">
        {MATCHES_MOCK.map((match, index) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleSelectMatch(match.id)}
            className="match-item"
          >
            <div className="match-avatar-wrapper">
              <img src={match.user.image} alt={match.user.name} className="match-avatar" />
              <div className={`status-indicator ${match.user.status === 'онлайн' ? 'online' : 'offline'}`} />
            </div>

            <div className="match-info">
              <div className="match-header">
                <h3>{match.user.name}, {match.user.age}</h3>
                <span className="match-time">{match.matchedAt}</span>
              </div>
              <p className="last-message">{match.lastMessage}</p>
              <p className="match-status">{match.user.status}</p>
            </div>

            {match.unreadCount > 0 && (
              <div className="unread-badge">{match.unreadCount}</div>
            )}

            <motion.div
              whileHover={{ scale: 1.1 }}
              className="match-action"
            >
              <MessageCircle size={20} />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="matches-footer">
        <p>💝 Это мэтчи, которые нравятся друг другу</p>
      </div>
    </div>
  );
};
