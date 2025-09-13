'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpenIcon,
  ArrowLeftIcon,
  PlayIcon,
  ClockIcon,
  StarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  LightBulbIcon,
  AcademicCapIcon,
  HeartIcon,
  BrainIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import Link from 'next/link'

const learningCategories = [
  {
    id: 'basics',
    title: 'Mental Health Basics',
    description: 'Understanding mental health fundamentals',
    icon: BookOpenIcon,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    articleCount: 12
  },
  {
    id: 'anxiety',
    title: 'Anxiety & Stress',
    description: 'Managing anxiety and stress effectively',
    icon: HeartIcon,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    articleCount: 18
  },
  {
    id: 'depression',
    title: 'Depression Support',
    description: 'Understanding and coping with depression',
    icon: BrainIcon,
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    articleCount: 15
  },
  {
    id: 'mindfulness',
    title: 'Mindfulness & Meditation',
    description: 'Practices for present-moment awareness',
    icon: LightBulbIcon,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    articleCount: 20
  },
  {
    id: 'relationships',
    title: 'Relationships & Social',
    description: 'Building healthy relationships and social skills',
    icon: AcademicCapIcon,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    articleCount: 14
  },
  {
    id: 'crisis',
    title: 'Crisis & Emergency',
    description: 'Emergency resources and crisis management',
    icon: ShieldCheckIcon,
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    articleCount: 8
  }
]

const featuredArticles = [
  {
    id: 1,
    title: 'Understanding Anxiety: A Complete Guide',
    category: 'anxiety',
    type: 'article',
    duration: '8 min read',
    difficulty: 'Beginner',
    description: 'Learn about the different types of anxiety, common symptoms, and evidence-based coping strategies.',
    image: '/images/anxiety-guide.jpg',
    rating: 4.8,
    readCount: 1250,
    isFeatured: true,
    tags: ['anxiety', 'mental-health', 'coping-strategies']
  },
  {
    id: 2,
    title: '5-Minute Breathing Exercise for Instant Calm',
    category: 'mindfulness',
    type: 'video',
    duration: '5 min',
    difficulty: 'Beginner',
    description: 'A quick and effective breathing technique you can use anywhere to reduce stress and anxiety.',
    image: '/images/breathing-exercise.jpg',
    rating: 4.9,
    readCount: 2100,
    isFeatured: true,
    tags: ['breathing', 'stress-relief', 'mindfulness']
  },
  {
    id: 3,
    title: 'The Science of Sleep and Mental Health',
    category: 'basics',
    type: 'infographic',
    duration: '3 min read',
    difficulty: 'Intermediate',
    description: 'Discover how sleep affects your mental health and learn practical tips for better sleep hygiene.',
    image: '/images/sleep-mental-health.jpg',
    rating: 4.7,
    readCount: 890,
    isFeatured: true,
    tags: ['sleep', 'mental-health', 'wellness']
  }
]

