import mongoose, { Document, Schema } from 'mongoose';

export interface ISurvey extends Document {
  _id: string;
  userId: string;
  type: 'daily' | 'weekly' | 'monthly' | 'initial' | 'custom';
  title: string;
  description?: string;
  questions: Array<{
    id: string;
    type: 'mood' | 'scale' | 'multiple_choice' | 'text' | 'boolean' | 'rating';
    question: string;
    options?: string[];
    min?: number;
    max?: number;
    required: boolean;
    category: string;
  }>;
  responses: Array<{
    questionId: string;
    answer: any;
    timestamp: Date;
  }>;
  completedAt?: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const surveySchema = new Schema<ISurvey>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
      type: Schema.Types.Mixed,
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

// Indexes for efficient queries
surveySchema.index({ userId: 1, type: 1, createdAt: -1 });
surveySchema.index({ userId: 1, isCompleted: 1 });
surveySchema.index({ type: 1, createdAt: -1 });

export default mongoose.model<ISurvey>('Survey', surveySchema);

