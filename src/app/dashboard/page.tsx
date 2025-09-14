'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  HeartIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  ShieldExclamationIcon,
  CalendarIcon,
  ClockIcon,
  FireIcon,
  StarIcon,
  UserGroupIcon,
  LightBulbIcon,
  PlayIcon,
  PlusIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { getGreeting } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { moodAPI } from '@/lib/api'
import PointsSystem from '@/components/features/PointsSystem'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts'

const mentalHealthFeatures = [
  {
    id: 'mood-check',
    title: 'Daily Mood Check',
    description: 'Track your emotional state and identify patterns',
    icon: HeartIcon,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    borderColor: 'border-pink-200 dark:border-pink-800',
    href: '/mood-tracker'
  },
  {
    id: 'wellness-survey',
    title: 'Wellness Survey',
    description: 'Complete personalized assessments and get insights',
    icon: ChartBarIcon,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    href: '/surveys'
  },
  {
    id: 'talk-to-someone',
    title: 'Talk to Someone',
    description: 'Connect with mental health professionals or peers',
    icon: ChatBubbleLeftRightIcon,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    href: '/talk'
  },
  {
    id: 'crisis-support',
    title: 'Crisis Support',
    description: '24/7 emergency resources and immediate help',
    icon: ShieldExclamationIcon,
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    href: '/crisis'
  },
  {
    id: 'guided-activities',
    title: 'Guided Activities',
    description: 'Meditation, breathing exercises, and mindfulness',
    icon: BookOpenIcon,
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    href: '/activities'
  },
  {
    id: 'learning-hub',
    title: 'Learning Hub',
    description: 'Educational content and mental health resources',
    icon: LightBulbIcon,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    href: '/learning'
  }
]

const quickActions = [
  {
    title: 'Log Today\'s Mood',
    description: 'How are you feeling right now?',
    icon: HeartIcon,
    color: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-100 dark:bg-pink-900/30'
  },
  {
    title: 'Take Wellness Survey',
    description: 'Complete a mental health assessment',
    icon: DocumentTextIcon,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'Start Meditation',
    description: 'Take a 5-minute mindfulness break',
    icon: PlayIcon,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    title: 'Journal Entry',
    description: 'Reflect on your day',
    icon: BookOpenIcon,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30'
  },
  {
    title: 'Connect with Community',
    description: 'Join a supportive discussion',
    icon: UserGroupIcon,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  }
]

const recentActivities = [
  {
    id: 1,
    title: 'Completed Daily Mood Check',
    time: '2 hours ago',
    type: 'mood',
    icon: HeartIcon,
    color: 'text-pink-600 dark:text-pink-400'
  },
  {
    id: 2,
    title: 'Finished 10-minute Meditation',
    time: 'Yesterday',
    type: 'meditation',
    icon: PlayIcon,
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    id: 3,
    title: 'Completed Wellness Survey',
    time: '3 days ago',
    type: 'survey',
    icon: ChartBarIcon,
    color: 'text-blue-600 dark:text-blue-400'
  }
]

const achievements = [
  {
    title: '7-Day Streak',
    description: 'Logged mood for 7 consecutive days',
    icon: FireIcon,
    color: 'text-orange-500',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30'
  },
  {
    title: 'Mindful Explorer',
    description: 'Completed 10 guided activities',
    icon: StarIcon,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
  },
  {
    title: 'Community Helper',
    description: 'Helped 5 community members',
    icon: UserGroupIcon,
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  }
]

