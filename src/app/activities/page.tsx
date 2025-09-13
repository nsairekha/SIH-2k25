'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PlayIcon,
  PauseIcon,
  ArrowLeftIcon,
  ClockIcon,
  StarIcon,
  HeartIcon,
  BookOpenIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  CheckCircleIcon,
  FireIcon
} from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import Link from 'next/link'

const activityCategories = [
  {
    id: 'meditation',
    title: 'Meditation',
    description: 'Mindfulness and meditation practices',
    icon: HeartIcon,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  },
  {
    id: 'breathing',
    title: 'Breathing Exercises',
    description: 'Calming breathing techniques',
    icon: PlayIcon,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    id: 'journaling',
    title: 'Journaling',
    description: 'Reflective writing prompts',
    icon: BookOpenIcon,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    id: 'movement',
    title: 'Gentle Movement',
    description: 'Yoga and stretching exercises',
    icon: StarIcon,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20'
  }
]

const meditationActivities = [
  {
    id: 1,
    title: '5-Minute Mindfulness',
    duration: 5,
    difficulty: 'Beginner',
    description: 'A short mindfulness practice to center yourself',
    audioUrl: '/audio/meditation-1.mp3',
    instructions: [
      'Find a comfortable seated position',
      'Close your eyes and take three deep breaths',
      'Focus on your breathing',
      'When your mind wanders, gently return to your breath',
      'Slowly open your eyes when finished'
    ],
    points: 10
  },
  {
    id: 2,
    title: 'Body Scan Meditation',
    duration: 15,
    difficulty: 'Intermediate',
    description: 'Progressive relaxation through body awareness',
    audioUrl: '/audio/meditation-2.mp3',
    instructions: [
      'Lie down comfortably',
      'Start by focusing on your toes',
      'Slowly move your attention up through your body',
      'Notice any tension and allow it to release',
      'End by taking a few deep breaths'
    ],
    points: 25
  },
  {
    id: 3,
    title: 'Loving-Kindness Meditation',
    duration: 20,
    difficulty: 'Advanced',
    description: 'Cultivate compassion for yourself and others',
    audioUrl: '/audio/meditation-3.mp3',
    instructions: [
      'Sit comfortably and close your eyes',
      'Begin by sending love to yourself',
      'Think of someone you care about',
      'Extend loving-kindness to them',
      'Include all beings in your compassion'
    ],
    points: 40
  }
]

const breathingExercises = [
  {
    id: 1,
    title: '4-7-8 Breathing',
    duration: 3,
    difficulty: 'Beginner',
    description: 'Calming technique for stress relief',
    pattern: '4-7-8',
    instructions: [
      'Inhale through your nose for 4 counts',
      'Hold your breath for 7 counts',
      'Exhale through your mouth for 8 counts',
      'Repeat 4 times'
    ],
    points: 15
  },
  {
    id: 2,
    title: 'Box Breathing',
    duration: 5,
    difficulty: 'Intermediate',
    description: 'Equal count breathing for focus',
    pattern: '4-4-4-4',
    instructions: [
      'Inhale for 4 counts',
      'Hold for 4 counts',
      'Exhale for 4 counts',
      'Hold empty for 4 counts',
      'Repeat 5 times'
    ],
    points: 20
  },
  {
    id: 3,
    title: 'Alternate Nostril Breathing',
    duration: 8,
    difficulty: 'Advanced',
    description: 'Balancing technique for harmony',
    pattern: 'Alternate',
    instructions: [
      'Sit comfortably with spine straight',
      'Use your right thumb to close right nostril',
      'Inhale through left nostril',
      'Close left nostril with ring finger',
      'Exhale through right nostril',
      'Continue alternating for 8 minutes'
    ],
    points: 30
  }
]

