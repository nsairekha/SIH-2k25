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

import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts'
import { useTheme } from 'next-themes'
import { useAuth } from '@/contexts/AuthContext'

const MoodTrackerPage = () => {
  const { theme } = useTheme()
  const { user } = useAuth()

  const [moods, setMoods] = useState<{ date: string, mood: string }[]>([])
  const [newMood, setNewMood] = useState<string>('')

  // Load saved moods from localStorage
  useEffect(() => {
    const storedMoods = localStorage.getItem('moods')
    if (storedMoods) {
      setMoods(JSON.parse(storedMoods))
    }
  }, [])

  // Save moods whenever updated
  useEffect(() => {
    localStorage.setItem('moods', JSON.stringify(moods))
  }, [moods])

  // Add new mood entry
  const addMood = () => {
    if (!newMood) return
    const newEntry = { date: new Date().toLocaleDateString(), mood: newMood }
    setMoods([...moods, newEntry])
    setNewMood('')
  }

  // Group moods for chart
  const moodData = moods.reduce((acc: any[], entry) => {
    const existing = acc.find(item => item.mood === entry.mood)
    if (existing) {
      existing.value += 1
    } else {
      acc.push({ mood: entry.mood, value: 1 })
    }
    return acc
  }, [])

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6']

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="flex items-center mb-6">
        <ArrowLeftIcon className="h-6 w-6 cursor-pointer text-gray-600 dark:text-gray-300" />
        <h1 className="ml-3 text-2xl font-bold text-gray-800 dark:text-white">Mood Tracker</h1>
      </div>

      {/* Mood Input */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          value={newMood}
          onChange={(e) => setNewMood(e.target.value)}
          placeholder="How are you feeling?"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={addMood}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <PlusIcon className="h-5 w-5" /> Add
        </button>
      </div>

      {/* Recent Moods */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">Recent Entries</h2>
        <div className="space-y-2">
          {moods.slice(-5).map((entry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow flex justify-between items-center"
            >
              <span className="text-gray-700 dark:text-gray-200">{entry.mood}</span>
              <span className="text-sm text-gray-500">{entry.date}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mood Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
          <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-200">Mood Frequency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mood" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
          <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-200">Mood Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={moodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name }) => name}
              >
                {moodData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default MoodTrackerPage