// Survey questions and options
const surveyQuestions = [
  {
    id: 'daily_mood',
    question: 'How was your day overall?',
    type: 'multiple_choice',
    options: [
      { value: 'excellent', label: 'Excellent', color: '#10B981' },
      { value: 'good', label: 'Good', color: '#3B82F6' },
      { value: 'okay', label: 'Okay', color: '#F59E0B' },
      { value: 'poor', label: 'Poor', color: '#EF4444' },
      { value: 'terrible', label: 'Terrible', color: '#8B5CF6' }
    ]
  },
  {
    id: 'stress_level',
    question: 'How stressed do you feel today?',
    type: 'scale',
    options: [
      { value: 1, label: 'Very Low', color: '#10B981' },
      { value: 2, label: 'Low', color: '#3B82F6' },
      { value: 3, label: 'Moderate', color: '#F59E0B' },
      { value: 4, label: 'High', color: '#EF4444' },
      { value: 5, label: 'Very High', color: '#8B5CF6' }
    ]
  },
  {
    id: 'sleep_quality',
    question: 'How well did you sleep last night?',
    type: 'multiple_choice',
    options: [
      { value: 'excellent', label: 'Excellent', color: '#10B981' },
      { value: 'good', label: 'Good', color: '#3B82F6' },
      { value: 'fair', label: 'Fair', color: '#F59E0B' },
      { value: 'poor', label: 'Poor', color: '#EF4444' },
      { value: 'terrible', label: 'Terrible', color: '#8B5CF6' }
    ]
  },
  {
    id: 'energy_level',
    question: 'What is your energy level today?',
    type: 'scale',
    options: [
      { value: 1, label: 'Very Low', color: '#8B5CF6' },
      { value: 2, label: 'Low', color: '#EF4444' },
      { value: 3, label: 'Moderate', color: '#F59E0B' },
      { value: 4, label: 'High', color: '#3B82F6' },
      { value: 5, label: 'Very High', color: '#10B981' }
    ]
  },
  {
    id: 'social_interaction',
    question: 'How much social interaction did you have today?',
    type: 'multiple_choice',
    options: [
      { value: 'none', label: 'None', color: '#8B5CF6' },
      { value: 'little', label: 'A little', color: '#EF4444' },
      { value: 'moderate', label: 'Moderate', color: '#F59E0B' },
      { value: 'good', label: 'Good amount', color: '#3B82F6' },
      { value: 'lots', label: 'Lots', color: '#10B981' }
    ]
  },
  {
    id: 'anxiety_level',
    question: 'How anxious or worried do you feel right now?',
    type: 'scale',
    options: [
      { value: 1, label: 'Not at all', color: '#10B981' },
      { value: 2, label: 'Slightly', color: '#3B82F6' },
      { value: 3, label: 'Moderately', color: '#F59E0B' },
      { value: 4, label: 'Quite a bit', color: '#EF4444' },
      { value: 5, label: 'Extremely', color: '#8B5CF6' }
    ]
  },
  {
    id: 'physical_activity',
    question: 'How much physical activity did you do today?',
    type: 'multiple_choice',
    options: [
      { value: 'none', label: 'None', color: '#8B5CF6' },
      { value: 'light', label: 'Light (walking, stretching)', color: '#EF4444' },
      { value: 'moderate', label: 'Moderate (brisk walk, cycling)', color: '#F59E0B' },
      { value: 'vigorous', label: 'Vigorous (running, intense workout)', color: '#3B82F6' },
      { value: 'extreme', label: 'Extreme (marathon, intense training)', color: '#10B981' }
    ]
  },
  {
    id: 'focus_concentration',
    question: 'How well were you able to focus and concentrate today?',
    type: 'scale',
    options: [
      { value: 1, label: 'Very Poor', color: '#8B5CF6' },
      { value: 2, label: 'Poor', color: '#EF4444' },
      { value: 3, label: 'Average', color: '#F59E0B' },
      { value: 4, label: 'Good', color: '#3B82F6' },
      { value: 5, label: 'Excellent', color: '#10B981' }
    ]
  },
  {
    id: 'appetite',
    question: 'How has your appetite been today?',
    type: 'multiple_choice',
    options: [
      { value: 'very_poor', label: 'Very Poor', color: '#8B5CF6' },
      { value: 'poor', label: 'Poor', color: '#EF4444' },
      { value: 'normal', label: 'Normal', color: '#F59E0B' },
      { value: 'good', label: 'Good', color: '#3B82F6' },
      { value: 'excellent', label: 'Excellent', color: '#10B981' }
    ]
  },
  {
    id: 'motivation',
    question: 'How motivated do you feel to accomplish your goals today?',
    type: 'scale',
    options: [
      { value: 1, label: 'Not at all', color: '#8B5CF6' },
      { value: 2, label: 'Slightly', color: '#EF4444' },
      { value: 3, label: 'Moderately', color: '#F59E0B' },
      { value: 4, label: 'Quite motivated', color: '#3B82F6' },
      { value: 5, label: 'Very motivated', color: '#10B981' }
    ]
  },
  {
    id: 'self_care',
    question: 'How well did you take care of yourself today?',
    type: 'multiple_choice',
    options: [
      { value: 'poorly', label: 'Poorly', color: '#8B5CF6' },
      { value: 'below_average', label: 'Below Average', color: '#EF4444' },
      { value: 'average', label: 'Average', color: '#F59E0B' },
      { value: 'well', label: 'Well', color: '#3B82F6' },
      { value: 'excellently', label: 'Excellently', color: '#10B981' }
    ]
  },
  {
    id: 'gratitude',
    question: 'How grateful do you feel today?',
    type: 'scale',
    options: [
      { value: 1, label: 'Not at all', color: '#8B5CF6' },
      { value: 2, label: 'Slightly', color: '#EF4444' },
      { value: 3, label: 'Moderately', color: '#F59E0B' },
      { value: 4, label: 'Quite grateful', color: '#3B82F6' },
      { value: 5, label: 'Very grateful', color: '#10B981' }
    ]
  }
]

