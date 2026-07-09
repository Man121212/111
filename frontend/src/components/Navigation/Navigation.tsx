import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Heart, MessageCircle, Users, User } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import './Navigation.css';

const NAV_ITEMS = [
  { id: 'discover', label: 'Открыть', icon: Flame },
  { id: 'likes', label: 'Лайки', icon: Heart },
  { id: 'matches', label: 'Мэтчи', icon: Users },
  { id: 'messages', label: 'Чат', icon: MessageCircle },
  { id: 'profile', label: 'Профиль', icon: User },
];

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <nav className="navigation">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <motion.button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`nav-item ${isActive ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ scale: isActive ? 1.2 : 1 }}
              className="nav-icon"
            >
              <Icon size={24} />
            </motion.div>
            <span className="nav-label">{item.label}</span>
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                className="nav-indicator"
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
};
