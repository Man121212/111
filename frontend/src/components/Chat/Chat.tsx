import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Paperclip, Smile, Phone, Video } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import './Chat.css';

const CHAT_MESSAGES = [
  {
    id: '1',
    senderId: 'user1',
    text: 'Привет! Как дела? 😊',
    timestamp: '10:30',
    read: true,
  },
  {
    id: '2',
    senderId: 'user2',
    text: 'Привет! Спасибо за лайк! Я тоже тебе нравишься',
    timestamp: '10:31',
    read: true,
  },
  {
    id: '3',
    senderId: 'user1',
    text: 'Это здорово! 🎉 Что ты любишь делать в свободное время?',
    timestamp: '10:32',
    read: true,
  },
  {
    id: '4',
    senderId: 'user2',
    text: 'Люблю путешествовать и фотографировать красивые места 📸',
    timestamp: '10:33',
    read: true,
  },
  {
    id: '5',
    senderId: 'user1',
    text: 'Wow! Я тоже! Есть интересные места в Москве?',
    timestamp: '10:34',
    read: true,
  },
  {
    id: '6',
    senderId: 'user2',
    text: 'Конечно! Есть несколько прекрасных мест. Может быть, сходим туда вместе? 😄',
    timestamp: '10:35',
    read: false,
  },
];

export const Chat: React.FC = () => {
  const { selectedMatch, setSelectedMatch, setActiveTab } = useAppStore();
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: String(messages.length + 1),
        senderId: 'user1',
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      // Simulate reply after 1 second
      setTimeout(() => {
        const reply = {
          id: String(messages.length + 2),
          senderId: 'user2',
          text: 'Отличная идея! 👍',
          timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          read: true,
        };
        setMessages(prev => [...prev, reply]);
      }, 1000);
    }
  };

  const handleBack = () => {
    setSelectedMatch(null);
    setActiveTab('matches');
  };

  const EMOJI_LIST = ['😊', '😂', '🥰', '😍', '🔥', '💯', '👍', '🎉', '🎊', '❤️', '💕', '😘'];

  if (!selectedMatch) {
    return (
      <div className="chat-empty">
        <p>Выберите чат</p>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <button onClick={handleBack} className="btn-back">
          <ArrowLeft size={20} />
        </button>
        <div className="chat-header-info">
          <h3>Мария, 23</h3>
          <p>Онлайн сейчас</p>
        </div>
        <div className="chat-actions">
          <motion.button whileHover={{ scale: 1.1 }} className="btn-icon">
            <Phone size={18} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} className="btn-icon">
            <Video size={18} />
          </motion.button>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-area">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`message ${msg.senderId === 'user1' ? 'sent' : 'received'}`}
            >
              <div className="message-bubble">
                <p>{msg.text}</p>
                <span className="message-time">{msg.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input-area">
        <div className="input-wrapper">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-input-icon"
          >
            <Paperclip size={18} />
          </motion.button>

          <input
            type="text"
            placeholder="Напиши сообщение..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            className="chat-input"
          />

          <div className="emoji-container">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowEmoji(!showEmoji)}
              className="btn-input-icon"
            >
              <Smile size={18} />
            </motion.button>

            <AnimatePresence>
              {showEmoji && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="emoji-picker"
                >
                  {EMOJI_LIST.map((emoji) => (
                    <motion.button
                      key={emoji}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => {
                        setInputMessage(inputMessage + emoji);
                        setShowEmoji(false);
                      }}
                      className="emoji-btn"
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSendMessage}
          className="btn-send"
          disabled={!inputMessage.trim()}
        >
          <Send size={18} />
        </motion.button>
      </div>
    </div>
  );
};
