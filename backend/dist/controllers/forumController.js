"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.searchPosts = exports.replyToPost = exports.likePost = exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getPosts = void 0;
const ForumPost_1 = __importDefault(require("../models/ForumPost"));
const getPosts = async (req, res) => {
    try {
        const { category, page = 1, limit = 20, sort = 'newest' } = req.query;
        const query = {};
        if (category)
            query.category = category;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        let sortOptions = { createdAt: -1 };
        switch (sort) {
            case 'oldest':
                sortOptions = { createdAt: 1 };
                break;
            case 'most_liked':
                sortOptions = { likes: -1 };
                break;
            case 'most_replied':
                sortOptions = { 'replies.length': -1 };
                break;
        }
        const posts = await ForumPost_1.default.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit))
            .lean();
        const total = await ForumPost_1.default.countDocuments(query);
        res.json({
            success: true,
            data: {
                posts,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / parseInt(limit)),
                    totalPosts: total,
                    hasNext: skip + posts.length < total,
                    hasPrev: parseInt(page) > 1
                }
            }
        });
    }
    catch (error) {
        console.error('Get posts error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching posts'
        });
    }
};
exports.getPosts = getPosts;
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await ForumPost_1.default.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        res.json({
            success: true,
            data: { post }
        });
    }
    catch (error) {
        console.error('Get post error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching post'
        });
    }
};
exports.getPostById = getPostById;
const createPost = async (req, res) => {
    try {
        const userId = req.user._id;
        const postData = {
            ...req.body,
            author: userId,
            likes: 0,
            replies: []
        };
        const post = new ForumPost_1.default(postData);
        await post.save();
        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: { post }
        });
    }
    catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating post'
        });
    }
};
exports.createPost = createPost;
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const post = await ForumPost_1.default.findOneAndUpdate({ _id: id, author: userId }, { $set: req.body }, { new: true, runValidators: true });
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found or you do not have permission to update it'
            });
        }
        res.json({
            success: true,
            message: 'Post updated successfully',
            data: { post }
        });
    }
    catch (error) {
        console.error('Update post error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating post'
        });
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const post = await ForumPost_1.default.findOneAndDelete({ _id: id, author: userId });
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found or you do not have permission to delete it'
            });
        }
        res.json({
            success: true,
            message: 'Post deleted successfully'
        });
    }
    catch (error) {
        console.error('Delete post error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting post'
        });
    }
};
exports.deletePost = deletePost;
const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await ForumPost_1.default.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        res.json({
            success: true,
            message: 'Post liked successfully',
            data: { likes: post.likes }
        });
    }
    catch (error) {
        console.error('Like post error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while liking post'
        });
    }
};
exports.likePost = likePost;
const replyToPost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const { content, isAnonymous } = req.body;
        const reply = {
            content,
            author: userId,
            isAnonymous: isAnonymous || false,
            likes: 0,
            createdAt: new Date()
        };
        const post = await ForumPost_1.default.findByIdAndUpdate(id, { $push: { replies: reply } }, { new: true });
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }
        res.json({
            success: true,
            message: 'Reply added successfully',
            data: { post }
        });
    }
    catch (error) {
        console.error('Reply to post error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while adding reply'
        });
    }
};
exports.replyToPost = replyToPost;
const searchPosts = async (req, res) => {
    try {
        const { q, page = 1, limit = 20 } = req.query;
        const query = {
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { content: { $regex: q, $options: 'i' } },
                { tags: { $in: [new RegExp(q, 'i')] } }
            ]
        };
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const posts = await ForumPost_1.default.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .lean();
        const total = await ForumPost_1.default.countDocuments(query);
        res.json({
            success: true,
            data: {
                posts,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / parseInt(limit)),
                    totalPosts: total,
                    hasNext: skip + posts.length < total,
                    hasPrev: parseInt(page) > 1
                }
            }
        });
    }
    catch (error) {
        console.error('Search posts error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while searching posts'
        });
    }
};
exports.searchPosts = searchPosts;
const getCategories = async (req, res) => {
    try {
        const categories = [
            { name: 'general', label: 'General Discussion' },
            { name: 'anxiety', label: 'Anxiety Support' },
            { name: 'depression', label: 'Depression Support' },
            { name: 'recovery', label: 'Recovery Stories' },
            { name: 'crisis', label: 'Crisis Support' },
            { name: 'tips', label: 'Tips & Strategies' },
            { name: 'success', label: 'Success Stories' }
        ];
        res.json({
            success: true,
            data: { categories }
        });
    }
    catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching categories'
        });
    }
};
exports.getCategories = getCategories;
//# sourceMappingURL=forumController.js.map