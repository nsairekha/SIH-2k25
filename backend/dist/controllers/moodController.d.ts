import { Request, Response } from 'express';
export declare const createMoodEntry: (req: Request, res: Response) => Promise<void>;
export declare const getMoodEntries: (req: Request, res: Response) => Promise<void>;
export declare const getMoodEntryById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateMoodEntry: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteMoodEntry: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMoodAnalytics: (req: Request, res: Response) => Promise<void>;
export declare const getMoodTrends: (req: Request, res: Response) => Promise<void>;
export declare const getMoodInsights: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=moodController.d.ts.map