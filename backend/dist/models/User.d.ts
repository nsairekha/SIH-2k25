import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    _id: string;
    email: string;
    password: string;
    name: string;
    avatar?: string;
    age?: number;
    preferences: {
        theme: 'light' | 'dark' | 'system';
        language: string;
        notifications: boolean;
        ageGroup: 'child' | 'teen' | 'adult' | 'senior';
        accessibility: {
            highContrast: boolean;
            largeText: boolean;
            reducedMotion: boolean;
            screenReader: boolean;
        };
    };
    isEmailVerified: boolean;
    emailVerificationToken?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    lastActive: Date;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=User.d.ts.map