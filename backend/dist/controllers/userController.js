"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.deleteAccount = exports.uploadAvatar = exports.updatePreferences = exports.updateProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, age } = req.body;
        const user = await User_1.default.findByIdAndUpdate(userId, { $set: { name, age } }, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    age: user.age,
                    avatar: user.avatar,
                    preferences: user.preferences
                }
            }
        });
    }
    catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating profile'
        });
    }
};
exports.updateProfile = updateProfile;
const updatePreferences = async (req, res) => {
    try {
        const userId = req.user._id;
        const preferences = req.body;
        const user = await User_1.default.findByIdAndUpdate(userId, { $set: { preferences } }, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.json({
            success: true,
            message: 'Preferences updated successfully',
            data: {
                preferences: user.preferences
            }
        });
    }
    catch (error) {
        console.error('Update preferences error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating preferences'
        });
    }
};
exports.updatePreferences = updatePreferences;
const uploadAvatar = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }
        const avatarUrl = `/uploads/avatars/${req.file.filename}`;
        const user = await User_1.default.findByIdAndUpdate(userId, { $set: { avatar: avatarUrl } }, { new: true });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.json({
            success: true,
            message: 'Avatar uploaded successfully',
            data: {
                avatar: user.avatar
            }
        });
    }
    catch (error) {
        console.error('Upload avatar error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while uploading avatar'
        });
    }
};
exports.uploadAvatar = uploadAvatar;
const deleteAccount = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User_1.default.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.json({
            success: true,
            message: 'Account deleted successfully'
        });
    }
    catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting account'
        });
    }
};
exports.deleteAccount = deleteAccount;
const getStats = async (req, res) => {
    try {
        const userId = req.user._id;
        const stats = {
            totalMoodEntries: 0,
            totalActivities: 0,
            totalSurveys: 0,
            currentStreak: 0,
            longestStreak: 0,
            pointsEarned: 0,
            achievementsUnlocked: 0,
            joinDate: new Date(),
            lastActive: new Date()
        };
        res.json({
            success: true,
            data: { stats }
        });
    }
    catch (error) {
        console.error('Get user stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching user stats'
        });
    }
};
exports.getStats = getStats;
//# sourceMappingURL=userController.js.map