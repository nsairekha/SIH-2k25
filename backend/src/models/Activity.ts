import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  _id: string;
  title: string;
  description: string;
  type: 'meditation' | 'breathing' | 'journaling' | 'exercise' | 'learning' | 'movement';
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  content: {
    instructions: string[];
    audioUrl?: string;
    videoUrl?: string;
    interactiveElements?: Array<{
      type: 'button' | 'slider' | 'input' | 'timer';
      id: string;
      label: string;
      value?: any;
    }>;
  };
  points: number;
  tags: string[];
  isActive: boolean;
  isPremium: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
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
      validate: {
        validator: function(v: string) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Audio URL must be a valid URL'
      }
    },
    videoUrl: {
      type: String,
      validate: {
        validator: function(v: string) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Video URL must be a valid URL'
      }
    },
    interactiveElements: [{
      type: {
        type: String,
        enum: ['button', 'slider', 'input', 'timer'],
        required: true
      },
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      value: Schema.Types.Mixed
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
    trim: true,
    lowercase: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
activitySchema.index({ type: 1, isActive: 1 });
activitySchema.index({ difficulty: 1, isActive: 1 });
activitySchema.index({ category: 1, isActive: 1 });
activitySchema.index({ tags: 1 });
activitySchema.index({ points: 1 });

export default mongoose.model<IActivity>('Activity', activitySchema);


