import { Request, Response } from 'express';
export declare const getActivities: (req: Request, res: Response) => Promise<void>;
export declare const getActivityById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createActivity: (req: Request, res: Response) => Promise<void>;
export declare const updateActivity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteActivity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const completeActivity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getActivityStats: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=activityController.d.ts.map