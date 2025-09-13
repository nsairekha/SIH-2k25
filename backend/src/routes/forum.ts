import express from 'express';
import { body, query } from 'express-validator';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  replyToPost,
  searchPosts,
  getCategories
} from '../controllers/forumController';
import { authenticate, optionalAuth } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

// Validation rules
const createPostValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('content')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Content must be between 10 and 5000 characters'),
  body('category')
    .isIn(['general', 'anxiety', 'depression', 'recovery', 'crisis', 'tips', 'success'])
    .withMessage('Category must be one of: general, anxiety, depression, recovery, crisis, tips, success'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('isAnonymous')
    .optional()
    .isBoolean()
    .withMessage('isAnonymous must be a boolean')
];

const updatePostValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Content must be between 10 and 5000 characters'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
];

const replyValidation = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Reply content must be between 1 and 2000 characters'),
  body('isAnonymous')
    .optional()
    .isBoolean()
    .withMessage('isAnonymous must be a boolean')
];

const getPostsValidation = [
  query('category')
    .optional()
    .isIn(['general', 'anxiety', 'depression', 'recovery', 'crisis', 'tips', 'success'])
    .withMessage('Invalid category'),
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
    .isIn(['newest', 'oldest', 'most_liked', 'most_replied'])
    .withMessage('Sort must be newest, oldest, most_liked, or most_replied')
];

const searchValidation = [
  query('q')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Search query is required'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

// Routes
router.get('/categories', getCategories);
router.get('/search', optionalAuth, searchValidation, validateRequest, searchPosts);
router.get('/', optionalAuth, getPostsValidation, validateRequest, getPosts);
router.get('/:id', optionalAuth, getPostById);
router.post('/', authenticate, createPostValidation, validateRequest, createPost);
router.put('/:id', authenticate, updatePostValidation, validateRequest, updatePost);
router.delete('/:id', authenticate, deletePost);
router.post('/:id/like', authenticate, likePost);
router.post('/:id/reply', authenticate, replyValidation, validateRequest, replyToPost);

export default router;


