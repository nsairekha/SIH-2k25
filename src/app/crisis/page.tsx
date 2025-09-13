'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ShieldExclamationIcon,
  ArrowLeftIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  ClockIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PlayIcon,
  BookOpenIcon,
  UserGroupIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import Link from 'next/link'

const emergencyResources = [
  {
    id: 1,
    name: 'National Suicide Prevention Lifeline',
    number: '988',
    description: '24/7 crisis support and suicide prevention',
    type: 'hotline',
    available24h: true,
    country: 'US',
    icon: PhoneIcon,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-900/20'
  },
  {
    id: 2,
    name: 'Crisis Text Line',
    number: 'Text HOME to 741741',
    description: 'Free 24/7 crisis support via text message',
    type: 'text',
    available24h: true,
    country: 'US',
    icon: ChatBubbleLeftRightIcon,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    id: 3,
    name: 'National Alliance on Mental Illness (NAMI)',
    number: '1-800-950-NAMI (6264)',
    description: 'Mental health support and resources',
    type: 'hotline',
    available24h: true,
    country: 'US',
    icon: UserGroupIcon,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    id: 4,
    name: 'SAMHSA National Helpline',
    number: '1-800-662-HELP (4357)',
    description: 'Substance abuse and mental health services',
    type: 'hotline',
    available24h: true,
    country: 'US',
    icon: HeartIcon,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  }
]

const internationalResources = [
  {
    country: 'Canada',
    name: 'Crisis Services Canada',
    number: '1-833-456-4566',
    website: 'crisisservicescanada.ca'
  },
  {
    country: 'UK',
    name: 'Samaritans',
    number: '116 123',
    website: 'samaritans.org'
  },
  {
    country: 'Australia',
    name: 'Lifeline Australia',
    number: '13 11 14',
    website: 'lifeline.org.au'
  }
]

const copingStrategies = [
  {
    id: 1,
    title: '5-4-3-2-1 Grounding Technique',
    description: 'A simple technique to help ground yourself during overwhelming moments',
    steps: [
      'Name 5 things you can see',
      'Name 4 things you can touch',
      'Name 3 things you can hear',
      'Name 2 things you can smell',
      'Name 1 thing you can taste'
    ],
    icon: LightBulbIcon,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    id: 2,
    title: 'Box Breathing',
    description: 'A breathing technique to help calm your nervous system',
    steps: [
      'Inhale for 4 counts',
      'Hold your breath for 4 counts',
      'Exhale for 4 counts',
      'Hold empty for 4 counts',
      'Repeat 4 times'
    ],
    icon: PlayIcon,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    id: 3,
    title: 'Progressive Muscle Relaxation',
    description: 'Tense and release different muscle groups to reduce physical tension',
    steps: [
      'Start with your toes, tense for 5 seconds, then release',
      'Move to your calves, tense and release',
      'Continue up your body: thighs, abdomen, arms, shoulders',
      'End with your face and jaw',
      'Take deep breaths and notice the relaxation'
    ],
    icon: HeartIcon,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  }
]

const safetyPlanSteps = [
  {
    step: 1,
    title: 'Recognize Warning Signs',
    description: 'Identify thoughts, feelings, or behaviors that indicate you\'re in crisis',
    examples: ['Feeling hopeless', 'Thoughts of self-harm', 'Isolating from others', 'Increased substance use']
  },
  {
    step: 2,
    title: 'Use Coping Strategies',
    description: 'Apply techniques that have helped you in the past',
    examples: ['Deep breathing', 'Calling a friend', 'Going for a walk', 'Listening to music']
  },
  {
    step: 3,
    title: 'Contact Support People',
    description: 'Reach out to trusted friends, family, or professionals',
    examples: ['Close friend', 'Family member', 'Therapist', 'Support group member']
  },
  {
    step: 4,
    title: 'Use Professional Resources',
    description: 'Contact crisis hotlines or emergency services if needed',
    examples: ['988 Suicide & Crisis Lifeline', 'Crisis Text Line', 'Emergency room', '911']
  }
]

