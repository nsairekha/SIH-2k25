# MindSpace Backend API

A comprehensive Node.js/Express backend API for the MindSpace mental health platform, built with TypeScript, MongoDB, and modern security practices.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with refresh tokens
- **User Management**: Complete user profiles with preferences
- **Mood Tracking**: Advanced mood logging with analytics and insights
- **Activities**: Guided meditation, breathing exercises, and wellness activities
- **Community**: Anonymous forums with AI moderation
- **Learning Hub**: Educational content and interactive tools
- **Crisis Support**: Emergency resources and safety planning
- **AI Integration**: Content recommendations and intelligent insights
- **Real-time Features**: WebSocket support for live chat and notifications
- **File Upload**: Secure image upload with Cloudinary integration
- **Email Service**: Automated emails for verification and notifications

## 🛠️ Tech Stack

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

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── services/        # Business logic services
│   ├── utils/           # Utility functions
│   ├── config/          # Configuration files
│   └── server.ts        # Main server file
├── uploads/             # File upload directory
├── dist/                # Compiled JavaScript
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB 5+
- Redis 6+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mental-health-app/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
HOST=localhost

# Database
MONGODB_URI=mongodb://localhost:27017/mindspace
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-secret-key-here
JWT_REFRESH_EXPIRE=30d

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@mindspace.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# CORS
CORS_ORIGIN=http://localhost:3000
CLIENT_URL=http://localhost:3000
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/verify-email/:token` - Verify email
- `GET /api/auth/profile` - Get user profile

### Mood Tracking Endpoints

- `POST /api/moods` - Create mood entry
- `GET /api/moods` - Get mood entries
- `GET /api/moods/analytics` - Get mood analytics
- `GET /api/moods/trends` - Get mood trends
- `GET /api/moods/insights` - Get AI-powered insights
- `GET /api/moods/:id` - Get specific mood entry
- `PUT /api/moods/:id` - Update mood entry
- `DELETE /api/moods/:id` - Delete mood entry

### Activities Endpoints

- `GET /api/activities` - Get activities
- `GET /api/activities/:id` - Get specific activity
- `POST /api/activities/:id/complete` - Complete activity
- `GET /api/activities/stats` - Get activity statistics

### Community Endpoints

- `GET /api/forum` - Get forum posts
- `POST /api/forum` - Create forum post
- `GET /api/forum/:id` - Get specific post
- `POST /api/forum/:id/like` - Like/unlike post
- `POST /api/forum/:id/reply` - Reply to post
- `GET /api/forum/search` - Search posts

### Learning Endpoints

- `GET /api/learning` - Get learning content
- `GET /api/learning/:id` - Get specific content
- `POST /api/learning/:id/read` - Mark content as read
- `GET /api/learning/recommendations` - Get recommendations

### Crisis Support Endpoints

- `GET /api/crisis/resources` - Get crisis resources
- `GET /api/crisis/coping-strategies` - Get coping strategies
- `GET /api/crisis/safety-plan` - Get safety plan
- `POST /api/crisis/safety-plan` - Create safety plan

### AI Endpoints

- `POST /api/ai/recommendations` - Get content recommendations
- `POST /api/ai/moderate` - Moderate content
- `POST /api/ai/insights` - Generate insights
- `POST /api/ai/chat` - Chat with AI
- `POST /api/ai/analyze-mood` - Analyze mood patterns

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

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🐳 Docker Deployment

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Docker Build

```bash
# Build image
docker build -t mindspace-backend .

# Run container
docker run -p 5000:5000 --env-file .env mindspace-backend
```

## 📊 Monitoring & Logging

- **Winston**: Structured logging
- **Morgan**: HTTP request logging
- **Health Checks**: `/health` endpoint
- **Error Tracking**: Comprehensive error handling

## 🔧 Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
npm run format      # Format code with Prettier
```

### Code Style

- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Conventional commits

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
- Initial release
- Complete API implementation
- Authentication system
- Mood tracking
- Community features
- AI integration
- Real-time features


