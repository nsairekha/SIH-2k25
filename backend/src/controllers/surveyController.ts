import { Request, Response } from 'express';
import Survey from '../models/Survey';

// Create a new survey
export const createSurvey = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;
    const surveyData = {
      ...req.body,
      userId
    };

    const survey = new Survey(surveyData);
    await survey.save();

    res.status(201).json({
      success: true,
      message: 'Survey created successfully',
      data: { survey }
    });
  } catch (error) {
    console.error('Create survey error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating survey'
    });
  }
};

// Get surveys for a user
export const getSurveys = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;
    const { type, completed, page = 1, limit = 10 } = req.query;

    const query: any = { userId };

    if (type) {
      query.type = type;
    }

    if (completed !== undefined) {
      query.isCompleted = completed === 'true';
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const surveys = await Survey.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit as string))
      .lean();

    const total = await Survey.countDocuments(query);

    res.json({
      success: true,
      data: {
        surveys,
        pagination: {
          currentPage: parseInt(page as string),
          totalPages: Math.ceil(total / parseInt(limit as string)),
          totalSurveys: total,
          hasNext: skip + surveys.length < total,
          hasPrev: parseInt(page as string) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get surveys error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching surveys'
    });
  }
};

// Get survey by ID
export const getSurveyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;

    const survey = await Survey.findOne({ _id: id, userId });
    if (!survey) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found'
      });
    }

    res.json({
      success: true,
      data: { survey }
    });
  } catch (error) {
    console.error('Get survey error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching survey'
    });
  }
};

// Submit survey responses
export const submitSurveyResponses = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;
    const { responses } = req.body;

    const survey = await Survey.findOne({ _id: id, userId });
    if (!survey) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found'
      });
    }

    if (survey.isCompleted) {
      return res.status(400).json({
        success: false,
        message: 'Survey has already been completed'
      });
    }

    // Validate responses
    const requiredQuestions = survey.questions.filter(q => q.required);
    const providedQuestionIds = responses.map((r: any) => r.questionId);
    
    for (const question of requiredQuestions) {
      if (!providedQuestionIds.includes(question.id)) {
        return res.status(400).json({
          success: false,
          message: `Required question "${question.question}" is missing`
        });
      }
    }

    // Update survey with responses
    survey.responses = responses.map((response: any) => ({
      questionId: response.questionId,
      answer: response.answer,
      timestamp: new Date()
    }));
    
    survey.isCompleted = true;
    survey.completedAt = new Date();
    
    await survey.save();

    res.json({
      success: true,
      message: 'Survey responses submitted successfully',
      data: { survey }
    });
  } catch (error) {
    console.error('Submit survey responses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting survey responses'
    });
  }
};

