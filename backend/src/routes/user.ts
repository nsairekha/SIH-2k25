import express from 'express';
import { body } from 'express-validator';
import {
  updateProfile,
  updatePreferences,
  uploadAvatar,
  deleteAccount,
  getStats
} from '../controllers/userController';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { upload } from '../middleware/upload';

const router = express.Router();

// Validation rules
const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('age')
    .optional()
    .isInt({ min: 13, max: 120 })
    .withMessage('Age must be between 13 and 120')
];

const updatePreferencesValidation = [
  body('theme')
    .optional()
    .isIn(['light', 'dark', 'system'])
    .withMessage('Theme must be light, dark, or system'),
  body('language')
    .optional()
    .isIn(['en', 'es', 'fr'])
    .withMessage('Language must be en, es, or fr'),
  body('notifications')
    .optional()
    .isBoolean()
    .withMessage('Notifications must be a boolean'),
  body('ageGroup')
    .optional()
    .isIn(['child', 'teen', 'adult', 'senior'])
    .withMessage('Age group must be child, teen, adult, or senior'),
  body('accessibility.highContrast')
    .optional()
    .isBoolean()
    .withMessage('High contrast must be a boolean'),
  body('accessibility.largeText')
    .optional()
    .isBoolean()
    .withMessage('Large text must be a boolean'),
  body('accessibility.reducedMotion')
    .optional()
    .isBoolean()
    .withMessage('Reduced motion must be a boolean'),
  body('accessibility.screenReader')
    .optional()
    .isBoolean()
    .withMessage('Screen reader must be a boolean')
];

// Routes
router.put('/profile', authenticate, updateProfileValidation, validateRequest, updateProfile);
router.put('/preferences', authenticate, updatePreferencesValidation, validateRequest, updatePreferences);
router.post('/avatar', authenticate, upload.single('avatar'), uploadAvatar);
router.delete('/account', authenticate, deleteAccount);
router.get('/stats', authenticate, getStats);

export default router;


