'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  StarIcon,
  FireIcon,
  TrophyIcon,
  GiftIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  points: number
  unlocked: boolean
  unlockedAt?: Date
  category: 'streak' | 'activity' | 'social' | 'learning'
}

interface PointsData {
  totalPoints: number
  weeklyPoints: number
  dailyStreak: number
  level: number
  nextLevelPoints: number
  achievements: Achievement[]
}

const mockAchievements: Achievement[] = [
  {
    id: 'first-mood',
    title: 'First Steps',
    description: 'Log your first mood entry',
    icon: StarIcon,
    points: 10,
    unlocked: true,
    unlockedAt: new Date('2024-01-01'),
    category: 'activity'
  },
  {
    id: 'week-streak',
    title: 'Week Warrior',
    description: 'Log mood for 7 consecutive days',
    icon: FireIcon,
    points: 50,
    unlocked: true,
    unlockedAt: new Date('2024-01-07'),
    category: 'streak'
  },
  {
    id: 'meditation-master',
    title: 'Zen Master',
    description: 'Complete 10 meditation sessions',
    icon: SparklesIcon,
    points: 100,
    unlocked: false,
    category: 'activity'
  },
  {
    id: 'community-helper',
    title: 'Community Helper',
    description: 'Help 5 community members',
    icon: GiftIcon,
    points: 75,
    unlocked: false,
    category: 'social'
  },
  {
    id: 'learning-champion',
    title: 'Knowledge Seeker',
    description: 'Complete 20 learning modules',
    icon: ChartBarIcon,
    points: 150,
    unlocked: false,
    category: 'learning'
  }
]

export default function PointsSystem() {
  const [pointsData, setPointsData] = useState<PointsData>({
    totalPoints: 340,
    weeklyPoints: 85,
    dailyStreak: 12,
    level: 3,
    nextLevelPoints: 500,
    achievements: mockAchievements
  })

  const [showAchievements, setShowAchievements] = useState(false)
  const [recentEarned, setRecentEarned] = useState<Achievement[]>([])

  const levelProgress = (pointsData.totalPoints / pointsData.nextLevelPoints) * 100
  const pointsToNextLevel = pointsData.nextLevelPoints - pointsData.totalPoints

  const unlockedAchievements = pointsData.achievements.filter(a => a.unlocked)
  const lockedAchievements = pointsData.achievements.filter(a => !a.unlocked)

  const getLevelColor = (level: number) => {
    if (level >= 10) return 'text-purple-600 dark:text-purple-400'
    if (level >= 7) return 'text-blue-600 dark:text-blue-400'
    if (level >= 4) return 'text-green-600 dark:text-green-400'
    return 'text-yellow-600 dark:text-yellow-400'
  }

  const getLevelTitle = (level: number) => {
    if (level >= 10) return 'Mental Health Champion'
    if (level >= 7) return 'Wellness Expert'
    if (level >= 4) return 'Mindful Explorer'
    return 'Wellness Beginner'
  }

  return (
    <div className="space-y-6">
      {/* Points Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Mind Points</h3>
            <p className="text-blue-100 text-sm">Your wellness journey progress</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{pointsData.totalPoints}</div>
            <div className="text-blue-100 text-sm">Total Points</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-xl font-bold">{pointsData.weeklyPoints}</div>
            <div className="text-blue-100 text-xs">This Week</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{pointsData.dailyStreak}</div>
            <div className="text-blue-100 text-xs">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{pointsData.level}</div>
            <div className="text-blue-100 text-xs">Level</div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mb-2">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-blue-100">Level {pointsData.level}</span>
            <span className="text-blue-100">{pointsData.nextLevelPoints - pointsData.totalPoints} to next level</span>
          </div>
          <div className="w-full bg-blue-300/30 rounded-full h-2">
            <motion.div
              className="bg-white rounded-full h-2"
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        <div className="text-center">
          <span className="text-sm text-blue-100">
            {getLevelTitle(pointsData.level)}
          </span>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <FireIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {pointsData.dailyStreak}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Day Streak
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TrophyIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {unlockedAchievements.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Achievements
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Achievements */}
      {unlockedAchievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Achievements
            </h3>
            <button
              onClick={() => setShowAchievements(true)}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {unlockedAchievements.slice(0, 3).map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <achievement.icon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {achievement.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </div>
                </div>
                <div className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                  +{achievement.points}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Points Earning Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          How to Earn Points
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Log daily mood</span>
            <span className="font-bold text-green-600 dark:text-green-400">+10 pts</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Complete meditation</span>
            <span className="font-bold text-green-600 dark:text-green-400">+15 pts</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Write journal entry</span>
            <span className="font-bold text-green-600 dark:text-green-400">+20 pts</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Help community member</span>
            <span className="font-bold text-green-600 dark:text-green-400">+25 pts</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Complete learning module</span>
            <span className="font-bold text-green-600 dark:text-green-400">+30 pts</span>
          </div>
        </div>
      </motion.div>

      {/* Achievements Modal */}
      {showAchievements && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                All Achievements
              </h3>
              <button
                onClick={() => setShowAchievements(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Unlocked Achievements */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Unlocked ({unlockedAchievements.length})
                </h4>
                <div className="space-y-3">
                  {unlockedAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <achievement.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {achievement.title}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {achievement.description}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600 dark:text-green-400">
                          +{achievement.points}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {achievement.unlockedAt?.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locked Achievements */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Locked ({lockedAchievements.length})
                </h4>
                <div className="space-y-3">
                  {lockedAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg opacity-60">
                      <div className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg">
                        <achievement.icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-500 dark:text-gray-400">
                          {achievement.title}
                        </div>
                        <div className="text-sm text-gray-400 dark:text-gray-500">
                          {achievement.description}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-400 dark:text-gray-500">
                          +{achievement.points}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
