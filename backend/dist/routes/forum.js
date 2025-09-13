"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const forumController_1 = require("../controllers/forumController");
const auth_1 = require("../middleware/auth");
const validateRequest_1 = require("../middleware/validateRequest");
const router = express_1.default.Router();
const createPostValidation = [
    (0, express_validator_1.body)('title')
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage('Title must be between 5 and 200 characters'),
    (0, express_validator_1.body)('content')
        .trim()
        .isLength({ min: 10, max: 5000 })
        .withMessage('Content must be between 10 and 5000 characters'),
    (0, express_validator_1.body)('category')
        .isIn(['general', 'anxiety', 'depression', 'recovery', 'crisis', 'tips', 'success'])
        .withMessage('Category must be one of: general, anxiety, depression, recovery, crisis, tips, success'),
    (0, express_validator_1.body)('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array'),
    (0, express_validator_1.body)('isAnonymous')
        .optional()
        .isBoolean()
        .withMessage('isAnonymous must be a boolean')
];
const updatePostValidation = [
    (0, express_validator_1.body)('title')
        .optional()
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage('Title must be between 5 and 200 characters'),
    (0, express_validator_1.body)('content')
        .optional()
        .trim()
        .isLength({ min: 10, max: 5000 })
        .withMessage('Content must be between 10 and 5000 characters'),
    (0, express_validator_1.body)('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array')
];
const replyValidation = [
    (0, express_validator_1.body)('content')
        .trim()
        .isLength({ min: 1, max: 2000 })
        .withMessage('Reply content must be between 1 and 2000 characters'),
    (0, express_validator_1.body)('isAnonymous')
        .optional()
        .isBoolean()
        .withMessage('isAnonymous must be a boolean')
];
const getPostsValidation = [
    (0, express_validator_1.query)('category')
        .optional()
        .isIn(['general', 'anxiety', 'depression', 'recovery', 'crisis', 'tips', 'success'])
        .withMessage('Invalid category'),
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
        .isIn(['newest', 'oldest', 'most_liked', 'most_replied'])
        .withMessage('Sort must be newest, oldest, most_liked, or most_replied')
];
const searchValidation = [
    (0, express_validator_1.query)('q')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Search query is required'),
    (0, express_validator_1.query)('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    (0, express_validator_1.query)('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100')
];
router.get('/categories', forumController_1.getCategories);
router.get('/search', auth_1.optionalAuth, searchValidation, validateRequest_1.validateRequest, forumController_1.searchPosts);
router.get('/', auth_1.optionalAuth, getPostsValidation, validateRequest_1.validateRequest, forumController_1.getPosts);
router.get('/:id', auth_1.optionalAuth, forumController_1.getPostById);
router.post('/', auth_1.authenticate, createPostValidation, validateRequest_1.validateRequest, forumController_1.createPost);
router.put('/:id', auth_1.authenticate, updatePostValidation, validateRequest_1.validateRequest, forumController_1.updatePost);
router.delete('/:id', auth_1.authenticate, forumController_1.deletePost);
router.post('/:id/like', auth_1.authenticate, forumController_1.likePost);
router.post('/:id/reply', auth_1.authenticate, replyValidation, validateRequest_1.validateRequest, forumController_1.replyToPost);
exports.default = router;
//# sourceMappingURL=forum.js.map