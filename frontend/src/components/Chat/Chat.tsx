import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Paperclip, Smile, Phone, Video, Check, CheckCheck, Loader } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import './Chat.css';

interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    senderId: 'user1',
    text: 'Привет! Как дела? 😊',
    timestamp: '10:30',
    read: true,
    status: 'read',
  },
  {
    id: '2',
    senderId: 'user2',
    text: 'Привет! Спасибо за лайк! Я тоже тебе нравишься',
    timestamp: '10:31',
    read: true,
    status: 'delivered',
  },
  {
    id: '3',
    senderId: 'user1',
    text: 'Это здорово! 🎉 Что ты любишь делать в свободное время?',
    timestamp: '10:32',
    read: true,
    status: 'read',
  },
  {
    id: '4',
    senderId: 'user2',
    text: 'Люблю путешествовать и фотографировать красивые места 📸',
    timestamp: '10:33',
    read: true,
    status: 'delivered',
  },
  {
    id: '5',
    senderId: 'user1',
    text: 'Wow! Я тоже! Есть интересные места в Москве?',
    timestamp: '10:34',
    read: true,
    status: 'read',
  },
  {
    id: '6',
    senderId: 'user2',
    text: 'Конечно! Есть несколько прекрасных мест. Может быть, сходим туда вместе? 😄',
    timestamp: '10:35',
    read: false,
    status: 'delivered',
  },
];

export const Chat: React.FC = () => {
  const { selectedMatch, setSelectedMatch, setActiveTab } = useAppStore();
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      setIsSending(true);
      
      const newMessage: ChatMessage = {
        id: String(messages.length + 1),
        senderId: 'user1',
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        read: false,
        status: 'sending',
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      // Simulate message sent after 0.5 seconds
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => msg.id === newMessage.id ? {...msg, status: 'sent'} : msg)
        );
      }, 500);

      // Simulate message delivered after 1 second
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => msg.id === newMessage.id ? {...msg, status: 'delivered'} : msg)
        );
      }, 1000);

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);

      // Simulate reply after 2-3 seconds
      setTimeout(() => {
        const replies = [
          'Отличная идея! 👍',
          'Не могу дождаться! 😊',
          'Звучит классно! 🎉',
          'Давай! 💪',
          'Ок, я согласна! ❤️',
        ];
        
        const reply: ChatMessage = {
          id: String(messages.length + 2),
          senderId: 'user2',
          text: replies[Math.floor(Math.random() * replies.length)],
          timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          read: false,
          status: 'delivered',
        };
        setMessages(prev => [...prev, reply]);
        setIsTyping(false);
      }, 2000 + Math.random() * 1000);

      setIsSending(false);
    }
  };

  const handleBack = () => {
    setSelectedMatch(null);
    setActiveTab('matches');
  };

  const EMOJI_LIST = ['😊', '😂', '🥰', '😍', '🔥', '💯', '👍', '🎉', '🎊', '❤️', '💕', '😘'];

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sending':
        return <Loader size={12} className="status-icon-sending" />;
      case 'sent':
        return <Check size={12} />;
      case 'delivered':
        return <CheckCheck size={12} />;
      case 'read':
        return <CheckCheck size={12} color="#667eea" />;
      default:
        return null;
    }
  };

  if (!selectedMatch) {
    return (
      <div className="chat-empty">
        <div className="empty-icon">💬</div>
        <p>Выберите чат чтобы начать общение</p>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <motion.button 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.95 }}
          onClick={handleBack} 
          className="btn-back"
        >
          <ArrowLeft size={20} />
        </motion.button>
        <div className="chat-header-info">
          <h3>Мария, 23 ✓</h3>
          <p className="chat-status">🟢 Онлайн сейчас</p>
        </div>
        <div className="chat-actions">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="btn-icon"
            title="Голосовой вызов"
          >
            <Phone size={18} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="btn-icon"
            title="Видеозвонок"
          >
            <Video size={18} />
          </motion.button>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-area">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`message ${msg.senderId === 'user1' ? 'sent' : 'received'}`}
            >
              <div className="message-bubble">
                <p>{msg.text}</p>
                <div className="message-meta">
                  <span className="message-time">{msg.timestamp}</span>
                  {msg.senderId === 'user1' && (
                    <span className="message-status">
                      {getStatusIcon(msg.status)}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="message received typing-indicator"
          >
            <div className="message-bubble">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input-area">
        <div className="input-wrapper">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-input-icon"
            title="Отправить файл"
          >
            <Paperclip size={18} />
          </motion.button>

          <input
            type="text"
            placeholder="Напиши сообщение..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="chat-input"
            disabled={isSending}
          />

          <div className="emoji-container">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowEmoji(!showEmoji)}
              className="btn-input-icon"
              title="Эмодзи"
            >
              <Smile size={18} />
            </motion.button>

            <AnimatePresence>
              {showEmoji && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
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
          disabled={!inputMessage.trim() || isSending}
          title="Отправить сообщение (Enter)"
        >
          <Send size={18} />
        </motion.button>
      </div>
    </div>
  );
};
