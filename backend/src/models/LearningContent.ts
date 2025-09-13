import mongoose, { Document, Schema } from 'mongoose';

export interface ILearningContent extends Document {
  _id: string;
  title: string;
  type: 'article' | 'video' | 'infographic' | 'quiz' | 'animation';
  content: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  tags: string[];
  isInteractive: boolean;
  readCount: number;
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
}

const learningContentSchema = new Schema<ILearningContent>({
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

// Indexes for efficient queries
learningContentSchema.index({ type: 1, difficulty: 1 });
learningContentSchema.index({ category: 1 });
learningContentSchema.index({ tags: 1 });
learningContentSchema.index({ readCount: -1 });
learningContentSchema.index({ averageRating: -1 });

export default mongoose.model<ILearningContent>('LearningContent', learningContentSchema);
