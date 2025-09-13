import { Request, Response } from 'express';
export declare const createSurvey: (req: Request, res: Response) => Promise<void>;
export declare const getSurveys: (req: Request, res: Response) => Promise<void>;
export declare const getSurveyById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const submitSurveyResponses: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSurveyTemplates: (req: Request, res: Response) => Promise<void>;
export declare const getSurveyAnalytics: (req: Request, res: Response) => Promise<void>;
export declare const deleteSurvey: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=surveyController.d.ts.map