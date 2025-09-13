import express from 'express';
import { body, query } from 'express-validator';
import {
  createMoodEntry,
  getMoodEntries,
  getMoodEntryById,
  updateMoodEntry,
  deleteMoodEntry,
  getMoodAnalytics,
  getMoodTrends,
  getMoodInsights
} from '../controllers/moodController';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

// Validation rules
const createMoodValidation = [
  body('mood.value')
    .isInt({ min: 1, max: 5 })
    .withMessage('Mood value must be between 1 and 5'),
  body('mood.emoji')
    .notEmpty()
    .withMessage('Mood emoji is required'),
  body('mood.label')
    .notEmpty()
    .withMessage('Mood label is required'),
  body('intensity')
    .isInt({ min: 1, max: 10 })
    .withMessage('Intensity must be between 1 and 10'),
  body('emotions')
    .isArray()
    .withMessage('Emotions must be an array'),
  body('emotions.*.name')
    .notEmpty()
    .withMessage('Emotion name is required'),
  body('emotions.*.intensity')
    .isInt({ min: 1, max: 10 })
    .withMessage('Emotion intensity must be between 1 and 10'),
  body('emotions.*.category')
    .notEmpty()
    .withMessage('Emotion category is required'),
  body('triggers')
    .optional()
    .isArray()
    .withMessage('Triggers must be an array'),
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters'),
  body('location')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters'),
  body('weather')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Weather cannot exceed 50 characters'),
  body('sleepHours')
    .optional()
    .isFloat({ min: 0, max: 24 })
    .withMessage('Sleep hours must be between 0 and 24'),
  body('stressLevel')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Stress level must be between 1 and 10'),
  body('energyLevel')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Energy level must be between 1 and 10'),
  body('socialActivity')
    .optional()
    .isBoolean()
    .withMessage('Social activity must be a boolean'),
  body('exercise')
    .optional()
    .isBoolean()
    .withMessage('Exercise must be a boolean'),
  body('medication')
    .optional()
    .isBoolean()
    .withMessage('Medication must be a boolean'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('isPrivate')
    .optional()
    .isBoolean()
    .withMessage('isPrivate must be a boolean')
];

const updateMoodValidation = [
  body('mood.value')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Mood value must be between 1 and 5'),
  body('mood.emoji')
    .optional()
    .notEmpty()
    .withMessage('Mood emoji cannot be empty'),
  body('mood.label')
    .optional()
    .notEmpty()
    .withMessage('Mood label cannot be empty'),
  body('intensity')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Intensity must be between 1 and 10'),
  body('emotions')
    .optional()
    .isArray()
    .withMessage('Emotions must be an array'),
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters')
];

const getMoodEntriesValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date'),
  query('moodValue')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Mood value must be between 1 and 5'),
  query('tags')
    .optional()
    .isString()
    .withMessage('Tags must be a string')
];

const getAnalyticsValidation = [
  query('period')
    .optional()
    .isIn(['week', 'month', 'quarter', 'year'])
    .withMessage('Period must be one of: week, month, quarter, year'),
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date')
];

// Routes
router.post('/', authenticate, createMoodValidation, validateRequest, createMoodEntry);
router.get('/', authenticate, getMoodEntriesValidation, validateRequest, getMoodEntries);
router.get('/analytics', authenticate, getAnalyticsValidation, validateRequest, getMoodAnalytics);
router.get('/trends', authenticate, getAnalyticsValidation, validateRequest, getMoodTrends);
router.get('/insights', authenticate, getAnalyticsValidation, validateRequest, getMoodInsights);
router.get('/:id', authenticate, getMoodEntryById);
router.put('/:id', authenticate, updateMoodValidation, validateRequest, updateMoodEntry);
router.delete('/:id', authenticate, deleteMoodEntry);

export default router;


