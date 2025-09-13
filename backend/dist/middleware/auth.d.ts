import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const optionalAuth: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const requireEmailVerification: (req: Request, res: Response, next: NextFunction) => void;
export declare const requirePremium: (req: Request, res: Response, next: NextFunction) => void;
export declare const adminOnly: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map