"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const validateRequest_1 = require("../middleware/validateRequest");
const upload_1 = require("../middleware/upload");
const router = express_1.default.Router();
const updateProfileValidation = [
    (0, express_validator_1.body)('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    (0, express_validator_1.body)('age')
        .optional()
        .isInt({ min: 13, max: 120 })
        .withMessage('Age must be between 13 and 120')
];
const updatePreferencesValidation = [
    (0, express_validator_1.body)('theme')
        .optional()
        .isIn(['light', 'dark', 'system'])
        .withMessage('Theme must be light, dark, or system'),
    (0, express_validator_1.body)('language')
        .optional()
        .isIn(['en', 'es', 'fr'])
        .withMessage('Language must be en, es, or fr'),
    (0, express_validator_1.body)('notifications')
        .optional()
        .isBoolean()
        .withMessage('Notifications must be a boolean'),
    (0, express_validator_1.body)('ageGroup')
        .optional()
        .isIn(['child', 'teen', 'adult', 'senior'])
        .withMessage('Age group must be child, teen, adult, or senior'),
    (0, express_validator_1.body)('accessibility.highContrast')
        .optional()
        .isBoolean()
        .withMessage('High contrast must be a boolean'),
    (0, express_validator_1.body)('accessibility.largeText')
        .optional()
        .isBoolean()
        .withMessage('Large text must be a boolean'),
    (0, express_validator_1.body)('accessibility.reducedMotion')
        .optional()
        .isBoolean()
        .withMessage('Reduced motion must be a boolean'),
    (0, express_validator_1.body)('accessibility.screenReader')
        .optional()
        .isBoolean()
        .withMessage('Screen reader must be a boolean')
];
router.put('/profile', auth_1.authenticate, updateProfileValidation, validateRequest_1.validateRequest, userController_1.updateProfile);
router.put('/preferences', auth_1.authenticate, updatePreferencesValidation, validateRequest_1.validateRequest, userController_1.updatePreferences);
router.post('/avatar', auth_1.authenticate, upload_1.upload.single('avatar'), userController_1.uploadAvatar);
router.delete('/account', auth_1.authenticate, userController_1.deleteAccount);
router.get('/stats', auth_1.authenticate, userController_1.getStats);
exports.default = router;
//# sourceMappingURL=user.js.map