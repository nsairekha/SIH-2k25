import { IUser } from '../models/User';
export interface TokenPayload {
    id: string;
    email: string;
}
export declare const generateAccessToken: (user: IUser) => string;
export declare const generateRefreshToken: (user: IUser) => string;
export declare const generateEmailVerificationToken: (user: IUser) => string;
export declare const generatePasswordResetToken: (user: IUser) => string;
export declare const verifyToken: (token: string, secret?: string) => TokenPayload;
export declare const decodeToken: (token: string) => any;
//# sourceMappingURL=jwt.d.ts.map