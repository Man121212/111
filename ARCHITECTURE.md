# 📚 Архитектура и компоненты - СвайпикЛав

## 🏗️ Архитектура приложения

### Слои приложения

```
┌─────────────────────────────────────┐
│      Navigation Component           │
│  (Нижняя навигация, 5 табов)       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         App Component               │
│  (Main router, tab switching)       │
└──────────────┬──────────────────────┘
               │
       ┌───────┴──────────┬──────────────┬──────────────┬─────────┐
       │                  │              │              │         │
┌──────▼──────┐ ┌────────▼────────┐ ┌───▼────────┐ ┌──▼───────┐ ┌▼──────────┐
│SwipeCards   │ │    Matches      │ │   Chat     │ │ Profile  │ │  Likes    │
│Component    │ │   Component     │ │ Component  │ │Component │ │Component  │
└─────────────┘ └─────────────────┘ └────────────┘ └──────────┘ └───────────┘
       │                  │              │              │         │
       └──────────────────┴──────────────┴──────────────┴─────────┘
                          │
                ┌─────────▼──────────┐
                │  Zustand Store     │
                │  (Global State)    │
                └────────────────────┘
```

## 📦 State Management (Zustand)

### Store структура

```typescript
interface AppStore {
  // User data
  currentUser: UserProfile | null
  setCurrentUser: (user: UserProfile | null) => void

  // Карточки для свайпа
  cards: User[]
  setCards: (cards: User[]) => void
  removeCard: (userId: string) => void

  // Мэтчи
  matches: Match[]
  setMatches: (matches: Match[]) => void
  addMatch: (match: Match) => void

  // Сообщения
  messages: Message[]
  setMessages: (messages: Message[]) => void
  addMessage: (message: Message) => void

  // Лайки
  likedUsers: Set<string>
  toggleLike: (userId: string) => void

  // UI состояние
  activeTab: 'discover' | 'likes' | 'matches' | 'messages' | 'profile'
  setActiveTab: (tab: ...) => void

  // Chat состояние
  selectedMatch: string | null
  setSelectedMatch: (matchId: string | null) => void

  // Notifications
  showNewMatch: { show: boolean; user?: User }
  setShowNewMatch: (data: {...}) => void
}
```

## 🧩 Компоненты

### SwipeCards Component
**Файлы:**
- `src/components/SwipeCards/SwipeCards.tsx`
- `src/components/SwipeCards/SwipeCards.css`

**Функциональность:**
- Отображение карточек профилей
- Перетягивание (drag & drop) карточек
- Система лайков/дизлайков
- Анимированные переходы
- Всплывающее уведомление о новом мэтче

**Основные элементы:**
```
┌─────────────────────┐
│  Фото профиля      │ (65% высоты)
├─────────────────────┤
│  Имя, возраст,     │
│  Локация           │ (35% высоты)
│  Интересы          │
├─────────────────────┤
│  ❌  ❤️  🔥       │ (3 кнопки действия)
└─────────────────────┘
```

### Matches Component
**Файлы:**
- `src/components/Matches/Matches.tsx`
- `src/components/Matches/Matches.css`

**Функциональность:**
- Список всех мэтчей
- Быстрый переход в чат
- Показ непрочитанных сообщений
- Статус онлайна/офлайна

**Структура:**
```
┌──────────────────────┐
│  Заголовок          │
├──────────────────────┤
│  [Avatar] Info       │ ← Match item (повторяется)
├──────────────────────┤
│  [Avatar] Info       │
├──────────────────────┤
│  ...                 │
└──────────────────────┘
```

### Chat Component
**Файлы:**
- `src/components/Chat/Chat.tsx`
- `src/components/Chat/Chat.css`

**Функциональность:**
- История сообщений
- Отправка новых сообщений
- Эмодзи пикер
- Ввод текста
- Автоскролл к новым сообщениям

**Структура:**
```
┌────────────────────────┐
│  Header (User info)    │
├────────────────────────┤
│                        │
│  Messages area         │  ← Auto-scroll
│  (входящие/исходящие) │
│                        │
├────────────────────────┤
│  [📎] [text] [😊] [►] │ ← Input area
└────────────────────────┘
```

### Profile Component
**Файлы:**
- `src/components/Profile/Profile.tsx`
- `src/components/Profile/Profile.css`

**Функциональность:**
- Отображение профиля пользователя
- Статистика (лайки, мэтчи, просмотры)
- Управление настройками
- Премиум функции
- Выход из аккаунта

