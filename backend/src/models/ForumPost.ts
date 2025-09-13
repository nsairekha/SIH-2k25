import mongoose, { Document, Schema } from 'mongoose';

export interface IForumReply {
  content: string;
  author: string;
  isAnonymous: boolean;
  likes: number;
  createdAt: Date;
}

export interface IForumPost extends Document {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  isAnonymous: boolean;
  likes: number;
  replies: IForumReply[];
  createdAt: Date;
  updatedAt: Date;
}

const forumReplySchema = new Schema<IForumReply>({
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

const forumPostSchema = new Schema<IForumPost>({
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

// Indexes for efficient queries
forumPostSchema.index({ category: 1, createdAt: -1 });
forumPostSchema.index({ author: 1 });
forumPostSchema.index({ tags: 1 });
forumPostSchema.index({ title: 'text', content: 'text' });

export default mongoose.model<IForumPost>('ForumPost', forumPostSchema);