const warningSigns = [
  'Talking about wanting to die or hurt yourself',
  'Looking for ways to kill yourself',
  'Talking about feeling hopeless or having no reason to live',
  'Talking about feeling trapped or in unbearable pain',
  'Talking about being a burden to others',
  'Increasing use of alcohol or drugs',
  'Acting anxious, agitated, or reckless',
  'Sleeping too little or too much',
  'Withdrawing or feeling isolated',
  'Showing rage or talking about seeking revenge',
  'Extreme mood swings'
]

export default function CrisisPage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const [showCopingModal, setShowCopingModal] = useState(false)
  const [selectedCoping, setSelectedCoping] = useState<number | null>(null)

  const handleCopingClick = (copingId: number) => {
    setSelectedCoping(copingId)
    setShowCopingModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-red-900 dark:text-red-100">
                Crisis Support
              </h1>
              <p className="text-red-700 dark:text-red-300">
                Immediate help and resources when you need them most
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emergency Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
            <h2 className="text-xl font-bold text-red-900 dark:text-red-100">
              In Immediate Crisis?
            </h2>
          </div>
          <p className="text-red-800 dark:text-red-200 mb-4">
            If you're having thoughts of suicide or self-harm, please reach out for help immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:988"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              <PhoneIcon className="h-5 w-5" />
              <span>Call 988 Now</span>
            </a>
            <a
              href="sms:741741&body=HOME"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              <span>Text HOME to 741741</span>
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Emergency Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Emergency Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {emergencyResources.map((resource) => (
                  <motion.div
                    key={resource.id}
                    whileHover={{ y: -2 }}
                    className={`${resource.bgColor} rounded-2xl p-6 border border-gray-200 dark:border-gray-700`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-xl">
                        <resource.icon className={`h-6 w-6 ${resource.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {resource.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                          {resource.description}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <PhoneIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                              {resource.number}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {resource.available24h ? 'Available 24/7' : 'Limited hours'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Coping Strategies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Immediate Coping Strategies
              </h2>
              <div className="space-y-4">
                {copingStrategies.map((strategy) => (
                  <motion.div
                    key={strategy.id}
                    whileHover={{ y: -2 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-all duration-300"
                    onClick={() => handleCopingClick(strategy.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${strategy.bgColor}`}>
                        <strategy.icon className={`h-6 w-6 ${strategy.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {strategy.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                          {strategy.description}
                        </p>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                          <span>Click to see steps</span>
                          <ArrowLeftIcon className="h-4 w-4 ml-1 rotate-180" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Safety Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Safety Planning
              </h2>
              <div className="space-y-6">
                {safetyPlanSteps.map((step, index) => (
                  <div key={step.step} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {step.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {step.examples.map((example, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Warning Signs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Warning Signs to Watch For
              </h3>
              <div className="space-y-2">
                {warningSigns.map((sign, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <ExclamationTriangleIcon className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {sign}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* International Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                International Resources
              </h3>
              <div className="space-y-4">
                {internationalResources.map((resource, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {resource.country}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {resource.name}
                    </p>
                    <p className="font-mono text-sm text-blue-600 dark:text-blue-400 mb-1">
                      {resource.number}
                    </p>
                    <a
                      href={`https://${resource.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {resource.website}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
            >
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="h-5 w-5" />
                    <span>Call Emergency Services</span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <div className="flex items-center space-x-3">
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                    <span>Start Crisis Chat</span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <div className="flex items-center space-x-3">
                    <BookOpenIcon className="h-5 w-5" />
                    <span>View Safety Plan</span>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Coping Strategy Modal */}
      {showCopingModal && selectedCoping && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            {(() => {
              const coping = copingStrategies.find(c => c.id === selectedCoping)
              if (!coping) return null
              
              return (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {coping.title}
                    </h3>
                    <button
                      onClick={() => setShowCopingModal(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {coping.description}
                  </p>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Steps:
                    </h4>
                    <ol className="space-y-3">
                      {coping.steps.map((step, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="flex space-x-4 mt-6">
                    <button
                      onClick={() => setShowCopingModal(false)}
                      className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setShowCopingModal(false)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      I'll Try This
                    </button>
                  </div>
                </>
              )
            })()}
          </motion.div>
        </div>
      )}
    </div>
  )
}

