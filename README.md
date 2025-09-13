# 🧠 MindSpace - Mental Health Platform

A comprehensive, full-stack mental health platform designed to provide personalized, immersive, and supportive experiences for users of all ages. Built with Next.js, Node.js, and modern web technologies.

## ✨ Features

### 🏠 **Homepage**
- Calm, friendly interface with motivational taglines
- Soft animations and interactive elements
- Responsive design for all devices

### 📊 **Personalized Dashboard**
- Interactive mood tracking with 5-point emoji scale
- Mental wellness tools grid
- Quick actions for common activities
- Recent activities timeline
- Achievement system with points and streaks
- Emergency resources prominently displayed

### 📈 **Advanced Mood Tracking**
- Visual mood trends with Recharts integration
- Emotion distribution pie charts
- Energy and stress level tracking
- Trigger identification and logging
- Notes and context capture
- Historical data visualization
- AI-powered insights and patterns

### 🧘 **Guided Activities**
- **Meditation**: 5-minute mindfulness, body scan, loving-kindness
- **Breathing**: 4-7-8, box breathing, alternate nostril
- **Journaling**: Gratitude, emotional check-ins, future self letters
- **Movement**: Gentle yoga and stretching exercises
- Progress tracking and completion rewards

### 👥 **Community Support**
- Anonymous discussion forums with categories
- AI-moderated chatrooms
- Search and filter functionality
- Post creation with tags and categories
- Community guidelines and safety features

### 📚 **Learning Hub**
- Featured content with ratings and reviews
- Category-based learning (anxiety, depression, mindfulness, etc.)
- Micro-articles and quick reads
- Interactive assessments and tools
- Difficulty levels and progress tracking

### 🚨 **Crisis Support**
- Emergency hotlines (988, Crisis Text Line, NAMI)
- Immediate coping strategies with step-by-step guides
- Safety planning framework
- Warning signs identification
- International resources

### 🎮 **Gamification System**
- **Mind Points** - Earn points for activities
- **Achievement System** - Unlock badges and rewards
- **Streak Tracking** - Daily engagement rewards
- **Level System** - Progress through wellness levels
- **Points Guide** - Clear earning mechanisms

### 🌍 **Accessibility & Internationalization**
- **Dark/Light Mode** - Full theme support with system detection
- **Multi-language Support** - English, Spanish, French
- **Responsive Design** - Works on all devices
- **High Contrast** - Accessible color schemes
- **Screen Reader** - Proper ARIA labels and semantic HTML

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Heroicons
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Cache**: Redis
- **Authentication**: JWT
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **AI**: OpenAI API
- **Real-time**: Socket.IO
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

### DevOps
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx
- **Database**: MongoDB
- **Cache**: Redis
- **SSL**: Self-signed certificates (development)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 5+
- Redis 6+
- Docker (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mental-health-app
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment Setup**
   ```bash
   # Frontend
   cp .env.local.example .env.local
   
   # Backend
   cd backend
   cp env.example .env
   cd ..
   ```

5. **Start the development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   npm run dev
   ```

### Docker Deployment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📁 Project Structure

```
mental-health-app/
├── src/                    # Frontend source code
│   ├── app/               # Next.js app router pages
│   ├── components/        # React components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript types
├── backend/               # Backend API
│   ├── src/              # Backend source code
│   ├── uploads/          # File uploads
│   └── Dockerfile        # Backend Docker config
├── nginx/                # Nginx configuration
├── docker-compose.yml    # Docker services
├── Dockerfile.frontend   # Frontend Docker config
└── README.md
```

## 🔧 Development

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
```

### Backend Scripts
```bash
cd backend
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm test            # Run tests
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevent brute force attacks
- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: MongoDB sanitization
- **XSS Protection**: Input sanitization
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers
- **File Upload Security**: Type and size validation

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh-token` - Refresh access token

### Mood Tracking
- `POST /api/moods` - Create mood entry
- `GET /api/moods` - Get mood entries
- `GET /api/moods/analytics` - Get mood analytics
- `GET /api/moods/trends` - Get mood trends
- `GET /api/moods/insights` - Get AI-powered insights

### Activities
- `GET /api/activities` - Get activities
- `POST /api/activities/:id/complete` - Complete activity

### Community
- `GET /api/forum` - Get forum posts
- `POST /api/forum` - Create forum post
- `POST /api/forum/:id/like` - Like/unlike post

### Learning
- `GET /api/learning` - Get learning content
- `POST /api/learning/:id/read` - Mark content as read

### Crisis Support
- `GET /api/crisis/resources` - Get crisis resources
- `GET /api/crisis/coping-strategies` - Get coping strategies

### AI Features
- `POST /api/ai/recommendations` - Get content recommendations
- `POST /api/ai/moderate` - Moderate content
- `POST /api/ai/chat` - Chat with AI

## 🧪 Testing

```bash
# Frontend tests
npm test

# Backend tests
cd backend
npm test
```

## 🐳 Docker

The application is fully containerized with Docker:

- **Frontend**: Next.js production build
- **Backend**: Node.js Express API
- **Database**: MongoDB
- **Cache**: Redis
- **Proxy**: Nginx

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🌐 Internationalization

- **Languages**: English, Spanish, French
- **RTL Support**: Ready for right-to-left languages
- **Date/Time**: Localized formatting
- **Currency**: Multi-currency support

## 🔄 Real-time Features

- **WebSocket**: Live chat and notifications
- **Mood Updates**: Real-time mood sharing
- **Activity Completion**: Live activity updates
- **Community**: Real-time forum interactions

## 📈 Performance

- **Frontend**: Next.js optimization, code splitting
- **Backend**: Redis caching, database indexing
- **Images**: Optimized with Next.js Image component
- **CDN**: Cloudinary integration for assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Changelog

### v1.0.0
- Complete mental health platform
- Frontend with Next.js 15
- Backend API with Node.js/Express
- MongoDB database
- Real-time features
- AI integration
- Docker deployment
- Multi-language support
- Accessibility features
- Gamification system

---

**Built with ❤️ for mental health awareness and support**