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
const moodEntrySchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    mood: {
        value: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        emoji: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        }
    },
    intensity: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    emotions: [{
            name: {
                type: String,
                required: true
            },
            intensity: {
                type: Number,
                required: true,
                min: 1,
                max: 10
            },
            category: {
                type: String,
                required: true
            }
        }],
    triggers: [{
            type: String,
            trim: true
        }],
    notes: {
        type: String,
        maxlength: [1000, 'Notes cannot exceed 1000 characters']
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    location: {
        type: String,
        trim: true
    },
    weather: {
        type: String,
        trim: true
    },
    sleepHours: {
        type: Number,
        min: 0,
        max: 24
    },
    stressLevel: {
        type: Number,
        min: 1,
        max: 10
    },
    energyLevel: {
        type: Number,
        min: 1,
        max: 10
    },
    socialActivity: {
        type: Boolean,
        default: false
    },
    exercise: {
        type: Boolean,
        default: false
    },
    medication: {
        type: Boolean,
        default: false
    },
    tags: [{
            type: String,
            trim: true
        }],
    isPrivate: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
moodEntrySchema.index({ userId: 1, timestamp: -1 });
moodEntrySchema.index({ userId: 1, 'mood.value': 1 });
moodEntrySchema.index({ timestamp: -1 });
moodEntrySchema.index({ tags: 1 });
moodEntrySchema.virtual('date').get(function () {
    return this.timestamp.toISOString().split('T')[0];
});
exports.default = mongoose_1.default.model('MoodEntry', moodEntrySchema);
//# sourceMappingURL=MoodEntry.js.map