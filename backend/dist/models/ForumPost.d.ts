import mongoose, { Document } from 'mongoose';
export interface IForumReply {
    content: string;
    author: string;
    isAnonymous: boolean;
    likes: number;
    createdAt: Date;
}
export interface IForumPost extends Document {
    _id: string;
    title: string;
    content: string;
    author: string;
    category: string;
    tags: string[];
    isAnonymous: boolean;
    likes: number;
    replies: IForumReply[];
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IForumPost, {}, {}, {}, mongoose.Document<unknown, {}, IForumPost, {}, {}> & IForumPost & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=ForumPost.d.ts.map