// Get survey templates
export const getSurveyTemplates = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;

    const templates = {
      daily: {
        type: 'daily',
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
        type: 'weekly',
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
      initial: {
        type: 'initial',
        title: 'Initial Mental Health Assessment',
        description: 'Help us understand your current mental health status and needs',
        questions: [
          {
            id: 'current_mood',
            type: 'mood',
            question: 'How are you feeling right now?',
            required: true,
            category: 'mood'
          },
          {
            id: 'mental_health_concerns',
            type: 'multiple_choice',
            question: 'What mental health concerns are you currently experiencing?',
            options: ['Anxiety', 'Depression', 'Stress', 'Sleep issues', 'Relationship problems', 'Work/school pressure', 'Grief', 'Loneliness', 'Anger management', 'Self-esteem', 'None of the above'],
            required: true,
            category: 'concerns'
          },
          {
            id: 'current_stress_level',
            type: 'scale',
            question: 'How would you rate your current stress level? (1-10)',
            min: 1,
            max: 10,
            required: true,
            category: 'stress'
          },
          {
            id: 'sleep_quality',
            type: 'rating',
            question: 'How would you describe your sleep quality recently?',
            options: ['Very poor', 'Poor', 'Fair', 'Good', 'Very good'],
            required: true,
            category: 'sleep'
          },
          {
            id: 'energy_level',
            type: 'scale',
            question: 'How would you rate your energy level? (1-10)',
            min: 1,
            max: 10,
            required: true,
            category: 'energy'
          },
          {
            id: 'social_support',
            type: 'scale',
            question: 'How would you rate your current social support system? (1-10)',
            min: 1,
            max: 10,
            required: true,
            category: 'social'
          },
          {
            id: 'physical_health',
            type: 'rating',
            question: 'How would you rate your physical health?',
            options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
            required: false,
            category: 'physical'
          },
          {
            id: 'previous_therapy',
            type: 'boolean',
            question: 'Have you received mental health treatment or therapy before?',
            required: true,
            category: 'history'
          },
          {
            id: 'current_medication',
            type: 'boolean',
            question: 'Are you currently taking any medication for mental health?',
            required: true,
            category: 'medication'
          },
          {
            id: 'crisis_support',
            type: 'boolean',
            question: 'Do you have access to crisis support resources?',
            required: true,
            category: 'crisis'
          },
          {
            id: 'coping_strategies',
            type: 'multiple_choice',
            question: 'What coping strategies do you currently use?',
            options: ['Exercise', 'Meditation', 'Talking to friends/family', 'Journaling', 'Hobbies', 'Music', 'Nature walks', 'Professional help', 'None', 'Other'],
            required: false,
            category: 'coping'
          },
          {
            id: 'goals',
            type: 'text',
            question: 'What are your main goals for improving your mental health?',
            required: false,
            category: 'goals'
          },
          {
            id: 'preferred_activities',
            type: 'multiple_choice',
            question: 'Which activities interest you most?',
            options: ['Meditation', 'Journaling', 'Exercise', 'Learning', 'Community support', 'Crisis resources', 'Mood tracking', 'All of the above'],
            required: false,
            category: 'preferences'
          }
        ]
      },
      quick: {
        type: 'custom',
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
      },
      comprehensive: {
        type: 'custom',
        title: 'Comprehensive Mental Health Assessment',
        description: 'A detailed assessment covering all aspects of mental health and well-being',
        questions: [
          {
            id: 'mood_comprehensive',
            type: 'mood',
            question: 'How is your overall mood today?',
            required: true,
            category: 'mood'
          },
          {
            id: 'emotions_experienced',
            type: 'multiple_choice',
            question: 'Which emotions have you experienced today?',
            options: ['Happiness', 'Sadness', 'Anxiety', 'Anger', 'Calm', 'Excitement', 'Frustration', 'Contentment', 'Loneliness', 'Confidence', 'Fear', 'Hope'],
            required: true,
            category: 'emotions'
          },
          {
            id: 'stress_level',
            type: 'scale',
            question: 'How stressed do you feel right now? (1-10)',
            min: 1,
            max: 10,
            required: true,
            category: 'stress'
          },
          {
            id: 'anxiety_level',
            type: 'scale',
            question: 'How anxious do you feel? (1-10)',
            min: 1,
            max: 10,
            required: true,
            category: 'anxiety'
          },
          {
            id: 'energy_level',
            type: 'scale',
            question: 'How energetic do you feel? (1-10)',
            min: 1,
            max: 10,
            required: true,
            category: 'energy'
          },
          {
            id: 'sleep_quality',
            type: 'rating',
            question: 'How would you rate your sleep quality?',
            options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
            required: true,
            category: 'sleep'
          },
          {
            id: 'sleep_hours',
            type: 'scale',
            question: 'How many hours of sleep did you get? (1-12)',
            min: 1,
            max: 12,
            required: false,
            category: 'sleep'
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
            id: 'physical_health',
            type: 'rating',
            question: 'How would you rate your physical health?',
            options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
            required: false,
            category: 'physical'
          },
          {
            id: 'social_satisfaction',
            type: 'scale',
            question: 'How satisfied are you with your social connections? (1-10)',
            min: 1,
            max: 10,
            required: true,
            category: 'social'
          },
          {
            id: 'loneliness',
            type: 'rating',
            question: 'How often do you feel lonely?',
            options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
            required: false,
            category: 'social'
          },
          {
            id: 'productivity',
            type: 'scale',
            question: 'How productive do you feel today? (1-10)',
            min: 1,
            max: 10,
            required: true,
            category: 'productivity'
          },
          {
            id: 'motivation',
            type: 'scale',
            question: 'How motivated do you feel? (1-10)',
            min: 1,
            max: 10,
            required: false,
            category: 'motivation'
          },
          {
            id: 'self_care',
            type: 'rating',
            question: 'How well did you practice self-care today?',
            options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
            required: false,
            category: 'self_care'
          },
          {
            id: 'exercise',
            type: 'boolean',
            question: 'Did you exercise or engage in physical activity today?',
            required: false,
            category: 'physical'
          },
          {
            id: 'social_interaction',
            type: 'boolean',
            question: 'Did you have meaningful social interaction today?',
            required: false,
            category: 'social'
          },
          {
            id: 'stress_sources',
            type: 'multiple_choice',
            question: 'What are your main sources of stress today?',
            options: ['Work/School', 'Relationships', 'Health', 'Finances', 'Family', 'Social situations', 'Future concerns', 'Physical pain', 'Loneliness', 'None'],
            required: false,
            category: 'stress'
          },
          {
            id: 'coping_strategies',
            type: 'multiple_choice',
            question: 'What coping strategies did you use today?',
            options: ['Exercise', 'Meditation/Mindfulness', 'Talking to friends/family', 'Journaling', 'Hobbies', 'Music', 'Nature walks', 'Reading', 'Cooking', 'Art/Creative activities', 'None'],
            required: false,
            category: 'coping'
          },
          {
            id: 'challenges',
            type: 'text',
            question: 'What was your biggest challenge today?',
            required: false,
            category: 'challenges'
          },
          {
            id: 'achievements',
            type: 'text',
            question: 'What are you proud of accomplishing today?',
            required: false,
            category: 'achievements'
          },
          {
            id: 'gratitude',
            type: 'text',
            question: 'What are you grateful for today?',
            required: false,
            category: 'gratitude'
          },
          {
            id: 'goals',
            type: 'text',
            question: 'What would you like to focus on improving?',
            required: false,
            category: 'goals'
          }
        ]
      }
    };

    let selectedTemplate: any = templates;
    if (type && templates[type as keyof typeof templates]) {
      selectedTemplate = { [type as string]: templates[type as keyof typeof templates] };
    }

    res.json({
      success: true,
      data: { templates: selectedTemplate }
    });
  } catch (error) {
    console.error('Get survey templates error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching survey templates'
    });
  }
};

