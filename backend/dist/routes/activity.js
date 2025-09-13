"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const activityController_1 = require("../controllers/activityController");
const auth_1 = require("../middleware/auth");
const validateRequest_1 = require("../middleware/validateRequest");
const router = express_1.default.Router();
const createActivityValidation = [
    (0, express_validator_1.body)('title')
        .trim()
        .isLength({ min: 5, max: 100 })
        .withMessage('Title must be between 5 and 100 characters'),
    (0, express_validator_1.body)('description')
        .trim()
        .isLength({ min: 10, max: 500 })
        .withMessage('Description must be between 10 and 500 characters'),
    (0, express_validator_1.body)('type')
        .isIn(['meditation', 'breathing', 'journaling', 'exercise', 'learning', 'movement'])
        .withMessage('Type must be one of: meditation, breathing, journaling, exercise, learning, movement'),
    (0, express_validator_1.body)('duration')
        .isInt({ min: 1, max: 300 })
        .withMessage('Duration must be between 1 and 300 minutes'),
    (0, express_validator_1.body)('difficulty')
        .isIn(['beginner', 'intermediate', 'advanced'])
        .withMessage('Difficulty must be beginner, intermediate, or advanced'),
    (0, express_validator_1.body)('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required'),
    (0, express_validator_1.body)('content.instructions')
        .isArray({ min: 1 })
        .withMessage('At least one instruction is required'),
    (0, express_validator_1.body)('content.instructions.*')
        .trim()
        .notEmpty()
        .withMessage('Instructions cannot be empty'),
    (0, express_validator_1.body)('points')
        .isInt({ min: 0, max: 1000 })
        .withMessage('Points must be between 0 and 1000'),
    (0, express_validator_1.body)('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array')
];
const updateActivityValidation = [
    (0, express_validator_1.body)('title')
        .optional()
        .trim()
        .isLength({ min: 5, max: 100 })
        .withMessage('Title must be between 5 and 100 characters'),
    (0, express_validator_1.body)('description')
        .optional()
        .trim()
        .isLength({ min: 10, max: 500 })
        .withMessage('Description must be between 10 and 500 characters'),
    (0, express_validator_1.body)('duration')
        .optional()
        .isInt({ min: 1, max: 300 })
        .withMessage('Duration must be between 1 and 300 minutes'),
    (0, express_validator_1.body)('difficulty')
        .optional()
        .isIn(['beginner', 'intermediate', 'advanced'])
        .withMessage('Difficulty must be beginner, intermediate, or advanced'),
    (0, express_validator_1.body)('points')
        .optional()
        .isInt({ min: 0, max: 1000 })
        .withMessage('Points must be between 0 and 1000')
];
const getActivitiesValidation = [
    (0, express_validator_1.query)('type')
        .optional()
        .isIn(['meditation', 'breathing', 'journaling', 'exercise', 'learning', 'movement'])
        .withMessage('Type must be one of: meditation, breathing, journaling, exercise, learning, movement'),
    (0, express_validator_1.query)('difficulty')
        .optional()
        .isIn(['beginner', 'intermediate', 'advanced'])
        .withMessage('Difficulty must be beginner, intermediate, or advanced'),
    (0, express_validator_1.query)('category')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Category cannot be empty'),
    (0, express_validator_1.query)('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    (0, express_validator_1.query)('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100')
];
const completeActivityValidation = [
    (0, express_validator_1.body)('duration')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Duration must be a positive integer'),
    (0, express_validator_1.body)('notes')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Notes cannot exceed 1000 characters'),
    (0, express_validator_1.body)('rating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5')
];
router.get('/', auth_1.authenticate, getActivitiesValidation, validateRequest_1.validateRequest, activityController_1.getActivities);
router.get('/stats', auth_1.authenticate, activityController_1.getActivityStats);
router.get('/:id', auth_1.authenticate, activityController_1.getActivityById);
router.post('/', auth_1.authenticate, auth_1.adminOnly, createActivityValidation, validateRequest_1.validateRequest, activityController_1.createActivity);
router.put('/:id', auth_1.authenticate, auth_1.adminOnly, updateActivityValidation, validateRequest_1.validateRequest, activityController_1.updateActivity);
router.delete('/:id', auth_1.authenticate, auth_1.adminOnly, activityController_1.deleteActivity);
router.post('/:id/complete', auth_1.authenticate, completeActivityValidation, validateRequest_1.validateRequest, activityController_1.completeActivity);
exports.default = router;
//# sourceMappingURL=activity.js.map