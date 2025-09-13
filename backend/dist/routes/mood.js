"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const moodController_1 = require("../controllers/moodController");
const auth_1 = require("../middleware/auth");
const validateRequest_1 = require("../middleware/validateRequest");
const router = express_1.default.Router();
const createMoodValidation = [
    (0, express_validator_1.body)('mood.value')
        .isInt({ min: 1, max: 5 })
        .withMessage('Mood value must be between 1 and 5'),
    (0, express_validator_1.body)('mood.emoji')
        .notEmpty()
        .withMessage('Mood emoji is required'),
    (0, express_validator_1.body)('mood.label')
        .notEmpty()
        .withMessage('Mood label is required'),
    (0, express_validator_1.body)('intensity')
        .isInt({ min: 1, max: 10 })
        .withMessage('Intensity must be between 1 and 10'),
    (0, express_validator_1.body)('emotions')
        .isArray()
        .withMessage('Emotions must be an array'),
    (0, express_validator_1.body)('emotions.*.name')
        .notEmpty()
        .withMessage('Emotion name is required'),
    (0, express_validator_1.body)('emotions.*.intensity')
        .isInt({ min: 1, max: 10 })
        .withMessage('Emotion intensity must be between 1 and 10'),
    (0, express_validator_1.body)('emotions.*.category')
        .notEmpty()
        .withMessage('Emotion category is required'),
    (0, express_validator_1.body)('triggers')
        .optional()
        .isArray()
        .withMessage('Triggers must be an array'),
    (0, express_validator_1.body)('notes')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('Notes cannot exceed 1000 characters'),
    (0, express_validator_1.body)('location')
        .optional()
        .isLength({ max: 100 })
        .withMessage('Location cannot exceed 100 characters'),
    (0, express_validator_1.body)('weather')
        .optional()
        .isLength({ max: 50 })
        .withMessage('Weather cannot exceed 50 characters'),
    (0, express_validator_1.body)('sleepHours')
        .optional()
        .isFloat({ min: 0, max: 24 })
        .withMessage('Sleep hours must be between 0 and 24'),
    (0, express_validator_1.body)('stressLevel')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage('Stress level must be between 1 and 10'),
    (0, express_validator_1.body)('energyLevel')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage('Energy level must be between 1 and 10'),
    (0, express_validator_1.body)('socialActivity')
        .optional()
        .isBoolean()
        .withMessage('Social activity must be a boolean'),
    (0, express_validator_1.body)('exercise')
        .optional()
        .isBoolean()
        .withMessage('Exercise must be a boolean'),
    (0, express_validator_1.body)('medication')
        .optional()
        .isBoolean()
        .withMessage('Medication must be a boolean'),
    (0, express_validator_1.body)('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array'),
    (0, express_validator_1.body)('isPrivate')
        .optional()
        .isBoolean()
        .withMessage('isPrivate must be a boolean')
];
const updateMoodValidation = [
    (0, express_validator_1.body)('mood.value')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Mood value must be between 1 and 5'),
    (0, express_validator_1.body)('mood.emoji')
        .optional()
        .notEmpty()
        .withMessage('Mood emoji cannot be empty'),
    (0, express_validator_1.body)('mood.label')
        .optional()
        .notEmpty()
        .withMessage('Mood label cannot be empty'),
    (0, express_validator_1.body)('intensity')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage('Intensity must be between 1 and 10'),
    (0, express_validator_1.body)('emotions')
        .optional()
        .isArray()
        .withMessage('Emotions must be an array'),
    (0, express_validator_1.body)('notes')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('Notes cannot exceed 1000 characters')
];
const getMoodEntriesValidation = [
    (0, express_validator_1.query)('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    (0, express_validator_1.query)('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
    (0, express_validator_1.query)('startDate')
        .optional()
        .isISO8601()
        .withMessage('Start date must be a valid ISO 8601 date'),
    (0, express_validator_1.query)('endDate')
        .optional()
        .isISO8601()
        .withMessage('End date must be a valid ISO 8601 date'),
    (0, express_validator_1.query)('moodValue')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Mood value must be between 1 and 5'),
    (0, express_validator_1.query)('tags')
        .optional()
        .isString()
        .withMessage('Tags must be a string')
];
const getAnalyticsValidation = [
    (0, express_validator_1.query)('period')
        .optional()
        .isIn(['week', 'month', 'quarter', 'year'])
        .withMessage('Period must be one of: week, month, quarter, year'),
    (0, express_validator_1.query)('startDate')
        .optional()
        .isISO8601()
        .withMessage('Start date must be a valid ISO 8601 date'),
    (0, express_validator_1.query)('endDate')
        .optional()
        .isISO8601()
        .withMessage('End date must be a valid ISO 8601 date')
];
router.post('/', auth_1.authenticate, createMoodValidation, validateRequest_1.validateRequest, moodController_1.createMoodEntry);
router.get('/', auth_1.authenticate, getMoodEntriesValidation, validateRequest_1.validateRequest, moodController_1.getMoodEntries);
router.get('/analytics', auth_1.authenticate, getAnalyticsValidation, validateRequest_1.validateRequest, moodController_1.getMoodAnalytics);
router.get('/trends', auth_1.authenticate, getAnalyticsValidation, validateRequest_1.validateRequest, moodController_1.getMoodTrends);
router.get('/insights', auth_1.authenticate, getAnalyticsValidation, validateRequest_1.validateRequest, moodController_1.getMoodInsights);
router.get('/:id', auth_1.authenticate, moodController_1.getMoodEntryById);
router.put('/:id', auth_1.authenticate, updateMoodValidation, validateRequest_1.validateRequest, moodController_1.updateMoodEntry);
router.delete('/:id', auth_1.authenticate, moodController_1.deleteMoodEntry);
exports.default = router;
//# sourceMappingURL=mood.js.map