**Структура:**
```
┌──────────────────────┐
│     Фото (круглое)   │
├──────────────────────┤
│  Quick stats (3x)    │
├──────────────────────┤
│  Info + Tags         │
├──────────────────────┤
│  Кнопки действия     │
├──────────────────────┤
│  Статистика         │
├──────────────────────┤
│  Премиум секция      │
└──────────────────────┘
```

### Likes Component
**Файлы:**
- `src/components/Likes/Likes.tsx`
- `src/components/Likes/Likes.css`

**Функциональность:**
- Сетка лайкнутых профилей
- Первые 4 видны полностью
- Остальные заблокированы
- Кнопка премиума

**Структура:**
```
┌─────────────────────┐
│  Header             │
├─────────────────────┤
│  [User] [User]     │ ← 2 колонки
│  [User] [Locked]   │
│  [Locked][Locked]  │
│  ...                │
├─────────────────────┤
│  Premium button     │
└─────────────────────┘
```

### Navigation Component
**Файлы:**
- `src/components/Navigation/Navigation.tsx`
- `src/components/Navigation/Navigation.css`

**Функциональность:**
- 5 основных табов
- Индикатор активного таба
- Плавные переходы
- Иконки и названия

**Структура:**
```
┌─────────────────────┐
│ 🔥 ❤️ 👥 💬 👤 │
│ Открыть Лайки...   │
└─────────────────────┘
     ↑ Нижняя навигация (fixed)
```

## 🔄 Data Flow

### Жизненный цикл мэтча

```
1. SwipeCards: User нажимает лайк
   ↓
2. Zustand: toggleLike(userId) + removeCard(userId)
   ↓
3. Случайная проверка (30% шанс)
   ↓
4. showNewMatch popup appears
   ↓
5. User нажимает "Написать сообщение"
   ↓
6. setActiveTab('messages') + setSelectedMatch(matchId)
   ↓
7. Chat component отображает чат с этим пользователем
```

### Жизненный цикл сообщения

```
1. Chat: User печатает и отправляет сообщение
   ↓
2. Zustand: addMessage(message)
   ↓
3. Messages area автоматически обновляется
   ↓
4. Scroll к новому сообщению
   ↓
5. Через 1 сек: имитация ответа
   ↓
6. addMessage(reply)
```

## 🎨 Стили и CSS

### Глобальные переменные (index.css)
```css
--primary: #667eea      /* Основной фиолет */
--secondary: #764ba2    /* Тёмный фиолет */
--accent: #ff6b6b       /* Розовый/красный */
--text: #1a1a1a         /* Чёрный текст */
--bg: #f5f7fa           /* Светлый фон */
```

### Компонентные стили
Каждый компонент имеет собственный CSS файл:
- `Component.tsx` - Логика
- `Component.css` - Стили

### Медиа запросы
```css
@media (max-width: 480px) {
  /* Мобильные стили */
}

@media (max-width: 1024px) {
  /* Планшет */
}
```

## 📈 Производительность

### Оптимизации
- ✅ Code splitting с Vite
- ✅ CSS modules для изоляции стилей
- ✅ Lazy loading (возможно добавить)
- ✅ Минимизация re-renders (Zustand)
- ✅ Эффективные анимации (Framer Motion)

### Размер бандла
```
dist/index.html           0.45 kB
dist/assets/index-*.css  19.88 kB (4.07 кБ gzip)
dist/assets/index-*.js  342.37 кБ (108.39 кБ gzip)
```

## 🔐 Типизация TypeScript

### Основные типы
```typescript
// User типы
User              // Базовый профиль
UserProfile       // Профиль текущего пользователя
Match             // Совпадение
Message           // Сообщение
```

### Типобезопасность
- ✅ Строгая типизация в компонентах
- ✅ React.FC<Props> для компонентов
- ✅ Type-only imports для типов
- ✅ Zustand типизирован

## 🚀 Будущие улучшения

### Фаза 1: Backend интеграция
- [ ] Подключить API endpoints
- [ ] Аутентификация
- [ ] Реальная база данных

### Фаза 2: Расширение функций
- [ ] Фильтры поиска
- [ ] Система рейтинга
- [ ] Блокировка пользователей
- [ ] Реальные уведомления

### Фаза 3: Социальные функции
- [ ] Видеозвонки
- [ ] Публичные фото
- [ ] Истории (Stories)
- [ ] Рекомендации

### Фаза 4: Монетизация
- [ ] Премиум функции
- [ ] In-app покупки
- [ ] Подписка
