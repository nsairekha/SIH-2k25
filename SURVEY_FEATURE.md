# Mental Health Survey Feature

## Overview

The Mental Health Survey feature provides comprehensive assessment tools to help users track their mental health and well-being. It includes various survey types with different question formats to gather meaningful insights about users' mental health patterns.

## Features

### Survey Types

1. **Daily Wellness Check-in**
   - Quick daily assessment of mood, energy, stress, and sleep
   - 8 questions covering mood, energy levels, stress, sleep quality, anxiety, social interaction, exercise, and gratitude
   - Takes 2-3 minutes to complete

2. **Weekly Mental Health Assessment**
   - Comprehensive weekly review of mental health and well-being
   - 10 questions covering overall wellbeing, mood patterns, stress sources, coping strategies, sleep patterns, social connections, productivity, challenges, achievements, and goals
   - Takes 5-7 minutes to complete

3. **Initial Mental Health Assessment**
   - Comprehensive initial assessment for new users
   - 10 questions covering current mood, mental health concerns, stress levels, sleep quality, social support, therapy history, medication, crisis support, goals, and activity preferences
   - Takes 5-7 minutes to complete

### Question Types

- **Mood**: Visual mood selection with emojis (1-5 scale)
- **Scale**: Numeric slider input (customizable min/max)
- **Rating**: Multiple choice rating options
- **Multiple Choice**: Select multiple options from a list
- **Boolean**: Yes/No questions
- **Text**: Open-ended text responses

### Key Features

- **Progress Tracking**: Visual progress bar during survey completion
- **Question Navigation**: Previous/Next navigation with validation
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Full dark/light theme compatibility
- **Data Analytics**: Survey completion tracking and analytics
- **Template System**: Pre-built survey templates for different use cases

## Technical Implementation

### Backend

#### Models
- **Survey Model** (`/backend/src/models/Survey.ts`)
  - Stores survey metadata, questions, and responses
  - Supports different survey types and question formats
  - Includes completion tracking and timestamps

#### Controllers
- **Survey Controller** (`/backend/src/controllers/surveyController.ts`)
  - CRUD operations for surveys
  - Survey template management
  - Response submission and validation
  - Analytics and reporting

#### Routes
- **Survey Routes** (`/backend/src/routes/survey.ts`)
  - RESTful API endpoints for survey operations
  - Authentication middleware integration

### Frontend

#### Components
- **Survey Page** (`/src/app/surveys/page.tsx`)
  - Main survey interface with template selection
  - Survey form with dynamic question rendering
  - Progress tracking and navigation
  - Response submission and completion

#### API Integration
- **API Service** (`/src/lib/api.ts`)
  - Centralized API functions for survey operations
  - Error handling and response processing
  - Type-safe API calls

#### Types
- **TypeScript Definitions** (`/src/types/index.ts`)
  - Survey, SurveyQuestion, SurveyResponse interfaces
  - SurveyTemplate and SurveyAnalytics types

## API Endpoints

### Survey Management
- `GET /api/surveys` - Get user's surveys
- `POST /api/surveys` - Create new survey
- `GET /api/surveys/:id` - Get survey by ID
- `DELETE /api/surveys/:id` - Delete survey

### Survey Templates
- `GET /api/surveys/templates` - Get available survey templates
- `GET /api/surveys/templates?type=daily` - Get specific template type

### Survey Responses
- `POST /api/surveys/:id/responses` - Submit survey responses

### Analytics
- `GET /api/surveys/analytics` - Get survey analytics and insights

## Usage

### Creating a Survey
1. Navigate to the Surveys page
2. Click "New Survey" button
3. Select a survey template (Daily, Weekly, or Initial)
4. Survey is created and ready to complete

### Completing a Survey
1. Select an incomplete survey from the list
2. Answer questions using the appropriate input method
3. Navigate between questions using Previous/Next buttons
4. Submit responses when all required questions are answered

### Viewing Results
- Completed surveys show completion date
- Analytics provide insights into patterns and trends
- Data can be used for mood tracking and mental health monitoring

## Integration Points

### Navigation
- Added to main navigation menu
- Accessible from dashboard quick actions
- Featured in mental health tools section

### Dashboard Integration
- Survey completion tracking
- Quick access to create new surveys
- Recent survey activity display

### Mood Tracker Integration
- Survey data can complement mood tracking
- Shared analytics and insights
- Cross-referenced mental health data

## Future Enhancements

1. **Custom Surveys**: Allow users to create personalized surveys
2. **Scheduled Surveys**: Automatic survey reminders and scheduling
3. **Advanced Analytics**: More detailed insights and pattern recognition
4. **Export Data**: Allow users to export their survey data
5. **Professional Integration**: Share results with mental health professionals
6. **AI Insights**: AI-powered recommendations based on survey responses
7. **Progress Tracking**: Long-term trend analysis and goal setting

## Security & Privacy

- All survey data is encrypted and stored securely
- User authentication required for all survey operations
- Data is only accessible to the survey owner
- Compliance with mental health data privacy regulations
- Option for anonymous survey responses

## Accessibility

- Screen reader compatible
- Keyboard navigation support
- High contrast mode support
- Large text options
- Reduced motion support
- Multi-language support (English, Spanish, French)

## Testing

The survey feature includes comprehensive testing for:
- Survey creation and management
- Question rendering and validation
- Response submission and storage
- Analytics and reporting
- Error handling and edge cases
- Mobile responsiveness
- Accessibility compliance

