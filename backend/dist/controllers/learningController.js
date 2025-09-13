"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendations = exports.getReadingHistory = exports.markAsRead = exports.deleteContent = exports.updateContent = exports.createContent = exports.getContentById = exports.getContent = void 0;
const LearningContent_1 = __importDefault(require("../models/LearningContent"));
const getContent = async (req, res) => {
    try {
        const { type, category, difficulty, page = 1, limit = 20, sort = 'newest' } = req.query;
        const query = {};
        if (type)
            query.type = type;
        if (category)
            query.category = category;
        if (difficulty)
            query.difficulty = difficulty;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        let sortOptions = { createdAt: -1 };
        switch (sort) {
            case 'oldest':
                sortOptions = { createdAt: 1 };
                break;
            case 'most_read':
                sortOptions = { readCount: -1 };
                break;
            case 'highest_rated':
                sortOptions = { averageRating: -1 };
                break;
        }
        const content = await LearningContent_1.default.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit))
            .lean();
        const total = await LearningContent_1.default.countDocuments(query);
        res.json({
            success: true,
            data: {
                content,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / parseInt(limit)),
                    totalContent: total,
                    hasNext: skip + content.length < total,
                    hasPrev: parseInt(page) > 1
                }
            }
        });
    }
    catch (error) {
        console.error('Get content error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching content'
        });
    }
};
exports.getContent = getContent;
const getContentById = async (req, res) => {
    try {
        const { id } = req.params;
        const content = await LearningContent_1.default.findById(id);
        if (!content) {
            return res.status(404).json({
                success: false,
                message: 'Content not found'
            });
        }
        res.json({
            success: true,
            data: { content }
        });
    }
    catch (error) {
        console.error('Get content error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching content'
        });
    }
};
exports.getContentById = getContentById;
const createContent = async (req, res) => {
    try {
        const contentData = req.body;
        const content = new LearningContent_1.default(contentData);
        await content.save();
        res.status(201).json({
            success: true,
            message: 'Content created successfully',
            data: { content }
        });
    }
    catch (error) {
        console.error('Create content error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating content'
        });
    }
};
exports.createContent = createContent;
const updateContent = async (req, res) => {
    try {
        const { id } = req.params;
        const content = await LearningContent_1.default.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true });
        if (!content) {
            return res.status(404).json({
                success: false,
                message: 'Content not found'
            });
        }
        res.json({
            success: true,
            message: 'Content updated successfully',
            data: { content }
        });
    }
    catch (error) {
        console.error('Update content error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating content'
        });
    }
};
exports.updateContent = updateContent;
const deleteContent = async (req, res) => {
    try {
        const { id } = req.params;
        const content = await LearningContent_1.default.findByIdAndDelete(id);
        if (!content) {
            return res.status(404).json({
                success: false,
                message: 'Content not found'
            });
        }
        res.json({
            success: true,
            message: 'Content deleted successfully'
        });
    }
    catch (error) {
        console.error('Delete content error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting content'
        });
    }
};
exports.deleteContent = deleteContent;
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const { timeSpent, rating, notes } = req.body;
        res.json({
            success: true,
            message: 'Content marked as read successfully',
            data: {
                contentId: id,
                userId,
                readAt: new Date(),
                timeSpent,
                rating,
                notes
            }
        });
    }
    catch (error) {
        console.error('Mark as read error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while marking content as read'
        });
    }
};
exports.markAsRead = markAsRead;
const getReadingHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        res.json({
            success: true,
            data: {
                history: [],
                totalRead: 0,
                totalTimeSpent: 0
            }
        });
    }
    catch (error) {
        console.error('Get reading history error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching reading history'
        });
    }
};
exports.getReadingHistory = getReadingHistory;
const getRecommendations = async (req, res) => {
    try {
        const userId = req.user._id;
        const recommendations = await LearningContent_1.default.find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();
        res.json({
            success: true,
            data: { recommendations }
        });
    }
    catch (error) {
        console.error('Get recommendations error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching recommendations'
        });
    }
};
exports.getRecommendations = getRecommendations;
//# sourceMappingURL=learningController.js.map