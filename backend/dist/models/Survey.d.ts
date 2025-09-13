import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<ISurvey, {}, {}, {}, mongoose.Document<unknown, {}, ISurvey, {}, {}> & ISurvey & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Survey.d.ts.map