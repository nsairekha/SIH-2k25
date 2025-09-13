"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const surveyController_1 = require("../controllers/surveyController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.use(auth_1.authenticate);
router.post('/', surveyController_1.createSurvey);
router.get('/', surveyController_1.getSurveys);
router.get('/templates', surveyController_1.getSurveyTemplates);
router.get('/analytics', surveyController_1.getSurveyAnalytics);
router.get('/:id', surveyController_1.getSurveyById);
router.post('/:id/responses', surveyController_1.submitSurveyResponses);
router.delete('/:id', surveyController_1.deleteSurvey);
exports.default = router;
//# sourceMappingURL=survey.js.map