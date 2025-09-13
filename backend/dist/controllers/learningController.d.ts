import { Request, Response } from 'express';
export declare const getContent: (req: Request, res: Response) => Promise<void>;
export declare const getContentById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createContent: (req: Request, res: Response) => Promise<void>;
export declare const updateContent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteContent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const markAsRead: (req: Request, res: Response) => Promise<void>;
export declare const getReadingHistory: (req: Request, res: Response) => Promise<void>;
export declare const getRecommendations: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=learningController.d.ts.map