const journalPrompts = [
  {
    id: 1,
    title: 'Gratitude Reflection',
    category: 'Positive',
    prompt: 'Write about three things you\'re grateful for today and why they matter to you.',
    tips: 'Focus on both big and small moments of joy'
  },
  {
    id: 2,
    title: 'Emotional Check-in',
    category: 'Self-Awareness',
    prompt: 'How are you feeling right now? What emotions are present, and what might be causing them?',
    tips: 'Be honest and non-judgmental with yourself'
  },
  {
    id: 3,
    title: 'Challenge Reflection',
    category: 'Growth',
    prompt: 'Describe a recent challenge you faced. What did you learn from it?',
    tips: 'Focus on growth and resilience rather than just the difficulty'
  },
  {
    id: 4,
    title: 'Future Self Letter',
    category: 'Vision',
    prompt: 'Write a letter to yourself one year from now. What do you hope to have accomplished?',
    tips: 'Be specific about your goals and dreams'
  }
]

export default function ActivitiesPage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const [selectedCategory, setSelectedCategory] = useState('meditation')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentActivity, setCurrentActivity] = useState<number | null>(null)
  const [completedActivities, setCompletedActivities] = useState<number[]>([])
  const [showJournalModal, setShowJournalModal] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null)
  const [journalEntry, setJournalEntry] = useState('')

  const handleActivityStart = (activityId: number) => {
    setCurrentActivity(activityId)
    setIsPlaying(true)
  }

  const handleActivityComplete = (activityId: number) => {
    setCompletedActivities(prev => [...prev, activityId])
    setIsPlaying(false)
    setCurrentActivity(null)
  }

  const getCurrentActivities = () => {
    switch (selectedCategory) {
      case 'meditation':
        return meditationActivities
      case 'breathing':
        return breathingExercises
      case 'journaling':
        return journalPrompts
      default:
        return meditationActivities
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
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
                  Guided Activities
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Meditation, breathing exercises, and mindful practices
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Choose an Activity Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activityCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${category.color} mb-4`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Activities List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCurrentActivities().map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {activity.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {activity.description}
                    </p>
                  </div>
                  {completedActivities.includes(activity.id) && (
                    <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                  )}
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                    <ClockIcon className="h-4 w-4" />
                    <span>{activity.duration} min</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                    {activity.difficulty}
                  </span>
                  <div className="flex items-center space-x-1 text-sm text-yellow-600 dark:text-yellow-400">
                    <StarIcon className="h-4 w-4" />
                    <span>{activity.points} pts</span>
                  </div>
                </div>

                {selectedCategory === 'journaling' ? (
                  <button
                    onClick={() => {
                      setSelectedPrompt(activity.id)
                      setShowJournalModal(true)
                    }}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Writing
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleActivityStart(activity.id)}
                      disabled={currentActivity === activity.id}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                    >
                      {currentActivity === activity.id ? (
                        <>
                          <PauseIcon className="h-4 w-4" />
                          <span>In Progress</span>
                        </>
                      ) : (
                        <>
                          <PlayIcon className="h-4 w-4" />
                          <span>Start Activity</span>
                        </>
                      )}
                    </button>
                    
                    {currentActivity === activity.id && (
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Instructions:</strong>
                        </div>
                        <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          {activity.instructions?.map((instruction, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-blue-600 dark:text-blue-400 font-bold">{idx + 1}.</span>
                              <span>{instruction}</span>
                            </li>
                          ))}
                        </ol>
                        <button
                          onClick={() => handleActivityComplete(activity.id)}
                          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <CheckCircleIcon className="h-4 w-4" />
                          <span>Mark Complete</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Your Progress
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {completedActivities.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Activities Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {completedActivities.length * 20}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Points Earned
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {completedActivities.length > 0 ? '7' : '0'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Day Streak
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Journal Modal */}
      {showJournalModal && selectedPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {journalPrompts.find(p => p.id === selectedPrompt)?.title}
              </h3>
              <button
                onClick={() => setShowJournalModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {journalPrompts.find(p => p.id === selectedPrompt)?.prompt}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                💡 {journalPrompts.find(p => p.id === selectedPrompt)?.tips}
              </p>
            </div>
            
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Start writing your thoughts here..."
            />
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => {
                  setJournalEntry('')
                  setShowJournalModal(false)
                }}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Journal entry saved:', journalEntry)
                  setJournalEntry('')
                  setShowJournalModal(false)
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Entry
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