const microArticles = [
  {
    id: 1,
    title: 'What is Cognitive Behavioral Therapy?',
    category: 'basics',
    type: 'article',
    duration: '3 min read',
    difficulty: 'Beginner',
    description: 'A brief introduction to CBT and how it can help with mental health challenges.',
    rating: 4.6,
    readCount: 456,
    tags: ['CBT', 'therapy', 'mental-health']
  },
  {
    id: 2,
    title: 'Myth vs Fact: Depression Edition',
    category: 'depression',
    type: 'quiz',
    duration: '2 min',
    difficulty: 'Beginner',
    description: 'Test your knowledge about common depression myths and facts.',
    rating: 4.8,
    readCount: 234,
    tags: ['depression', 'myths', 'facts']
  },
  {
    id: 3,
    title: 'The 5-4-3-2-1 Grounding Technique',
    category: 'anxiety',
    type: 'article',
    duration: '2 min read',
    difficulty: 'Beginner',
    description: 'A simple technique to help ground yourself during anxiety or panic attacks.',
    rating: 4.9,
    readCount: 678,
    tags: ['anxiety', 'grounding', 'coping']
  },
  {
    id: 4,
    title: 'Building Emotional Resilience',
    category: 'basics',
    type: 'video',
    duration: '6 min',
    difficulty: 'Intermediate',
    description: 'Learn strategies to build emotional resilience and bounce back from setbacks.',
    rating: 4.7,
    readCount: 345,
    tags: ['resilience', 'emotional-health', 'coping']
  },
  {
    id: 5,
    title: 'Social Media and Mental Health',
    category: 'relationships',
    type: 'infographic',
    duration: '4 min read',
    difficulty: 'Beginner',
    description: 'Understanding the impact of social media on mental health and how to use it mindfully.',
    rating: 4.5,
    readCount: 567,
    tags: ['social-media', 'mental-health', 'digital-wellness']
  },
  {
    id: 6,
    title: 'Recognizing Early Warning Signs',
    category: 'crisis',
    type: 'article',
    duration: '5 min read',
    difficulty: 'Beginner',
    description: 'Learn to identify early warning signs of mental health crises and when to seek help.',
    rating: 4.8,
    readCount: 789,
    tags: ['crisis', 'warning-signs', 'help-seeking']
  }
]

const interactiveContent = [
  {
    id: 1,
    title: 'Mental Health Assessment',
    type: 'quiz',
    description: 'Take a comprehensive assessment to understand your current mental health status',
    duration: '10 min',
    questions: 20,
    difficulty: 'All Levels'
  },
  {
    id: 2,
    title: 'Stress Level Checker',
    type: 'tool',
    description: 'Interactive tool to assess your current stress levels and get personalized recommendations',
    duration: '5 min',
    questions: 15,
    difficulty: 'All Levels'
  },
  {
    id: 3,
    title: 'Coping Strategy Builder',
    type: 'interactive',
    description: 'Build your personalized toolkit of coping strategies based on your needs',
    duration: '8 min',
    questions: 12,
    difficulty: 'All Levels'
  }
]

export default function LearningPage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [completedContent, setCompletedContent] = useState<number[]>([])

  const filteredArticles = microArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDifficulty = selectedDifficulty === 'all' || article.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
    return matchesCategory && matchesSearch && matchesDifficulty
  })

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return PlayIcon
      case 'quiz':
        return AcademicCapIcon
      case 'infographic':
        return LightBulbIcon
      default:
        return BookOpenIcon
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'text-red-600 dark:text-red-400'
      case 'quiz':
        return 'text-purple-600 dark:text-purple-400'
      case 'infographic':
        return 'text-blue-600 dark:text-blue-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
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
                  Learning Hub
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Educational content and resources for your mental wellness journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg ${getTypeColor(article.type)}`}>
                      {React.createElement(getTypeIcon(article.type), { className: "h-5 w-5" })}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                      {article.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <StarIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">{article.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {article.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{article.duration}</span>
                  </div>
                  <span>{article.readCount} reads</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <span>Start Learning</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Explore by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningCategories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -5 }}
                className={`${category.bgColor} rounded-2xl p-6 cursor-pointer transition-all duration-300`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {category.articleCount} articles
                      </span>
                      <ArrowRightIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, videos, and resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {learningCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </motion.div>

        {/* Micro Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Reads & Micro-Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg ${getTypeColor(article.type)}`}>
                      {React.createElement(getTypeIcon(article.type), { className: "h-4 w-4" })}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                      {article.difficulty}
                    </span>
                  </div>
                  {completedContent.includes(article.id) && (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {article.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{article.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4 text-yellow-500" />
                    <span>{article.rating}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <button 
                  onClick={() => setCompletedContent(prev => [...prev, article.id])}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {completedContent.includes(article.id) ? 'Completed' : 'Start Reading'}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Interactive Tools & Assessments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {interactiveContent.map((content, index) => (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                    <AcademicCapIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {content.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {content.type}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {content.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{content.duration}</span>
                  </div>
                  <span>{content.questions} questions</span>
                </div>
                
                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Start Assessment
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

