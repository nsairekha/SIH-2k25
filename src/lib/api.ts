// API service functions for the mental health app

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  // Get auth token from localStorage
  const token = localStorage.getItem('accessToken')
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    credentials: 'include',
  }

  const response = await fetch(url, { ...defaultOptions, ...options })
  
  if (!response.ok) {
    // If unauthorized, try to refresh token or redirect to login
    if (response.status === 401) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    throw new Error(`API request failed: ${response.statusText}`)
  }
  
  return response.json()
}

// Survey API functions
export const surveyAPI = {
  // Get all surveys for the current user
  getSurveys: (params?: { type?: string; completed?: boolean; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams()
    if (params?.type) searchParams.append('type', params.type)
    if (params?.completed !== undefined) searchParams.append('completed', params.completed.toString())
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    
    const queryString = searchParams.toString()
    return apiRequest(`/surveys${queryString ? `?${queryString}` : ''}`)
  },

  // Get survey by ID
  getSurveyById: (id: string) => {
    return apiRequest(`/surveys/${id}`)
  },

  // Create a new survey
  createSurvey: (surveyData: any) => {
    return apiRequest('/surveys', {
      method: 'POST',
      body: JSON.stringify(surveyData),
    })
  },

  // Submit survey responses
  submitSurveyResponses: (surveyId: string, responses: any[]) => {
    return apiRequest(`/surveys/${surveyId}/responses`, {
      method: 'POST',
      body: JSON.stringify({ responses }),
    })
  },

  // Get survey templates
  getSurveyTemplates: (type?: string) => {
    const queryString = type ? `?type=${type}` : ''
    return apiRequest(`/surveys/templates${queryString}`)
  },

  // Get survey analytics
  getSurveyAnalytics: (params?: { type?: string; period?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.type) searchParams.append('type', params.type)
    if (params?.period) searchParams.append('period', params.period)
    
    const queryString = searchParams.toString()
    return apiRequest(`/surveys/analytics${queryString ? `?${queryString}` : ''}`)
  },

  // Delete survey
  deleteSurvey: (id: string) => {
    return apiRequest(`/surveys/${id}`, {
      method: 'DELETE',
    })
  },
}

// Mood API functions
export const moodAPI = {
  // Get mood entries
  getMoodEntries: (params?: { page?: number; limit?: number; startDate?: string; endDate?: string; moodValue?: number; tags?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.startDate) searchParams.append('startDate', params.startDate)
    if (params?.endDate) searchParams.append('endDate', params.endDate)
    if (params?.moodValue) searchParams.append('moodValue', params.moodValue.toString())
    if (params?.tags) searchParams.append('tags', params.tags)
    
    const queryString = searchParams.toString()
    return apiRequest(`/moods${queryString ? `?${queryString}` : ''}`)
  },

  // Create mood entry
  createMoodEntry: (moodData: any) => {
    return apiRequest('/moods', {
      method: 'POST',
      body: JSON.stringify(moodData),
    })
  },

  // Get mood analytics
  getMoodAnalytics: (params?: { period?: string; startDate?: string; endDate?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.period) searchParams.append('period', params.period)
    if (params?.startDate) searchParams.append('startDate', params.startDate)
    if (params?.endDate) searchParams.append('endDate', params.endDate)
    
    const queryString = searchParams.toString()
    return apiRequest(`/moods/analytics${queryString ? `?${queryString}` : ''}`)
  },

  // Get mood trends
  getMoodTrends: (params?: { period?: string; startDate?: string; endDate?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.period) searchParams.append('period', params.period)
    if (params?.startDate) searchParams.append('startDate', params.startDate)
    if (params?.endDate) searchParams.append('endDate', params.endDate)
    
    const queryString = searchParams.toString()
    return apiRequest(`/moods/trends${queryString ? `?${queryString}` : ''}`)
  },

  // Get mood insights
  getMoodInsights: (params?: { period?: string }) => {
    const queryString = params?.period ? `?period=${params.period}` : ''
    return apiRequest(`/moods/insights${queryString}`)
  },
}

// Auth API functions
export const authAPI = {
  // Login
  login: (credentials: { email: string; password: string }) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  },

  // Register
  register: (userData: { name: string; email: string; password: string }) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  // Logout
  logout: () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    })
  },

  // Get current user
  getCurrentUser: () => {
    return apiRequest('/auth/me')
  },
}

// Activity API functions
export const activityAPI = {
  // Get activities
  getActivities: (params?: { type?: string; category?: string; difficulty?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams()
    if (params?.type) searchParams.append('type', params.type)
    if (params?.category) searchParams.append('category', params.category)
    if (params?.difficulty) searchParams.append('difficulty', params.difficulty)
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    
    const queryString = searchParams.toString()
    return apiRequest(`/activities${queryString ? `?${queryString}` : ''}`)
  },

  // Complete activity
  completeActivity: (activityId: string, completionData: any) => {
    return apiRequest(`/activities/${activityId}/complete`, {
      method: 'POST',
      body: JSON.stringify(completionData),
    })
  },
}

// Forum API functions
export const forumAPI = {
  // Get forum posts
  getPosts: (params?: { category?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.append('category', params.category)
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    
    const queryString = searchParams.toString()
    return apiRequest(`/forum/posts${queryString ? `?${queryString}` : ''}`)
  },

  // Create forum post
  createPost: (postData: any) => {
    return apiRequest('/forum/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    })
  },

  // Reply to post
  replyToPost: (postId: string, replyData: any) => {
    return apiRequest(`/forum/posts/${postId}/replies`, {
      method: 'POST',
      body: JSON.stringify(replyData),
    })
  },
}

// Crisis API functions
export const crisisAPI = {
  // Get crisis resources
  getResources: (params?: { country?: string; type?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.country) searchParams.append('country', params.country)
    if (params?.type) searchParams.append('type', params.type)
    
    const queryString = searchParams.toString()
    return apiRequest(`/crisis/resources${queryString ? `?${queryString}` : ''}`)
  },
}

// Learning API functions
export const learningAPI = {
  // Get learning content
  getContent: (params?: { category?: string; type?: string; difficulty?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.append('category', params.category)
    if (params?.type) searchParams.append('type', params.type)
    if (params?.difficulty) searchParams.append('difficulty', params.difficulty)
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    
    const queryString = searchParams.toString()
    return apiRequest(`/learning/content${queryString ? `?${queryString}` : ''}`)
  },
}

export default {
  surveyAPI,
  moodAPI,
  authAPI,
  activityAPI,
  forumAPI,
  crisisAPI,
  learningAPI,
}

