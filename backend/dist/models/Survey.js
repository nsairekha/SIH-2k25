"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const surveySchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'initial', 'custom'],
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    questions: [{
            id: {
                type: String,
                required: true
            },
            type: {
                type: String,
                enum: ['mood', 'scale', 'multiple_choice', 'text', 'boolean', 'rating'],
                required: true
            },
            question: {
                type: String,
                required: true,
                trim: true
            },
            options: [{
                    type: String,
                    trim: true
                }],
            min: {
                type: Number
            },
            max: {
                type: Number
            },
            required: {
                type: Boolean,
                default: false
            },
            category: {
                type: String,
                required: true,
                trim: true
            }
        }],
    responses: [{
            questionId: {
                type: String,
                required: true
            },
            answer: {
                type: mongoose_1.Schema.Types.Mixed,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }],
    completedAt: {
        type: Date
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
surveySchema.index({ userId: 1, type: 1, createdAt: -1 });
surveySchema.index({ userId: 1, isCompleted: 1 });
surveySchema.index({ type: 1, createdAt: -1 });
exports.default = mongoose_1.default.model('Survey', surveySchema);
//# sourceMappingURL=Survey.js.map