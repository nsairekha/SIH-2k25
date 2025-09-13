import mongoose, { Document } from 'mongoose';
export interface IMoodEntry extends Document {
    _id: string;
    userId: string;
    mood: {
        value: number;
        emoji: string;
        label: string;
    };
    intensity: number;
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
declare const _default: mongoose.Model<IMoodEntry, {}, {}, {}, mongoose.Document<unknown, {}, IMoodEntry, {}, {}> & IMoodEntry & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=MoodEntry.d.ts.map