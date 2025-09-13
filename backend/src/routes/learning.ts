import express from 'express';
import { body, query } from 'express-validator';
import {
  getContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  markAsRead,
  getReadingHistory,
  getRecommendations
} from '../controllers/learningController';
import { authenticate, adminOnly } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

// Validation rules
const createContentValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('content')
    .trim()
    .isLength({ min: 50 })
    .withMessage('Content must be at least 50 characters'),
  body('type')
    .isIn(['article', 'video', 'infographic', 'quiz', 'animation'])
    .withMessage('Type must be one of: article, video, infographic, quiz, animation'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('difficulty')
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Difficulty must be beginner, intermediate, or advanced'),
  body('estimatedTime')
    .isInt({ min: 1, max: 120 })
    .withMessage('Estimated time must be between 1 and 120 minutes'),
  body('tags')
    .isArray({ min: 1 })
    .withMessage('At least one tag is required'),
  body('isInteractive')
    .optional()
    .isBoolean()
    .withMessage('isInteractive must be a boolean')
];

const updateContentValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 50 })
    .withMessage('Content must be at least 50 characters'),
  body('estimatedTime')
    .optional()
    .isInt({ min: 1, max: 120 })
    .withMessage('Estimated time must be between 1 and 120 minutes'),
  body('tags')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one tag is required')
];

const getContentValidation = [
  query('type')
    .optional()
    .isIn(['article', 'video', 'infographic', 'quiz', 'animation'])
    .withMessage('Invalid type'),
  query('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty'),
  query('difficulty')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Invalid difficulty'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('sort')
    .optional()
    .isIn(['newest', 'oldest', 'most_read', 'highest_rated'])
    .withMessage('Sort must be newest, oldest, most_read, or highest_rated')
];

const markAsReadValidation = [
  body('timeSpent')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Time spent must be a positive integer'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters')
];

// Routes
router.get('/', authenticate, getContentValidation, validateRequest, getContent);
router.get('/recommendations', authenticate, getRecommendations);
router.get('/history', authenticate, getReadingHistory);
router.get('/:id', authenticate, getContentById);
router.post('/', authenticate, adminOnly, createContentValidation, validateRequest, createContent);
router.put('/:id', authenticate, adminOnly, updateContentValidation, validateRequest, updateContent);
router.delete('/:id', authenticate, adminOnly, deleteContent);
router.post('/:id/read', authenticate, markAsReadValidation, validateRequest, markAsRead);

export default router;


