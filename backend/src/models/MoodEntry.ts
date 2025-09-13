import mongoose, { Document, Schema } from 'mongoose';

export interface IMoodEntry extends Document {
  _id: string;
  userId: string;
  mood: {
    value: number; // 1-5 scale
    emoji: string;
    label: string;
  };
  intensity: number; // 1-10 scale
  emotions: Array<{
    name: string;
    intensity: number;
    category: string;
  }>;
  triggers?: string[];
  notes?: string;
  timestamp: Date;
  location?: string;
  weather?: string;
  sleepHours?: number;
  stressLevel?: number;
  energyLevel?: number;
  socialActivity?: boolean;
  exercise?: boolean;
  medication?: boolean;
  tags?: string[];
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const moodEntrySchema = new Schema<IMoodEntry>({
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

// Compound indexes for efficient queries
moodEntrySchema.index({ userId: 1, timestamp: -1 });
moodEntrySchema.index({ userId: 1, 'mood.value': 1 });
moodEntrySchema.index({ timestamp: -1 });
moodEntrySchema.index({ tags: 1 });

// Virtual for date only (without time)
moodEntrySchema.virtual('date').get(function(this: IMoodEntry) {
  return this.timestamp.toISOString().split('T')[0];
});

export default mongoose.model<IMoodEntry>('MoodEntry', moodEntrySchema);


