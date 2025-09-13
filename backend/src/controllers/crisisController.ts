import { Request, Response } from 'express';

// Crisis resources data
const crisisResources = {
  US: [
    {
      id: '1',
      name: 'National Suicide Prevention Lifeline',
      type: 'hotline',
      contact: '988',
      description: '24/7 crisis support and suicide prevention',
      country: 'US',
      language: 'en',
      available24h: true
    },
    {
      id: '2',
      name: 'Crisis Text Line',
      type: 'text',
      contact: 'Text HOME to 741741',
      description: '24/7 crisis support via text message',
      country: 'US',
      language: 'en',
      available24h: true
    },
    {
      id: '3',
      name: 'SAMHSA National Helpline',
      type: 'hotline',
      contact: '1-800-662-4357',
      description: 'Substance abuse and mental health services',
      country: 'US',
      language: 'en',
      available24h: true
    }
  ],
  CA: [
    {
      id: '4',
      name: 'Crisis Services Canada',
      type: 'hotline',
      contact: '1-833-456-4566',
      description: '24/7 crisis support across Canada',
      country: 'CA',
      language: 'en',
      available24h: true
    }
  ],
  UK: [
    {
      id: '5',
      name: 'Samaritans',
      type: 'hotline',
      contact: '116 123',
      description: '24/7 emotional support',
      country: 'UK',
      language: 'en',
      available24h: true
    }
  ]
};

// Get crisis resources
export const getCrisisResources = async (req: Request, res: Response) => {
  try {
    const { country, type, available24h } = req.query;

    let resources = Object.values(crisisResources).flat();

    if (country) {
      resources = resources.filter(resource => resource.country === country);
    }

    if (type) {
      resources = resources.filter(resource => resource.type === type);
    }

    if (available24h === 'true') {
      resources = resources.filter(resource => resource.available24h);
    }

    res.json({
      success: true,
      data: { resources }
    });
  } catch (error) {
    console.error('Get crisis resources error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching crisis resources'
    });
  }
};

// Get crisis resources by country
export const getCrisisResourcesByCountry = async (req: Request, res: Response) => {
  try {
    const { country } = req.params;

    const resources = crisisResources[country as keyof typeof crisisResources] || [];

    res.json({
      success: true,
      data: { resources }
    });
  } catch (error) {
    console.error('Get crisis resources by country error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching crisis resources'
    });
  }
};

// Get coping strategies
export const getCopingStrategies = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    const strategies = {
      anxiety: [
        {
          id: '1',
          title: 'Deep Breathing',
          description: 'Practice 4-7-8 breathing technique',
          steps: [
            'Breathe in for 4 counts',
            'Hold for 7 counts',
            'Breathe out for 8 counts',
            'Repeat 3-4 times'
          ]
        },
        {
          id: '2',
          title: 'Grounding Technique',
          description: 'Use your senses to ground yourself',
          steps: [
            'Name 5 things you can see',
            'Name 4 things you can touch',
            'Name 3 things you can hear',
            'Name 2 things you can smell',
            'Name 1 thing you can taste'
          ]
        }
      ],
      depression: [
        {
          id: '3',
          title: 'Physical Activity',
          description: 'Engage in light physical activity',
          steps: [
            'Take a short walk',
            'Do gentle stretching',
            'Dance to your favorite song',
            'Do household chores'
          ]
        },
        {
          id: '4',
          title: 'Gratitude Practice',
          description: 'Focus on positive aspects of your life',
          steps: [
            'Write down 3 things you\'re grateful for',
            'Think about a recent positive experience',
            'Express gratitude to someone',
            'Notice small pleasures throughout the day'
          ]
        }
      ],
      panic: [
        {
          id: '5',
          title: 'Box Breathing',
          description: 'Calm your nervous system with box breathing',
          steps: [
            'Breathe in for 4 counts',
            'Hold for 4 counts',
            'Breathe out for 4 counts',
            'Hold for 4 counts',
            'Repeat until calm'
          ]
        }
      ],
      stress: [
        {
          id: '6',
          title: 'Progressive Muscle Relaxation',
          description: 'Release tension through muscle relaxation',
          steps: [
            'Start with your toes',
            'Tense each muscle group for 5 seconds',
            'Release and notice the relaxation',
            'Move up through your body'
          ]
        }
      ],
      anger: [
        {
          id: '7',
          title: 'Time-Out Technique',
          description: 'Take a break to cool down',
          steps: [
            'Recognize the anger building',
            'Excuse yourself from the situation',
            'Take deep breaths',
            'Return when calmer'
          ]
        }
      ],
      general: [
        {
          id: '8',
          title: 'Mindfulness Meditation',
          description: 'Practice present-moment awareness',
          steps: [
            'Find a quiet space',
            'Focus on your breath',
            'Notice thoughts without judgment',
            'Return attention to breath when distracted'
          ]
        }
      ]
    };

    let selectedStrategies = strategies.general;
    if (category && strategies[category as keyof typeof strategies]) {
      selectedStrategies = strategies[category as keyof typeof strategies];
    }

    res.json({
      success: true,
      data: { strategies: selectedStrategies }
    });
  } catch (error) {
    console.error('Get coping strategies error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching coping strategies'
    });
  }
};

// Get safety plan
export const getSafetyPlan = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;

    // Here you would typically get the user's safety plan from the database
    // For now, we'll return a template
    const safetyPlan = {
      userId,
      warningSigns: [],
      copingStrategies: [],
      socialContacts: [],
      professionalContacts: [],
      environmentSafety: [],
      reasonsForLiving: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.json({
      success: true,
      data: { safetyPlan }
    });
  } catch (error) {
    console.error('Get safety plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching safety plan'
    });
  }
};

// Create safety plan
export const createSafetyPlan = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;
    const safetyPlanData = {
      ...req.body,
      userId
    };

    // Here you would typically save the safety plan to the database
    res.status(201).json({
      success: true,
      message: 'Safety plan created successfully',
      data: { safetyPlan: safetyPlanData }
    });
  } catch (error) {
    console.error('Create safety plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating safety plan'
    });
  }
};

// Update safety plan
export const updateSafetyPlan = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;

    // Here you would typically update the safety plan in the database
    res.json({
      success: true,
      message: 'Safety plan updated successfully',
      data: { safetyPlan: req.body }
    });
  } catch (error) {
    console.error('Update safety plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating safety plan'
    });
  }
};

// Report crisis
export const reportCrisis = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;
    const { severity, description, location } = req.body;

    // Here you would typically log the crisis report and potentially alert emergency services
    // For now, we'll just acknowledge the report
    res.json({
      success: true,
      message: 'Crisis report received. Please contact emergency services if you are in immediate danger.',
      data: {
        reportId: 'crisis_' + Date.now(),
        userId,
        severity,
        reportedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Report crisis error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while reporting crisis'
    });
  }
};
