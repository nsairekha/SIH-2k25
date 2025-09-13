"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivityStats = exports.completeActivity = exports.deleteActivity = exports.updateActivity = exports.createActivity = exports.getActivityById = exports.getActivities = void 0;
const Activity_1 = __importDefault(require("../models/Activity"));
const getActivities = async (req, res) => {
    try {
        const { type, category, difficulty, page = 1, limit = 20 } = req.query;
        const query = {};
        if (type)
            query.type = type;
        if (category)
            query.category = category;
        if (difficulty)
            query.difficulty = difficulty;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const activities = await Activity_1.default.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .lean();
        const total = await Activity_1.default.countDocuments(query);
        res.json({
            success: true,
            data: {
                activities,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / parseInt(limit)),
                    totalActivities: total,
                    hasNext: skip + activities.length < total,
                    hasPrev: parseInt(page) > 1
                }
            }
        });
    }
    catch (error) {
        console.error('Get activities error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching activities'
        });
    }
};
exports.getActivities = getActivities;
const getActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.default.findById(id);
        if (!activity) {
            return res.status(404).json({
                success: false,
                message: 'Activity not found'
            });
        }
        res.json({
            success: true,
            data: { activity }
        });
    }
    catch (error) {
        console.error('Get activity error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching activity'
        });
    }
};
exports.getActivityById = getActivityById;
const createActivity = async (req, res) => {
    try {
        const activityData = req.body;
        const activity = new Activity_1.default(activityData);
        await activity.save();
        res.status(201).json({
            success: true,
            message: 'Activity created successfully',
            data: { activity }
        });
    }
    catch (error) {
        console.error('Create activity error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating activity'
        });
    }
};
exports.createActivity = createActivity;
const updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.default.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true });
        if (!activity) {
            return res.status(404).json({
                success: false,
                message: 'Activity not found'
            });
        }
        res.json({
            success: true,
            message: 'Activity updated successfully',
            data: { activity }
        });
    }
    catch (error) {
        console.error('Update activity error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating activity'
        });
    }
};
exports.updateActivity = updateActivity;
const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity_1.default.findByIdAndDelete(id);
        if (!activity) {
            return res.status(404).json({
                success: false,
                message: 'Activity not found'
            });
        }
        res.json({
            success: true,
            message: 'Activity deleted successfully'
        });
    }
    catch (error) {
        console.error('Delete activity error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting activity'
        });
    }
};
exports.deleteActivity = deleteActivity;
const completeActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const { duration, notes, rating } = req.body;
        const activity = await Activity_1.default.findById(id);
        if (!activity) {
            return res.status(404).json({
                success: false,
                message: 'Activity not found'
            });
        }
        res.json({
            success: true,
            message: 'Activity completed successfully',
            data: {
                activityId: id,
                userId,
                completedAt: new Date(),
                duration,
                notes,
                rating
            }
        });
    }
    catch (error) {
        console.error('Complete activity error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while completing activity'
        });
    }
};
exports.completeActivity = completeActivity;
const getActivityStats = async (req, res) => {
    try {
        const userId = req.user._id;
        res.json({
            success: true,
            data: {
                totalActivities: 0,
                completedActivities: 0,
                favoriteType: 'meditation',
                totalTimeSpent: 0,
                streak: 0
            }
        });
    }
    catch (error) {
        console.error('Get activity stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching activity stats'
        });
    }
};
exports.getActivityStats = getActivityStats;
//# sourceMappingURL=activityController.js.map