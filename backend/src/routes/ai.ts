import express from 'express';
import { body, query } from 'express-validator';
import {
  generateContentRecommendations,
  moderateContent,
  generateInsights,
  chatWithAI,
  analyzeMoodPatterns,
  suggestActivities
} from '../controllers/aiController';
import { authenticate, optionalAuth } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

// Validation rules
const generateRecommendationsValidation = [
  body('userId')
    .isMongoId()
    .withMessage('Valid user ID is required'),
  body('contentType')
    .isIn(['article', 'activity', 'meditation', 'breathing', 'learning'])
    .withMessage('Content type must be one of: article, activity, meditation, breathing, learning'),
  body('preferences')
    .optional()
    .isObject()
    .withMessage('Preferences must be an object'),
  body('history')
    .optional()
    .isArray()
    .withMessage('History must be an array')
];

const moderateContentValidation = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 5000 })
    .withMessage('Content must be between 1 and 5000 characters'),
  body('type')
    .isIn(['post', 'reply', 'comment', 'message'])
    .withMessage('Type must be post, reply, comment, or message')
];

const generateInsightsValidation = [
  body('data')
    .isObject()
    .withMessage('Data must be an object'),
  body('type')
    .isIn(['mood', 'activity', 'general'])
    .withMessage('Type must be mood, activity, or general')
];

const chatValidation = [
  body('message')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters'),
  body('context')
    .optional()
    .isObject()
    .withMessage('Context must be an object')
];

const analyzeMoodValidation = [
  body('moodEntries')
    .isArray({ min: 1 })
    .withMessage('At least one mood entry is required'),
  body('timeframe')
    .optional()
    .isIn(['week', 'month', 'quarter', 'year'])
    .withMessage('Timeframe must be week, month, quarter, or year')
];

const suggestActivitiesValidation = [
  body('currentMood')
    .isInt({ min: 1, max: 5 })
    .withMessage('Current mood must be between 1 and 5'),
  body('preferences')
    .optional()
    .isObject()
    .withMessage('Preferences must be an object'),
  body('availableTime')
    .optional()
    .isInt({ min: 1, max: 120 })
    .withMessage('Available time must be between 1 and 120 minutes')
];

// Routes
router.post('/recommendations', authenticate, generateRecommendationsValidation, validateRequest, generateContentRecommendations);
router.post('/moderate', authenticate, moderateContentValidation, validateRequest, moderateContent);
router.post('/insights', authenticate, generateInsightsValidation, validateRequest, generateInsights);
router.post('/chat', authenticate, chatValidation, validateRequest, chatWithAI);
router.post('/analyze-mood', authenticate, analyzeMoodValidation, validateRequest, analyzeMoodPatterns);
router.post('/suggest-activities', authenticate, suggestActivitiesValidation, validateRequest, suggestActivities);

export default router;


