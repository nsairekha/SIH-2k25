'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  HeartIcon,
  ChartBarIcon,
  CalendarIcon,
  ClockIcon,
  ArrowLeftIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusIcon
} from '@heroicons/react/24/outline'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { useTheme } from 'next-themes'
import { useAuth } from '@/contexts/AuthContext'
import { moodAPI } from '@/lib/api'
import Link from 'next/link'

const moodData = [
  { date: '2024-01-01', mood: 4, energy: 3, stress: 2, sleep: 7 },
  { date: '2024-01-02', mood: 3, energy: 4, stress: 3, sleep: 6 },
  { date: '2024-01-03', mood: 5, energy: 5, stress: 1, sleep: 8 },
  { date: '2024-01-04', mood: 4, energy: 3, stress: 2, sleep: 7 },
  { date: '2024-01-05', mood: 2, energy: 2, stress: 4, sleep: 5 },
  { date: '2024-01-06', mood: 3, energy: 3, stress: 3, sleep: 6 },
  { date: '2024-01-07', mood: 4, energy: 4, stress: 2, sleep: 7 },
]

const emotionData = [
  { name: 'Happy', value: 35, color: '#10B981' },
  { name: 'Calm', value: 25, color: '#3B82F6' },
  { name: 'Anxious', value: 20, color: '#F59E0B' },
  { name: 'Sad', value: 15, color: '#EF4444' },
  { name: 'Angry', value: 5, color: '#DC2626' },
]

const moodOptions = [
  { value: 1, emoji: '😢', label: 'Very Low', color: 'bg-red-500', description: 'Feeling very down' },
  { value: 2, emoji: '😔', label: 'Low', color: 'bg-orange-500', description: 'Feeling low' },
  { value: 3, emoji: '😐', label: 'Neutral', color: 'bg-yellow-500', description: 'Feeling okay' },
  { value: 4, emoji: '🙂', label: 'Good', color: 'bg-blue-500', description: 'Feeling good' },
  { value: 5, emoji: '😊', label: 'Great', color: 'bg-green-500', description: 'Feeling great' }
]

const triggers = [
  'Work stress', 'Family issues', 'Health concerns', 'Financial worries',
  'Relationship problems', 'Social anxiety', 'Sleep issues', 'Weather',
  'Exercise', 'Good news', 'Socializing', 'Hobbies', 'Music', 'Nature'
]

export default function MoodTrackerPage() {
  const { resolvedTheme } = useTheme()
  const { user } = useAuth()
  const isDark = resolvedTheme === 'dark'
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([])
  const [notes, setNotes] = useState('')
  const [showLogForm, setShowLogForm] = useState(false)
  const [timeframe, setTimeframe] = useState('week')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleMoodSubmit = async () => {
    if (!selectedMood) return

    setIsSubmitting(true)
    try {
      const moodData = {
        mood: {
          value: selectedMood,
          emoji: moodOptions.find(m => m.value === selectedMood)?.emoji || '😐',
          label: moodOptions.find(m => m.value === selectedMood)?.label || 'Neutral'
        },
        intensity: Math.floor(Math.random() * 10) + 1,
        emotions: [
          {
            name: 'General',
            intensity: Math.floor(Math.random() * 10) + 1,
            category: 'general'
          }
        ],
        triggers: selectedTriggers,
        notes: notes,
        timestamp: new Date()
      }

      await moodAPI.createMoodEntry(moodData)
      setSelectedMood(null)
      setSelectedTriggers([])
      setNotes('')
      setShowLogForm(false)
      alert('Mood entry saved successfully!')
    } catch (error) {
      console.error('Error saving mood entry:', error)
      alert('Failed to save mood entry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers(prev => 
      prev.includes(trigger) 
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    )
  }

  const averageMood = moodData.reduce((sum, day) => sum + day.mood, 0) / moodData.length
  const moodTrend = moodData[moodData.length - 1].mood - moodData[0].mood

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
                  Mood Tracker
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Track your emotional patterns and gain insights
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Log Mood</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mood Logging Form */}
            {showLogForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  How are you feeling right now?
                </h2>
                
                <div className="space-y-6">
                  {/* Mood Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Select your mood
                    </label>
                    <div className="flex justify-center space-x-4">
                      {moodOptions.map((mood) => (
                        <motion.button
                          key={mood.value}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedMood(mood.value)}
                          className={`w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all duration-200 ${
                            selectedMood === mood.value
                              ? `${mood.color} text-white shadow-lg`
                              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          <span className="text-2xl">{mood.emoji}</span>
                        </motion.button>
                      ))}
                    </div>
                    {selectedMood && (
                      <p className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {moodOptions.find(m => m.value === selectedMood)?.description}
                      </p>
                    )}
                  </div>

                  {/* Triggers */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      What might be affecting your mood? (Select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {triggers.map((trigger) => (
                        <button
                          key={trigger}
                          onClick={() => toggleTrigger(trigger)}
                          className={`px-3 py-2 rounded-full text-sm transition-colors ${
                            selectedTriggers.includes(trigger)
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {trigger}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Additional notes (optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="How are you feeling? What's on your mind?"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-4">
                    <button
                      onClick={handleMoodSubmit}
                      disabled={!selectedMood || isSubmitting}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? 'Saving...' : 'Save Mood Entry'}
                    </button>
                    <button
                      onClick={() => setShowLogForm(false)}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Mood Trends Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Mood Trends
                </h2>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis 
                      domain={[1, 5]}
                      tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                        border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                        borderRadius: '8px',
                        color: isDark ? '#f9fafb' : '#111827'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Additional Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Energy Levels */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Energy Levels
                </h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={moodData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis 
                        domain={[1, 5]}
                        tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: isDark ? '#1f2937' : '#ffffff',
                          border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                          borderRadius: '8px',
                          color: isDark ? '#f9fafb' : '#111827'
                        }}
                      />
                      <Bar dataKey="energy" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stress Levels */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Stress Levels
                </h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={moodData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis 
                        domain={[1, 5]}
                        tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: isDark ? '#1f2937' : '#ffffff',
                          border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                          borderRadius: '8px',
                          color: isDark ? '#f9fafb' : '#111827'
                        }}
                      />
                      <Bar dataKey="stress" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Current Mood Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Mood Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Average Mood</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {averageMood.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">/5</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Trend</span>
                  <div className="flex items-center space-x-1">
                    {moodTrend > 0 ? (
                      <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                    ) : moodTrend < 0 ? (
                      <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
                    ) : (
                      <MinusIcon className="h-4 w-4 text-gray-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      moodTrend > 0 ? 'text-green-600' : moodTrend < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {moodTrend > 0 ? '+' : ''}{moodTrend.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Entries</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {moodData.length} days
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Emotion Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Emotion Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emotionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {emotionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDark ? '#1f2937' : '#ffffff',
                        border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                        borderRadius: '8px',
                        color: isDark ? '#f9fafb' : '#111827'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {emotionData.map((emotion, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: emotion.color }}
                      />
                      <span className="text-gray-700 dark:text-gray-300">{emotion.name}</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {emotion.value}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <HeartIcon className="h-5 w-5" />
                    <span>Log Current Mood</span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <ChartBarIcon className="h-5 w-5" />
                    <span>View Detailed Analytics</span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="h-5 w-5" />
                    <span>Set Mood Reminders</span>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

