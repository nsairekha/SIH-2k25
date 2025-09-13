import express from 'express';
import { body, query } from 'express-validator';
import {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  completeActivity,
  getActivityStats
} from '../controllers/activityController';
import { authenticate, adminOnly } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

// Validation rules
const createActivityValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('type')
    .isIn(['meditation', 'breathing', 'journaling', 'exercise', 'learning', 'movement'])
    .withMessage('Type must be one of: meditation, breathing, journaling, exercise, learning, movement'),
  body('duration')
    .isInt({ min: 1, max: 300 })
    .withMessage('Duration must be between 1 and 300 minutes'),
  body('difficulty')
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Difficulty must be beginner, intermediate, or advanced'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('content.instructions')
    .isArray({ min: 1 })
    .withMessage('At least one instruction is required'),
  body('content.instructions.*')
    .trim()
    .notEmpty()
    .withMessage('Instructions cannot be empty'),
  body('points')
    .isInt({ min: 0, max: 1000 })
    .withMessage('Points must be between 0 and 1000'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
];

const updateActivityValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('duration')
    .optional()
    .isInt({ min: 1, max: 300 })
    .withMessage('Duration must be between 1 and 300 minutes'),
  body('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Difficulty must be beginner, intermediate, or advanced'),
  body('points')
    .optional()
    .isInt({ min: 0, max: 1000 })
    .withMessage('Points must be between 0 and 1000')
];

const getActivitiesValidation = [
  query('type')
    .optional()
    .isIn(['meditation', 'breathing', 'journaling', 'exercise', 'learning', 'movement'])
    .withMessage('Type must be one of: meditation, breathing, journaling, exercise, learning, movement'),
  query('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Difficulty must be beginner, intermediate, or advanced'),
  query('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

const completeActivityValidation = [
  body('duration')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5')
];

// Routes
router.get('/', authenticate, getActivitiesValidation, validateRequest, getActivities);
router.get('/stats', authenticate, getActivityStats);
router.get('/:id', authenticate, getActivityById);
router.post('/', authenticate, adminOnly, createActivityValidation, validateRequest, createActivity);
router.put('/:id', authenticate, adminOnly, updateActivityValidation, validateRequest, updateActivity);
router.delete('/:id', authenticate, adminOnly, deleteActivity);
router.post('/:id/complete', authenticate, completeActivityValidation, validateRequest, completeActivity);

export default router;


