import mongoose, { Document } from 'mongoose';
export interface IActivity extends Document {
    _id: string;
    title: string;
    description: string;
    type: 'meditation' | 'breathing' | 'journaling' | 'exercise' | 'learning' | 'movement';
    duration: number;
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
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IActivity, {}, {}, {}, mongoose.Document<unknown, {}, IActivity, {}, {}> & IActivity & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Activity.d.ts.map