export default function DashboardPage() {
  const { resolvedTheme } = useTheme()
  const { user } = useAuth()
  const isDark = resolvedTheme === 'dark'
  const greeting = getGreeting()
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [isSavingMood, setIsSavingMood] = useState(false)
  
  // Survey states
  const [showSurveySection, setShowSurveySection] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, any>>({})
  const [surveyCompleted, setSurveyCompleted] = useState(false)
  const [surveyHistory, setSurveyHistory] = useState<any[]>([])

  const moodOptions = [
    { value: 1, emoji: '😢', label: 'Very Low', color: 'bg-red-500' },
    { value: 2, emoji: '😔', label: 'Low', color: 'bg-orange-500' },
    { value: 3, emoji: '😐', label: 'Neutral', color: 'bg-yellow-500' },
    { value: 4, emoji: '🙂', label: 'Good', color: 'bg-blue-500' },
    { value: 5, emoji: '😊', label: 'Great', color: 'bg-green-500' }
  ]

  const handleSaveMood = async () => {
    if (!selectedMood) return

    setIsSavingMood(true)
    try {
      const moodData = {
        mood: {
          value: selectedMood,
          emoji: moodOptions.find(m => m.value === selectedMood)?.emoji || '😐',
          label: moodOptions.find(m => m.value === selectedMood)?.label || 'Neutral'
        },
        intensity: Math.floor(Math.random() * 10) + 1, // Random intensity for demo
        emotions: [
          {
            name: 'General',
            intensity: Math.floor(Math.random() * 10) + 1,
            category: 'general'
          }
        ],
        timestamp: new Date()
      }

      await moodAPI.createMoodEntry(moodData)
      setSelectedMood(null)
      alert('Mood saved successfully!')
    } catch (error) {
      console.error('Error saving mood:', error)
      alert('Failed to save mood. Please try again.')
    } finally {
      setIsSavingMood(false)
    }
  }

  // Survey functions
  const handleSurveyAnswer = (questionId: string, answer: any) => {
    setSurveyAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < surveyQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // Survey completed
      const completedSurvey = {
        id: Date.now(),
        timestamp: new Date(),
        answers: surveyAnswers
      }
      setSurveyHistory(prev => [completedSurvey, ...prev])
      setSurveyCompleted(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const resetSurvey = () => {
    setCurrentQuestionIndex(0)
    setSurveyAnswers({})
    setSurveyCompleted(false)
  }

  const startNewSurvey = () => {
    setShowSurveySection(true)
    resetSurvey()
  }

  // Process survey data for charts
  const getSurveyChartData = () => {
    if (surveyHistory.length === 0) return []
    
    return surveyHistory.map((survey, index) => ({
      date: new Date(survey.timestamp).toLocaleDateString(),
      dailyMood: survey.answers.daily_mood,
      stressLevel: survey.answers.stress_level,
      sleepQuality: survey.answers.sleep_quality,
      energyLevel: survey.answers.energy_level,
      socialInteraction: survey.answers.social_interaction,
      anxietyLevel: survey.answers.anxiety_level,
      physicalActivity: survey.answers.physical_activity,
      focusConcentration: survey.answers.focus_concentration,
      appetite: survey.answers.appetite,
      motivation: survey.answers.motivation,
      selfCare: survey.answers.self_care,
      gratitude: survey.answers.gratitude
    }))
  }

  const getSurveySummaryData = () => {
    if (surveyHistory.length === 0) return []
    
    const latestSurvey = surveyHistory[0]
    if (!latestSurvey) return []
    
    return [
      { name: 'Daily Mood', value: latestSurvey.answers.daily_mood || 'Not answered' },
      { name: 'Stress Level', value: latestSurvey.answers.stress_level || 'Not answered' },
      { name: 'Sleep Quality', value: latestSurvey.answers.sleep_quality || 'Not answered' },
      { name: 'Energy Level', value: latestSurvey.answers.energy_level || 'Not answered' },
      { name: 'Social Interaction', value: latestSurvey.answers.social_interaction || 'Not answered' },
      { name: 'Anxiety Level', value: latestSurvey.answers.anxiety_level || 'Not answered' },
      { name: 'Physical Activity', value: latestSurvey.answers.physical_activity || 'Not answered' },
      { name: 'Focus & Concentration', value: latestSurvey.answers.focus_concentration || 'Not answered' },
      { name: 'Appetite', value: latestSurvey.answers.appetite || 'Not answered' },
      { name: 'Motivation', value: latestSurvey.answers.motivation || 'Not answered' },
      { name: 'Self Care', value: latestSurvey.answers.self_care || 'Not answered' },
      { name: 'Gratitude', value: latestSurvey.answers.gratitude || 'Not answered' }
    ]
  }

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {greeting}! Welcome back to your wellness journey
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Here's your personalized mental health dashboard
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Mood Check */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                How are you feeling today?
              </h2>
              <div className="flex justify-center space-x-4 mb-6">
                {moodOptions.map((mood) => (
                  <motion.button
                    key={mood.value}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-200 ${
                      selectedMood === mood.value
                        ? `${mood.color} text-white shadow-lg`
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {mood.emoji}
                  </motion.button>
                ))}
              </div>
              {selectedMood && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    You're feeling: <span className="font-semibold text-gray-900 dark:text-white">
                      {moodOptions.find(m => m.value === selectedMood)?.label}
                    </span>
                  </p>
                  <button 
                    onClick={handleSaveMood}
                    disabled={isSavingMood}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSavingMood ? 'Saving...' : 'Save Mood'}
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* Survey Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Wellness Survey
                </h2>
                <button
                  onClick={() => setShowSurveySection(!showSurveySection)}
                  className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <span>Explore Surveys</span>
                  {showSurveySection ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {!showSurveySection ? (
                <div className="text-center py-8">
                  <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Complete a comprehensive wellness assessment to track your mental health patterns
                  </p>
                  <button
                    onClick={startNewSurvey}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Survey
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {!surveyCompleted ? (
                    <div>
                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span>Question {currentQuestionIndex + 1} of {surveyQuestions.length}</span>
                          <span>{Math.round(((currentQuestionIndex + 1) / surveyQuestions.length) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestionIndex + 1) / surveyQuestions.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Current Question */}
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          {surveyQuestions[currentQuestionIndex].question}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {surveyQuestions[currentQuestionIndex].options.map((option) => (
                            <motion.button
                              key={option.value}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleSurveyAnswer(surveyQuestions[currentQuestionIndex].id, option.value)}
                              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                surveyAnswers[surveyQuestions[currentQuestionIndex].id] === option.value
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                              }`}
                            >
                              <div className="text-center">
                                <div 
                                  className="w-4 h-4 rounded-full mx-auto mb-2"
                                  style={{ backgroundColor: option.color }}
                                ></div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {option.label}
                                </span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Navigation Buttons */}
                      <div className="flex justify-between">
                        <button
                          onClick={handlePreviousQuestion}
                          disabled={currentQuestionIndex === 0}
                          className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Previous
                        </button>
                        <button
                          onClick={handleNextQuestion}
                          disabled={!surveyAnswers[surveyQuestions[currentQuestionIndex].id]}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {currentQuestionIndex === surveyQuestions.length - 1 ? 'Complete' : 'Next'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Survey Completed!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Thank you for completing the wellness survey. Your responses have been recorded.
                      </p>
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={startNewSurvey}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Take Another Survey
                        </button>
                        <button
                          onClick={() => setShowSurveySection(false)}
                          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Survey Results Charts */}
                  {surveyHistory.length > 0 && (
                    <div className="mt-8 space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Survey Results & Trends
                      </h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Latest Survey Summary */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Latest Survey Summary</h4>
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {getSurveySummaryData().map((item, index) => (
                              <div key={index} className="flex justify-between items-center text-xs">
                                <span className="text-gray-600 dark:text-gray-400 truncate">{item.name}</span>
                                <span className="text-gray-900 dark:text-white capitalize font-medium ml-2">
                                  {item.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Mental Health Trends Chart */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Mental Health Trends</h4>
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={getSurveyChartData()}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="stressLevel" stroke="#EF4444" strokeWidth={2} name="Stress" />
                              <Line type="monotone" dataKey="anxietyLevel" stroke="#8B5CF6" strokeWidth={2} name="Anxiety" />
                              <Line type="monotone" dataKey="energyLevel" stroke="#10B981" strokeWidth={2} name="Energy" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Wellness Metrics Chart */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Wellness Metrics</h4>
                          <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={getSurveyChartData()}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="motivation" stroke="#3B82F6" strokeWidth={2} name="Motivation" />
                              <Line type="monotone" dataKey="focusConcentration" stroke="#F59E0B" strokeWidth={2} name="Focus" />
                              <Line type="monotone" dataKey="gratitude" stroke="#10B981" strokeWidth={2} name="Gratitude" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Additional Charts Row */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Physical & Social Health */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Physical & Social Health</h4>
                          <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={getSurveyChartData()}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="physicalActivity" fill="#3B82F6" name="Physical Activity" />
                              <Bar dataKey="socialInteraction" fill="#10B981" name="Social Interaction" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Sleep & Appetite */}
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Sleep & Appetite</h4>
                          <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={getSurveyChartData()}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="sleepQuality" fill="#8B5CF6" name="Sleep Quality" />
                              <Bar dataKey="appetite" fill="#F59E0B" name="Appetite" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Mental Health Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Mental Health Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mentalHealthFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`${feature.bgColor} ${feature.borderColor} border rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color}`}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {feature.description}
                        </p>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group">
                          <span>Explore</span>
                          <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${action.bgColor}`}>
                        <action.icon className={`h-5 w-5 ${action.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Points System */}
            <PointsSystem />

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activities
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Achievements
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${achievement.bgColor}`}>
                      <achievement.icon className={`h-5 w-5 ${achievement.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {achievement.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Emergency Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800"
            >
              <div className="flex items-center space-x-3 mb-4">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
                  Need Immediate Help?
                </h3>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                If you're in crisis, don't wait. Help is available 24/7.
              </p>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  National Suicide Prevention Lifeline: 988
                </button>
                <button className="w-full text-left px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                  Crisis Text Line: Text HOME to 741741
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
