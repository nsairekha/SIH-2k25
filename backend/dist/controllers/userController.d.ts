import { Request, Response } from 'express';
export declare const updateProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updatePreferences: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const uploadAvatar: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteAccount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getStats: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=userController.d.ts.map