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
const activitySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    type: {
        type: String,
        required: true,
        enum: ['meditation', 'breathing', 'journaling', 'exercise', 'learning', 'movement']
    },
    duration: {
        type: Number,
        required: true,
        min: [1, 'Duration must be at least 1 minute'],
        max: [300, 'Duration cannot exceed 300 minutes']
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced']
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        instructions: [{
                type: String,
                required: true,
                trim: true
            }],
        audioUrl: {
            type: String,
            trim: true
        },
        videoUrl: {
            type: String,
            trim: true
        },
        interactiveElements: [{
                type: {
                    type: String,
                    enum: ['button', 'slider', 'input', 'timer']
                },
                id: {
                    type: String,
                    required: true
                },
                label: {
                    type: String,
                    required: true
                },
                value: mongoose_1.Schema.Types.Mixed
            }]
    },
    points: {
        type: Number,
        required: true,
        min: [0, 'Points cannot be negative'],
        max: [1000, 'Points cannot exceed 1000']
    },
    tags: [{
            type: String,
            trim: true
        }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
activitySchema.index({ type: 1, difficulty: 1 });
activitySchema.index({ category: 1 });
activitySchema.index({ tags: 1 });
activitySchema.index({ isActive: 1 });
exports.default = mongoose_1.default.model('Activity', activitySchema);
//# sourceMappingURL=Activity.js.map