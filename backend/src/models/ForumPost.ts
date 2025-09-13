import mongoose, { Document, Schema } from 'mongoose';

export interface IForumPost extends Document {
  _id: string;
  title: string;
  content: string;
  author: {
    userId: string;
    username: string;
    isAnonymous: boolean;
  };
  category: string;
  tags: string[];
  isAnonymous: boolean;
  likes: number;
  dislikes: number;
  views: number;
  replies: Array<{
    _id: string;
    content: string;
    author: {
      userId: string;
      username: string;
      isAnonymous: boolean;
    };
    likes: number;
    dislikes: number;
    isSolution: boolean;
    createdAt: Date;
    updatedAt: Date;
  }>;
  isLocked: boolean;
  isPinned: boolean;
  isReported: boolean;
  reportReason?: string;
  moderatedBy?: string;
  moderatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const forumPostSchema = new Schema<IForumPost>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    maxlength: [5000, 'Content cannot exceed 5000 characters']
  },
  author: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    isAnonymous: {
      type: Boolean,
      default: false
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['general', 'anxiety', 'depression', 'recovery', 'crisis', 'tips', 'success']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isAnonymous: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  dislikes: {
    type: Number,
    default: 0,
    min: 0
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  replies: [{
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [2000, 'Reply cannot exceed 2000 characters']
    },
    author: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      username: {
        type: String,
        required: true,
        trim: true
      },
      isAnonymous: {
        type: Boolean,
        default: false
      }
    },
    likes: {
      type: Number,
      default: 0,
      min: 0
    },
    dislikes: {
      type: Number,
      default: 0,
      min: 0
    },
    isSolution: {
      type: Boolean,
      default: false
    }
  }],
  isLocked: {
    type: Boolean,
    default: false
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isReported: {
    type: Boolean,
    default: false
  },
  reportReason: {
    type: String,
    trim: true
  },
  moderatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  moderatedAt: Date
}, {
  timestamps: true
});

// Indexes for efficient queries
forumPostSchema.index({ category: 1, createdAt: -1 });
forumPostSchema.index({ 'author.userId': 1 });
forumPostSchema.index({ tags: 1 });
forumPostSchema.index({ isPinned: -1, createdAt: -1 });
forumPostSchema.index({ likes: -1 });
forumPostSchema.index({ views: -1 });
forumPostSchema.index({ isReported: 1 });

// Text search index
forumPostSchema.index({
  title: 'text',
  content: 'text',
  tags: 'text'
});

export default mongoose.model<IForumPost>('ForumPost', forumPostSchema);


