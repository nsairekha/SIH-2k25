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
const learningContentSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    type: {
        type: String,
        required: true,
        enum: ['article', 'video', 'infographic', 'quiz', 'animation']
    },
    content: {
        type: String,
        required: true,
        minlength: [50, 'Content must be at least 50 characters']
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced']
    },
    estimatedTime: {
        type: Number,
        required: true,
        min: [1, 'Estimated time must be at least 1 minute'],
        max: [120, 'Estimated time cannot exceed 120 minutes']
    },
    tags: [{
            type: String,
            trim: true
        }],
    isInteractive: {
        type: Boolean,
        default: false
    },
    readCount: {
        type: Number,
        default: 0
    },
    averageRating: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be negative'],
        max: [5, 'Rating cannot exceed 5']
    }
}, {
    timestamps: true
});
learningContentSchema.index({ type: 1, difficulty: 1 });
learningContentSchema.index({ category: 1 });
learningContentSchema.index({ tags: 1 });
learningContentSchema.index({ readCount: -1 });
learningContentSchema.index({ averageRating: -1 });
exports.default = mongoose_1.default.model('LearningContent', learningContentSchema);
//# sourceMappingURL=LearningContent.js.map