// Get survey analytics
export const getSurveyAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;
    const { type, period = 'month' } = req.query;

    let dateFilter: any = {};
    const now = new Date();
    
    switch (period) {
      case 'week':
        dateFilter = {
          completedAt: {
            $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          }
        };
        break;
      case 'month':
        dateFilter = {
          completedAt: {
            $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          }
        };
        break;
      case 'quarter':
        dateFilter = {
          completedAt: {
            $gte: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
          }
        };
        break;
      case 'year':
        dateFilter = {
          completedAt: {
            $gte: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
          }
        };
        break;
    }

    const query: any = { userId, isCompleted: true, ...dateFilter };
    if (type) {
      query.type = type;
    }

    const surveys = await Survey.find(query).lean();

    // Calculate analytics
    const totalSurveys = surveys.length;
    const completionRate = totalSurveys > 0 ? (surveys.length / surveys.length) * 100 : 0;

    // Response analysis by category
    const categoryAnalysis: { [key: string]: any[] } = {};
    surveys.forEach(survey => {
      survey.responses.forEach(response => {
        const question = survey.questions.find(q => q.id === response.questionId);
        if (question) {
          if (!categoryAnalysis[question.category]) {
            categoryAnalysis[question.category] = [];
          }
          categoryAnalysis[question.category].push({
            question: question.question,
            answer: response.answer,
            timestamp: response.timestamp
          });
        }
      });
    });

    // Mood trends
    const moodResponses = categoryAnalysis.mood || [];
    const moodTrends = moodResponses.map(response => ({
      date: response.timestamp.toISOString().split('T')[0],
      mood: response.answer
    }));

    // Stress level trends
    const stressResponses = categoryAnalysis.stress || [];
    const stressTrends = stressResponses.map(response => ({
      date: response.timestamp.toISOString().split('T')[0],
      stress: response.answer
    }));

    res.json({
      success: true,
      data: {
        summary: {
          totalSurveys,
          completionRate,
          period: period as string
        },
        categoryAnalysis,
        moodTrends,
        stressTrends
      }
    });
  } catch (error) {
    console.error('Get survey analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching survey analytics'
    });
  }
};

// Delete survey
export const deleteSurvey = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;

    const survey = await Survey.findOneAndDelete({ _id: id, userId });
    if (!survey) {
      return res.status(404).json({
        success: false,
        message: 'Survey not found'
      });
    }

    res.json({
      success: true,
      message: 'Survey deleted successfully'
    });
  } catch (error) {
    console.error('Delete survey error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting survey'
    });
  }
};
