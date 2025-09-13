"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const aiController_1 = require("../controllers/aiController");
const auth_1 = require("../middleware/auth");
const validateRequest_1 = require("../middleware/validateRequest");
const router = express_1.default.Router();
const generateRecommendationsValidation = [
    (0, express_validator_1.body)('userId')
        .isMongoId()
        .withMessage('Valid user ID is required'),
    (0, express_validator_1.body)('contentType')
        .isIn(['article', 'activity', 'meditation', 'breathing', 'learning'])
        .withMessage('Content type must be one of: article, activity, meditation, breathing, learning'),
    (0, express_validator_1.body)('preferences')
        .optional()
        .isObject()
        .withMessage('Preferences must be an object'),
    (0, express_validator_1.body)('history')
        .optional()
        .isArray()
        .withMessage('History must be an array')
];
const moderateContentValidation = [
    (0, express_validator_1.body)('content')
        .trim()
        .isLength({ min: 1, max: 5000 })
        .withMessage('Content must be between 1 and 5000 characters'),
    (0, express_validator_1.body)('type')
        .isIn(['post', 'reply', 'comment', 'message'])
        .withMessage('Type must be post, reply, comment, or message')
];
const generateInsightsValidation = [
    (0, express_validator_1.body)('data')
        .isObject()
        .withMessage('Data must be an object'),
    (0, express_validator_1.body)('type')
        .isIn(['mood', 'activity', 'general'])
        .withMessage('Type must be mood, activity, or general')
];
const chatValidation = [
    (0, express_validator_1.body)('message')
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Message must be between 1 and 1000 characters'),
    (0, express_validator_1.body)('context')
        .optional()
        .isObject()
        .withMessage('Context must be an object')
];
const analyzeMoodValidation = [
    (0, express_validator_1.body)('moodEntries')
        .isArray({ min: 1 })
        .withMessage('At least one mood entry is required'),
    (0, express_validator_1.body)('timeframe')
        .optional()
        .isIn(['week', 'month', 'quarter', 'year'])
        .withMessage('Timeframe must be week, month, quarter, or year')
];
const suggestActivitiesValidation = [
    (0, express_validator_1.body)('currentMood')
        .isInt({ min: 1, max: 5 })
        .withMessage('Current mood must be between 1 and 5'),
    (0, express_validator_1.body)('preferences')
        .optional()
        .isObject()
        .withMessage('Preferences must be an object'),
    (0, express_validator_1.body)('availableTime')
        .optional()
        .isInt({ min: 1, max: 120 })
        .withMessage('Available time must be between 1 and 120 minutes')
];
router.post('/recommendations', auth_1.authenticate, generateRecommendationsValidation, validateRequest_1.validateRequest, aiController_1.generateContentRecommendations);
router.post('/moderate', auth_1.authenticate, moderateContentValidation, validateRequest_1.validateRequest, aiController_1.moderateContent);
router.post('/insights', auth_1.authenticate, generateInsightsValidation, validateRequest_1.validateRequest, aiController_1.generateInsights);
router.post('/chat', auth_1.authenticate, chatValidation, validateRequest_1.validateRequest, aiController_1.chatWithAI);
router.post('/analyze-mood', auth_1.authenticate, analyzeMoodValidation, validateRequest_1.validateRequest, aiController_1.analyzeMoodPatterns);
router.post('/suggest-activities', auth_1.authenticate, suggestActivitiesValidation, validateRequest_1.validateRequest, aiController_1.suggestActivities);
exports.default = router;
//# sourceMappingURL=ai.js.map