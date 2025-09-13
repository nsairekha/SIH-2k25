"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const crisisController_1 = require("../controllers/crisisController");
const auth_1 = require("../middleware/auth");
const validateRequest_1 = require("../middleware/validateRequest");
const router = express_1.default.Router();
const getResourcesValidation = [
    (0, express_validator_1.query)('country')
        .optional()
        .isLength({ min: 2, max: 2 })
        .withMessage('Country code must be 2 characters'),
    (0, express_validator_1.query)('type')
        .optional()
        .isIn(['hotline', 'text', 'chat', 'website'])
        .withMessage('Type must be hotline, text, chat, or website'),
    (0, express_validator_1.query)('available24h')
        .optional()
        .isBoolean()
        .withMessage('available24h must be a boolean')
];
const getCopingStrategiesValidation = [
    (0, express_validator_1.query)('category')
        .optional()
        .isIn(['anxiety', 'depression', 'panic', 'stress', 'anger', 'general'])
        .withMessage('Invalid category')
];
router.get('/resources', auth_1.optionalAuth, getResourcesValidation, validateRequest_1.validateRequest, crisisController_1.getCrisisResources);
router.get('/resources/:country', auth_1.optionalAuth, crisisController_1.getCrisisResourcesByCountry);
router.get('/coping-strategies', auth_1.optionalAuth, getCopingStrategiesValidation, validateRequest_1.validateRequest, crisisController_1.getCopingStrategies);
router.get('/safety-plan', auth_1.authenticate, crisisController_1.getSafetyPlan);
router.post('/safety-plan', auth_1.authenticate, crisisController_1.createSafetyPlan);
router.put('/safety-plan', auth_1.authenticate, crisisController_1.updateSafetyPlan);
router.post('/report', auth_1.authenticate, crisisController_1.reportCrisis);
exports.default = router;
//# sourceMappingURL=crisis.js.map