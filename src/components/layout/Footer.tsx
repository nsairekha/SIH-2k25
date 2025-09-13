'use client'

import React from 'react'
import Link from 'next/link'
import { 
  HeartIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

const footerLinks = {
  support: [
    { name: 'Crisis Support', href: '/crisis' },
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  resources: [
    { name: 'Activities', href: '/activities' },
    { name: 'Learning Hub', href: '/learning' },
    { name: 'Community', href: '/community' },
    { name: 'Dashboard', href: '/dashboard' },
  ],
  about: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Mission', href: '/mission' },
    { name: 'Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
  ],
}

const emergencyContacts = [
  { name: 'National Suicide Prevention Lifeline', number: '988' },
  { name: 'Crisis Text Line', number: 'Text HOME to 741741' },
  { name: 'National Alliance on Mental Illness', number: '1-800-950-NAMI' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <HeartIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                MindSpace
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Your personal mental wellness companion. Supporting your journey to better mental health with personalized tools and community.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <ShieldCheckIcon className="h-4 w-4" />
              <span>HIPAA Compliant & Secure</span>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Emergency Support
            </h3>
            <div className="space-y-3">
              {emergencyContacts.map((contact) => (
                <div key={contact.name} className="text-sm">
                  <p className="text-gray-900 dark:text-white font-medium">
                    {contact.name}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-mono">
                    {contact.number}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <span>© 2024 MindSpace. All rights reserved.</span>
              <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Available in English, Spanish, French
              </span>
              <GlobeAltIcon className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
