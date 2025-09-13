import mongoose, { Document } from 'mongoose';
export interface ILearningContent extends Document {
    _id: string;
    title: string;
    type: 'article' | 'video' | 'infographic' | 'quiz' | 'animation';
    content: string;
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number;
    tags: string[];
    isInteractive: boolean;
    readCount: number;
    averageRating: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<ILearningContent, {}, {}, {}, mongoose.Document<unknown, {}, ILearningContent, {}, {}> & ILearningContent & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=LearningContent.d.ts.map