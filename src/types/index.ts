export interface User {
  id: string
  name: string
  email: string
  age?: number
  preferences: UserPreferences
  createdAt: Date
  lastActive: Date
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  notifications: boolean
  ageGroup: 'child' | 'teen' | 'adult' | 'senior'
  accessibility: AccessibilitySettings
}

export interface AccessibilitySettings {
  highContrast: boolean
  largeText: boolean
  reducedMotion: boolean
  screenReader: boolean
}

export interface MoodEntry {
  id: string
  userId: string
  mood: Mood
  intensity: number // 1-10 scale
  emotions: Emotion[]
  triggers?: string[]
  notes?: string
  timestamp: Date
  location?: string
}

export interface Mood {
  id: string
  name: string
  emoji: string
  color: string
  category: 'positive' | 'neutral' | 'negative'
}

export interface Emotion {
  id: string
  name: string
  intensity: number
  category: string
}

export interface Activity {
  id: string
  title: string
  description: string
  type: 'meditation' | 'breathing' | 'journaling' | 'exercise' | 'learning'
  duration: number // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: string
  content: ActivityContent
  points: number
}

export interface ActivityContent {
  instructions: string[]
  audioUrl?: string
  videoUrl?: string
  interactiveElements?: InteractiveElement[]
}

export interface InteractiveElement {
  type: 'button' | 'slider' | 'input' | 'timer'
  id: string
  label: string
  value?: any
}

export interface JournalEntry {
  id: string
  userId: string
  title: string
  content: string
  mood: Mood
  tags: string[]
  isPrivate: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ForumPost {
  id: string
  title: string
  content: string
  author: string // anonymous username
  category: string
  tags: string[]
  isAnonymous: boolean
  likes: number
  replies: ForumReply[]
  createdAt: Date
  updatedAt: Date
}

export interface ForumReply {
  id: string
  content: string
  author: string
  isAnonymous: boolean
  likes: number
  createdAt: Date
}

export interface MindPoint {
  id: string
  userId: string
  points: number
  source: 'journaling' | 'meditation' | 'exercise' | 'forum' | 'learning' | 'streak'
  description: string
  earnedAt: Date
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  points: number
  requirement: AchievementRequirement
  unlockedAt?: Date
}

export interface AchievementRequirement {
  type: 'streak' | 'points' | 'activities' | 'journal_entries'
  value: number
  timeframe?: 'daily' | 'weekly' | 'monthly' | 'all_time'
}

export interface CrisisResource {
  id: string
  name: string
  type: 'hotline' | 'text' | 'chat' | 'website'
  contact: string
  description: string
  country: string
  language: string
  available24h: boolean
}

export interface LearningContent {
  id: string
  title: string
  type: 'article' | 'video' | 'infographic' | 'quiz' | 'animation'
  content: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: number
  tags: string[]
  isInteractive: boolean
  createdAt: Date
}

export interface AnalyticsData {
  userId: string
  period: 'week' | 'month' | 'quarter' | 'year'
  moodTrends: MoodTrend[]
  activityStats: ActivityStats
  engagementMetrics: EngagementMetrics
  insights: string[]
}

export interface MoodTrend {
  date: string
  averageMood: number
  moodCount: number
  dominantEmotion: string
}

export interface ActivityStats {
  totalActivities: number
  completedActivities: number
  favoriteType: string
  totalTimeSpent: number
  streak: number
}

export interface EngagementMetrics {
  dailyActiveMinutes: number
  weeklySessions: number
  featureUsage: Record<string, number>
  retentionRate: number
}

export interface Survey {
  id: string
  userId: string
  type: 'daily' | 'weekly' | 'monthly' | 'initial' | 'custom'
  title: string
  description?: string
  questions: SurveyQuestion[]
  responses: SurveyResponse[]
  completedAt?: Date
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
}

export interface SurveyQuestion {
  id: string
  type: 'mood' | 'scale' | 'multiple_choice' | 'text' | 'boolean' | 'rating'
  question: string
  options?: string[]
  min?: number
  max?: number
  required: boolean
  category: string
}

export interface SurveyResponse {
  questionId: string
  answer: any
  timestamp: Date
}

export interface SurveyTemplate {
  type: 'daily' | 'weekly' | 'monthly' | 'initial' | 'custom'
  title: string
  description: string
  questions: SurveyQuestion[]
}

export interface SurveyAnalytics {
  summary: {
    totalSurveys: number
    completionRate: number
    period: string
  }
  categoryAnalysis: Record<string, any[]>
  moodTrends: Array<{
    date: string
    mood: any
  }>
  stressTrends: Array<{
    date: string
    stress: any
  }>
}

