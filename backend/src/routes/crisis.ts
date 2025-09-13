import express from 'express';
import { query } from 'express-validator';
import {
  getCrisisResources,
  getCrisisResourcesByCountry,
  getCopingStrategies,
  getSafetyPlan,
  createSafetyPlan,
  updateSafetyPlan,
  reportCrisis
} from '../controllers/crisisController';
import { authenticate, optionalAuth } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

// Validation rules
const getResourcesValidation = [
  query('country')
    .optional()
    .isLength({ min: 2, max: 2 })
    .withMessage('Country code must be 2 characters'),
  query('type')
    .optional()
    .isIn(['hotline', 'text', 'chat', 'website'])
    .withMessage('Type must be hotline, text, chat, or website'),
  query('available24h')
    .optional()
    .isBoolean()
    .withMessage('available24h must be a boolean')
];

const getCopingStrategiesValidation = [
  query('category')
    .optional()
    .isIn(['anxiety', 'depression', 'panic', 'stress', 'anger', 'general'])
    .withMessage('Invalid category')
];

// Routes
router.get('/resources', optionalAuth, getResourcesValidation, validateRequest, getCrisisResources);
router.get('/resources/:country', optionalAuth, getCrisisResourcesByCountry);
router.get('/coping-strategies', optionalAuth, getCopingStrategiesValidation, validateRequest, getCopingStrategies);
router.get('/safety-plan', authenticate, getSafetyPlan);
router.post('/safety-plan', authenticate, createSafetyPlan);
router.put('/safety-plan', authenticate, updateSafetyPlan);
router.post('/report', authenticate, reportCrisis);

export default router;


