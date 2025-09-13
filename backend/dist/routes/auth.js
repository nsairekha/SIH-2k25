"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const validateRequest_1 = require("../middleware/validateRequest");
const router = express_1.default.Router();
const registerValidation = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    (0, express_validator_1.body)('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    (0, express_validator_1.body)('age')
        .optional()
        .isInt({ min: 13, max: 120 })
        .withMessage('Age must be between 13 and 120')
];
const loginValidation = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required')
];
const forgotPasswordValidation = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email')
];
const resetPasswordValidation = [
    (0, express_validator_1.body)('token')
        .notEmpty()
        .withMessage('Reset token is required'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];
router.post('/register', registerValidation, validateRequest_1.validateRequest, authController_1.register);
router.post('/login', loginValidation, validateRequest_1.validateRequest, authController_1.login);
router.post('/logout', auth_1.authenticate, authController_1.logout);
router.post('/refresh-token', authController_1.refreshToken);
router.post('/forgot-password', forgotPasswordValidation, validateRequest_1.validateRequest, authController_1.forgotPassword);
router.post('/reset-password', resetPasswordValidation, validateRequest_1.validateRequest, authController_1.resetPassword);
router.get('/verify-email/:token', authController_1.verifyEmail);
router.post('/resend-verification', auth_1.authenticate, authController_1.resendVerification);
router.get('/profile', auth_1.authenticate, authController_1.getProfile);
exports.default = router;
//# sourceMappingURL=auth.js.map