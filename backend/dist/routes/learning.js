"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const learningController_1 = require("../controllers/learningController");
const auth_1 = require("../middleware/auth");
const validateRequest_1 = require("../middleware/validateRequest");
const router = express_1.default.Router();
const createContentValidation = [
    (0, express_validator_1.body)('title')
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage('Title must be between 5 and 200 characters'),
    (0, express_validator_1.body)('content')
        .trim()
        .isLength({ min: 50 })
        .withMessage('Content must be at least 50 characters'),
    (0, express_validator_1.body)('type')
        .isIn(['article', 'video', 'infographic', 'quiz', 'animation'])
        .withMessage('Type must be one of: article, video, infographic, quiz, animation'),
    (0, express_validator_1.body)('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required'),
    (0, express_validator_1.body)('difficulty')
        .isIn(['beginner', 'intermediate', 'advanced'])
        .withMessage('Difficulty must be beginner, intermediate, or advanced'),
    (0, express_validator_1.body)('estimatedTime')
        .isInt({ min: 1, max: 120 })
        .withMessage('Estimated time must be between 1 and 120 minutes'),
    (0, express_validator_1.body)('tags')
        .isArray({ min: 1 })
        .withMessage('At least one tag is required'),
    (0, express_validator_1.body)('isInteractive')
        .optional()
        .isBoolean()
        .withMessage('isInteractive must be a boolean')
];
const updateContentValidation = [
    (0, express_validator_1.body)('title')
        .optional()
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage('Title must be between 5 and 200 characters'),
    (0, express_validator_1.body)('content')
        .optional()
        .trim()
        .isLength({ min: 50 })
        .withMessage('Content must be at least 50 characters'),
    (0, express_validator_1.body)('estimatedTime')
        .optional()
        .isInt({ min: 1, max: 120 })
        .withMessage('Estimated time must be between 1 and 120 minutes'),
    (0, express_validator_1.body)('tags')
        .optional()
        .isArray({ min: 1 })
        .withMessage('At least one tag is required')
];
const getContentValidation = [
    (0, express_validator_1.query)('type')
        .optional()
        .isIn(['article', 'video', 'infographic', 'quiz', 'animation'])
        .withMessage('Invalid type'),
    (0, express_validator_1.query)('category')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Category cannot be empty'),
    (0, express_validator_1.query)('difficulty')
        .optional()
        .isIn(['beginner', 'intermediate', 'advanced'])
        .withMessage('Invalid difficulty'),
    (0, express_validator_1.query)('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    (0, express_validator_1.query)('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
    (0, express_validator_1.query)('sort')
        .optional()
        .isIn(['newest', 'oldest', 'most_read', 'highest_rated'])
        .withMessage('Sort must be newest, oldest, most_read, or highest_rated')
];
const markAsReadValidation = [
    (0, express_validator_1.body)('timeSpent')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Time spent must be a positive integer'),
    (0, express_validator_1.body)('rating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),
    (0, express_validator_1.body)('notes')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Notes cannot exceed 1000 characters')
];
router.get('/', auth_1.authenticate, getContentValidation, validateRequest_1.validateRequest, learningController_1.getContent);
router.get('/recommendations', auth_1.authenticate, learningController_1.getRecommendations);
router.get('/history', auth_1.authenticate, learningController_1.getReadingHistory);
router.get('/:id', auth_1.authenticate, learningController_1.getContentById);
router.post('/', auth_1.authenticate, auth_1.adminOnly, createContentValidation, validateRequest_1.validateRequest, learningController_1.createContent);
router.put('/:id', auth_1.authenticate, auth_1.adminOnly, updateContentValidation, validateRequest_1.validateRequest, learningController_1.updateContent);
router.delete('/:id', auth_1.authenticate, auth_1.adminOnly, learningController_1.deleteContent);
router.post('/:id/read', auth_1.authenticate, markAsReadValidation, validateRequest_1.validateRequest, learningController_1.markAsRead);
exports.default = router;
//# sourceMappingURL=learning.js.map