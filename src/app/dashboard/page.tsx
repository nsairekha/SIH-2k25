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
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { getGreeting } from '@/lib/utils'
import PointsSystem from '@/components/features/PointsSystem'

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

export default function DashboardPage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const greeting = getGreeting()
  const [selectedMood, setSelectedMood] = useState<number | null>(null)

  const moodOptions = [
    { value: 1, emoji: '😢', label: 'Very Low', color: 'bg-red-500' },
    { value: 2, emoji: '😔', label: 'Low', color: 'bg-orange-500' },
    { value: 3, emoji: '😐', label: 'Neutral', color: 'bg-yellow-500' },
    { value: 4, emoji: '🙂', label: 'Good', color: 'bg-blue-500' },
    { value: 5, emoji: '😊', label: 'Great', color: 'bg-green-500' }
  ]

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
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Save Mood
                  </button>
                </motion.div>
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
