import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock } from 'lucide-react';
import './Likes.css';

const LIKED_USERS = [
  {
    id: '1',
    name: 'Мария',
    age: 23,
    location: 'Москва',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    verified: true,
  },
  {
    id: '2',
    name: 'Анна',
    age: 25,
    location: 'Москва',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    verified: true,
  },
  {
    id: '3',
    name: 'Елена',
    age: 24,
    location: 'Москва',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    verified: true,
  },
  {
    id: '4',
    name: 'Виктория',
    age: 26,
    location: 'Москва',
    image: 'https://images.unsplash.com/photo-1517111307730-430a63602ee4?w=200&h=200&fit=crop',
    verified: true,
  },
  {
    id: '5',
    name: 'Зайцы скрыты',
    age: 0,
    location: '',
    image: '',
    verified: false,
    locked: true,
  },
  {
    id: '6',
    name: 'Зайцы скрыты',
    age: 0,
    location: '',
    image: '',
    verified: false,
    locked: true,
  },
];

export const Likes: React.FC = () => {
  return (
    <div className="likes-container">
      <div className="likes-header">
        <Heart size={32} className="header-icon" />
        <h2>Кто тебе нравится</h2>
        <p className="likes-count">{LIKED_USERS.length} лайков</p>
      </div>

      <div className="likes-grid">
        {LIKED_USERS.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="like-card"
          >
            {user.locked ? (
              <div className="lock-overlay">
                <Lock size={40} />
                <p>Премиум</p>
              </div>
            ) : (
              <>
                <img src={user.image} alt={user.name} className="like-image" />
                <div className="like-info">
                  <h3>{user.name}, {user.age}</h3>
                  <p>{user.location}</p>
                  {user.verified && <span className="verified-check">✓</span>}
                </div>
                <Heart className="like-badge" size={24} fill="currentColor" />
              </>
            )}
          </motion.div>
        ))}
      </div>

      <div className="likes-footer">
        <p>💎 Обновитесь до премиума, чтобы видеть все лайки</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-premium"
        >
          Перейти на премиум
        </motion.button>
      </div>
    </div>
  );
};
