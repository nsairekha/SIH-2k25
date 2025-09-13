import express from 'express';
import {
  createSurvey,
  getSurveys,
  getSurveyById,
  submitSurveyResponses,
  getSurveyTemplates,
  getSurveyAnalytics,
  deleteSurvey
} from '../controllers/surveyController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Survey CRUD operations
router.post('/', createSurvey);
router.get('/', getSurveys);
router.get('/templates', getSurveyTemplates);
router.get('/analytics', getSurveyAnalytics);
router.get('/:id', getSurveyById);
router.post('/:id/responses', submitSurveyResponses);
router.delete('/:id', deleteSurvey);

export default router;

