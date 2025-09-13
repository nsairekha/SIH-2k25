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
const forumReplySchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: [2000, 'Reply content cannot exceed 2000 characters']
    },
    author: {
        type: String,
        required: true
    },
    isAnonymous: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const forumPostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: [5000, 'Content cannot exceed 5000 characters']
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['general', 'anxiety', 'depression', 'recovery', 'crisis', 'tips', 'success']
    },
    tags: [{
            type: String,
            trim: true
        }],
    isAnonymous: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Number,
        default: 0
    },
    replies: [forumReplySchema]
}, {
    timestamps: true
});
forumPostSchema.index({ category: 1, createdAt: -1 });
forumPostSchema.index({ author: 1 });
forumPostSchema.index({ tags: 1 });
forumPostSchema.index({ title: 'text', content: 'text' });
exports.default = mongoose_1.default.model('ForumPost', forumPostSchema);
//# sourceMappingURL=ForumPost.js.map