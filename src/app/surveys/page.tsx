'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  PlusIcon,
  ChartBarIcon,
  CalendarIcon,
  HeartIcon,
  BoltIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Survey, SurveyTemplate, SurveyQuestion } from '@/types'
import { surveyAPI } from '@/lib/api'

const moodOptions = [
  { value: 1, emoji: '😢', label: 'Very Low', color: 'bg-red-500', description: 'Feeling very down' },
  { value: 2, emoji: '😔', label: 'Low', color: 'bg-orange-500', description: 'Feeling low' },
  { value: 3, emoji: '😐', label: 'Neutral', color: 'bg-yellow-500', description: 'Feeling okay' },
  { value: 4, emoji: '🙂', label: 'Good', color: 'bg-blue-500', description: 'Feeling good' },
  { value: 5, emoji: '😊', label: 'Great', color: 'bg-green-500', description: 'Feeling great' }
]

interface SurveyFormProps {
  template: SurveyTemplate
  onSubmit: (responses: any[]) => void
  onCancel: () => void
}

const SurveyForm: React.FC<SurveyFormProps> = ({ template, onSubmit, onCancel }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestion = template.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === template.questions.length - 1
  const isFirstQuestion = currentQuestionIndex === 0

  const handleAnswer = (questionId: string, answer: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNext = () => {
    if (currentQuestion.required && !responses[currentQuestion.id]) {
      return
    }
    
    if (isLastQuestion) {
      handleSubmit()
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const formattedResponses = Object.entries(responses).map(([questionId, answer]) => ({
        questionId,
        answer
      }))
      await onSubmit(formattedResponses)
    } catch (error) {
      console.error('Error submitting survey:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderQuestion = (question: SurveyQuestion) => {
    const currentAnswer = responses[question.id]

    switch (question.type) {
      case 'mood':
        return (
          <div className="space-y-6">
            <div className="flex justify-center space-x-4">
              {moodOptions.map((mood) => (
                <motion.button
                  key={mood.value}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(question.id, mood.value)}
                  className={`w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all duration-200 ${
                    currentAnswer === mood.value
                      ? `${mood.color} text-white shadow-lg`
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className="text-3xl">{mood.emoji}</span>
                  <span className="text-xs mt-1">{mood.label}</span>
                </motion.button>
              ))}
            </div>
            {currentAnswer && (
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                {moodOptions.find(m => m.value === currentAnswer)?.description}
              </p>
            )}
          </div>
        )

      case 'scale':
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{question.min}</span>
              <span>{question.max}</span>
            </div>
            <input
              type="range"
              min={question.min}
              max={question.max}
              value={currentAnswer || question.min}
              onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {currentAnswer || question.min}
              </span>
            </div>
          </div>
        )

      case 'rating':
        return (
          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              {question.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, option)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    currentAnswer === option
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  const currentAnswers = currentAnswer || []
                  const newAnswers = currentAnswers.includes(option)
                    ? currentAnswers.filter((a: string) => a !== option)
                    : [...currentAnswers, option]
                  handleAnswer(question.id, newAnswers)
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  (currentAnswer || []).includes(option)
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )

      case 'boolean':
        return (
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleAnswer(question.id, true)}
              className={`px-6 py-3 rounded-lg transition-colors ${
                currentAnswer === true
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer(question.id, false)}
              className={`px-6 py-3 rounded-lg transition-colors ${
                currentAnswer === false
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              No
            </button>
          </div>
        )

      case 'text':
        return (
          <textarea
            value={currentAnswer || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Share your thoughts..."
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Question {currentQuestionIndex + 1} of {template.questions.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / template.questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / template.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {currentQuestion.question}
            </h2>
            
            {renderQuestion(currentQuestion)}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentQuestion.required && !responses[currentQuestion.id]}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Submitting...' : isLastQuestion ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SurveysPage() {
  const [selectedSurveyType, setSelectedSurveyType] = useState<string>('daily')
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Built-in survey templates with questions
  const surveyTemplates = {
    daily: {
      title: 'Daily Wellness Check-in',
      description: 'A quick daily assessment of your mental and emotional well-being',
      questions: [
        {
          id: 'mood',
          type: 'mood',
          question: 'How is your overall mood today?',
          required: true,
          category: 'mood'
        },
        {
          id: 'energy',
          type: 'scale',
          question: 'Rate your energy level today (1-10)',
          min: 1,
          max: 10,
          required: true,
          category: 'wellness'
        },
        {
          id: 'stress',
          type: 'scale',
          question: 'How stressed do you feel today? (1-10)',
          min: 1,
          max: 10,
          required: true,
          category: 'stress'
        },
        {
          id: 'sleep_quality',
          type: 'rating',
          question: 'How would you rate your sleep quality last night?',
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
          required: true,
          category: 'sleep'
        },
        {
          id: 'anxiety',
          type: 'scale',
          question: 'Rate your anxiety level today (1-10)',
          min: 1,
          max: 10,
          required: false,
          category: 'anxiety'
        },
        {
          id: 'social_interaction',
          type: 'boolean',
          question: 'Did you have meaningful social interaction today?',
          required: false,
          category: 'social'
        },
        {
          id: 'exercise',
          type: 'boolean',
          question: 'Did you exercise or engage in physical activity today?',
          required: false,
          category: 'physical'
        },
        {
          id: 'productivity',
          type: 'scale',
          question: 'How productive do you feel today? (1-10)',
          min: 1,
          max: 10,
          required: false,
          category: 'productivity'
        },
        {
          id: 'appetite',
          type: 'rating',
          question: 'How is your appetite today?',
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
          required: false,
          category: 'physical'
        },
        {
          id: 'gratitude',
          type: 'text',
          question: 'What are you grateful for today? (optional)',
          required: false,
          category: 'gratitude'
        }
      ]
    },
    weekly: {
      title: 'Weekly Mental Health Assessment',
      description: 'A comprehensive weekly review of your mental health and well-being',
      questions: [
        {
          id: 'overall_wellbeing',
          type: 'scale',
          question: 'How would you rate your overall mental well-being this week? (1-10)',
          min: 1,
          max: 10,
          required: true,
          category: 'wellbeing'
        },
        {
          id: 'mood_patterns',
          type: 'multiple_choice',
          question: 'Which emotions did you experience most this week?',
          options: ['Happiness', 'Sadness', 'Anxiety', 'Anger', 'Calm', 'Excitement', 'Frustration', 'Contentment', 'Loneliness', 'Confidence'],
          required: true,
          category: 'emotions'
        },
        {
          id: 'stress_sources',
          type: 'multiple_choice',
          question: 'What were your main sources of stress this week?',
          options: ['Work/School', 'Relationships', 'Health', 'Finances', 'Family', 'Social situations', 'Future concerns', 'Physical pain', 'Loneliness', 'None'],
          required: false,
          category: 'stress'
        },
        {
          id: 'coping_strategies',
          type: 'multiple_choice',
          question: 'Which coping strategies did you use this week?',
          options: ['Exercise', 'Meditation/Mindfulness', 'Talking to friends/family', 'Journaling', 'Hobbies', 'Professional help', 'Music', 'Nature walks', 'Reading', 'Cooking', 'Art/Creative activities'],
          required: false,
          category: 'coping'
        },
        {
          id: 'sleep_patterns',
          type: 'rating',
          question: 'How consistent were your sleep patterns this week?',
          options: ['Very inconsistent', 'Somewhat inconsistent', 'Moderately consistent', 'Mostly consistent', 'Very consistent'],
          required: true,
          category: 'sleep'
        },
        {
          id: 'social_connections',
          type: 'scale',
          question: 'How satisfied are you with your social connections this week? (1-10)',
          min: 1,
          max: 10,
          required: true,
          category: 'social'
        },
        {
          id: 'productivity',
          type: 'scale',
          question: 'How productive did you feel this week? (1-10)',
          min: 1,
          max: 10,
          required: true,
          category: 'productivity'
        },
        {
          id: 'physical_health',
          type: 'rating',
          question: 'How would you rate your physical health this week?',
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
          required: false,
          category: 'physical'
        },
        {
          id: 'self_care',
          type: 'rating',
          question: 'How well did you practice self-care this week?',
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
          required: false,
          category: 'self_care'
        },
        {
          id: 'challenges',
          type: 'text',
          question: 'What was your biggest challenge this week?',
          required: false,
          category: 'challenges'
        },
        {
          id: 'achievements',
          type: 'text',
          question: 'What are you proud of accomplishing this week?',
          required: false,
          category: 'achievements'
        },
        {
          id: 'next_week_goals',
          type: 'text',
          question: 'What would you like to focus on improving next week?',
          required: false,
          category: 'goals'
        }
      ]
    },
    quick: {
      title: 'Quick Mental Health Check',
      description: 'A brief 5-question assessment for quick mental health evaluation',
      questions: [
        {
          id: 'mood_quick',
          type: 'mood',
          question: 'How is your mood right now?',
          required: true,
          category: 'mood'
        },
        {
          id: 'stress_quick',
          type: 'scale',
          question: 'How stressed do you feel? (1-10)',
          min: 1,
          max: 10,
          required: true,
          category: 'stress'
        },
        {
          id: 'energy_quick',
          type: 'scale',
          question: 'How energetic do you feel? (1-10)',
          min: 1,
          max: 10,
          required: true,
          category: 'energy'
        },
        {
          id: 'sleep_quick',
          type: 'rating',
          question: 'How did you sleep last night?',
          options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
          required: true,
          category: 'sleep'
        },
        {
          id: 'gratitude_quick',
          type: 'text',
          question: 'What\'s one thing you\'re grateful for today?',
          required: false,
          category: 'gratitude'
        }
      ]
    }
  }

  const currentTemplate = surveyTemplates[selectedSurveyType as keyof typeof surveyTemplates]
  const currentQuestion = currentTemplate.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === currentTemplate.questions.length - 1
  const isFirstQuestion = currentQuestionIndex === 0

  const handleAnswer = (questionId: string, answer: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNext = () => {
    if (currentQuestion.required && !responses[currentQuestion.id]) {
      return
    }
    
    if (isLastQuestion) {
      handleSubmit()
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Here you would typically save to a database
      console.log('Survey responses:', responses)
      setShowResults(true)
    } catch (error) {
      console.error('Error submitting survey:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetSurvey = () => {
    setResponses({})
    setCurrentQuestionIndex(0)
    setShowResults(false)
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Survey Completed!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Thank you for taking the time to complete the {currentTemplate.title}
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Your Responses Summary:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(responses).map(([questionId, answer]) => {
                  const question = currentTemplate.questions.find(q => q.id === questionId)
                  if (!question) return null
                  
                  return (
                    <div key={questionId} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {question.question}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {Array.isArray(answer) ? answer.join(', ') : answer}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={resetSurvey}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Take Another Survey
              </button>
              <Link
                href="/dashboard"
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Mental Health Survey
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {currentTemplate.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedSurveyType}
                onChange={(e) => {
                  setSelectedSurveyType(e.target.value)
                  setCurrentQuestionIndex(0)
                  setResponses({})
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="quick">Quick Check (5 questions)</option>
                <option value="daily">Daily Wellness (10 questions)</option>
                <option value="weekly">Weekly Assessment (12 questions)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Question {currentQuestionIndex + 1} of {currentTemplate.questions.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / currentTemplate.questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / currentTemplate.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {currentQuestion.question}
              </h2>
              
              {renderQuestion(currentQuestion)}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentQuestion.required && !responses[currentQuestion.id]}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Submitting...' : isLastQuestion ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
