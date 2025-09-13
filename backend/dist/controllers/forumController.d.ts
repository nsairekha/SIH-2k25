import { Request, Response } from 'express';
export declare const getPosts: (req: Request, res: Response) => Promise<void>;
export declare const getPostById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createPost: (req: Request, res: Response) => Promise<void>;
export declare const updatePost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deletePost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const likePost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const replyToPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const searchPosts: (req: Request, res: Response) => Promise<void>;
export declare const getCategories: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=forumController.d.ts.map