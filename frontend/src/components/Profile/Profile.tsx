import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Edit, Heart, MessageCircle, Settings, Share2, User } from 'lucide-react';
import './Profile.css';

const USER_PROFILE = {
  id: 'user-1',
  name: 'Дмитрий',
  age: 27,
  location: 'Москва',
  bio: 'Программист, люблю путешествия и хорошую компанию ☕',
  images: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop'],
  interests: ['Путешествия', 'Технологии', 'Музыка'],
  verified: true,
  distance: 0,
  lastSeen: 'сейчас',
  zodiac: 'Близнецы',
  createdAt: '2024-01-15',
  likeCount: 243,
  matchCount: 12,
};

const PROFILE_STATS = [
  { label: 'Лайков', value: USER_PROFILE.likeCount, icon: Heart },
  { label: 'Мэтчей', value: USER_PROFILE.matchCount, icon: MessageCircle },
  { label: 'Просмотров', value: 1200, icon: User },
];

export const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile] = useState(USER_PROFILE);

  const handleLogout = () => {
    alert('Вы вышли из аккаунта');
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img src={profile.images[0]} alt={profile.name} className="profile-image" />
          <div className="profile-verified-badge">
            ✓
          </div>
        </div>

        <div className="profile-quick-stats">
          {PROFILE_STATS.map((stat) => (
            <div key={stat.label} className="stat-item">
              <stat.icon size={20} />
              <div>
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Info */}
      <div className="profile-info">
        <div className="profile-title">
          <h2>{profile.name}, {profile.age}</h2>
          <span className="zodiac-badge">{profile.zodiac}</span>
        </div>

        <div className="profile-location">
          <span>📍 {profile.location}</span>
          <span>🔥 {profile.matchCount} мэтчей</span>
        </div>

        <p className="profile-bio">{profile.bio}</p>

        <div className="profile-interests">
          <h4>Интересы</h4>
          <div className="interests-grid">
            {profile.interests.map((interest, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="interest-tag"
              >
                {interest}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Actions */}
      <div className="profile-actions">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsEditing(!isEditing)}
          className="action-btn primary"
        >
          <Edit size={18} />
          {isEditing ? 'Готово' : 'Редактировать профиль'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="action-btn secondary"
        >
          <Settings size={18} />
          Настройки
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="action-btn secondary"
        >
          <Share2 size={18} />
          Поделиться профилем
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="action-btn danger"
        >
          <LogOut size={18} />
          Выход
        </motion.button>
      </div>

      {/* Profile Stats */}
      <div className="profile-stats-section">
        <h4>Статистика</h4>
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-name">Профиль завершен</p>
            <p className="stat-value-large">85%</p>
          </div>
          <div className="stat-card">
            <p className="stat-name">Рейтинг</p>
            <p className="stat-value-large">4.8 ⭐</p>
          </div>
          <div className="stat-card">
            <p className="stat-name">Активность</p>
            <p className="stat-value-large">95%</p>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="subscription-section">
        <h4>💎 Премиум</h4>
        <p>Получите больше лайков и видите, кто вас лайкнул</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-premium"
        >
          Обновить до премиума
        </motion.button>
      </div>
    </div>
  );
};
