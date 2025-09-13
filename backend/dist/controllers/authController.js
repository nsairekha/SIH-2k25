"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.resendVerification = exports.verifyEmail = exports.resetPassword = exports.forgotPassword = exports.refreshToken = exports.logout = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const emailService_1 = require("../services/emailService");
const register = async (req, res) => {
    try {
        const { email, password, name, age, preferences } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }
        const user = new User_1.default({
            email,
            password,
            name,
            age,
            preferences: preferences || {
                theme: 'system',
                language: 'en',
                notifications: true,
                ageGroup: 'adult',
                accessibility: {
                    highContrast: false,
                    largeText: false,
                    reducedMotion: false,
                    screenReader: false
                }
            }
        });
        await user.save();
        const accessToken = (0, jwt_1.generateAccessToken)(user);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user);
        const emailVerificationToken = (0, jwt_1.generateEmailVerificationToken)(user);
        user.emailVerificationToken = emailVerificationToken;
        await user.save();
        await (0, emailService_1.sendEmail)({
            to: user.email,
            subject: 'Verify your MindSpace account',
            template: 'emailVerification',
            data: {
                name: user.name,
                verificationLink: `${process.env.CLIENT_URL}/verify-email/${emailVerificationToken}`
            }
        });
        res.status(201).json({
            success: true,
            message: 'User registered successfully. Please check your email to verify your account.',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    isEmailVerified: user.isEmailVerified,
                    preferences: user.preferences
                },
                tokens: {
                    accessToken,
                    refreshToken
                }
            }
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        user.lastActive = new Date();
        await user.save();
        const accessToken = (0, jwt_1.generateAccessToken)(user);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user);
        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    avatar: user.avatar,
                    isEmailVerified: user.isEmailVerified,
                    preferences: user.preferences,
                    lastActive: user.lastActive
                },
                tokens: {
                    accessToken,
                    refreshToken
                }
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Logout successful'
        });
    }
    catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during logout'
        });
    }
};
exports.logout = logout;
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Refresh token is required'
            });
        }
        const decoded = (0, jwt_1.verifyToken)(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User_1.default.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token'
            });
        }
        const newAccessToken = (0, jwt_1.generateAccessToken)(user);
        res.json({
            success: true,
            data: {
                accessToken: newAccessToken
            }
        });
    }
    catch (error) {
        console.error('Refresh token error:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid refresh token'
        });
    }
};
exports.refreshToken = refreshToken;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.json({
                success: true,
                message: 'If an account with that email exists, we have sent a password reset link.'
            });
        }
        const resetToken = (0, jwt_1.generatePasswordResetToken)(user);
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
        await user.save();
        await (0, emailService_1.sendEmail)({
            to: user.email,
            subject: 'Reset your MindSpace password',
            template: 'passwordReset',
            data: {
                name: user.name,
                resetLink: `${process.env.CLIENT_URL}/reset-password/${resetToken}`
            }
        });
        res.json({
            success: true,
            message: 'If an account with that email exists, we have sent a password reset link.'
        });
    }
    catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during password reset'
        });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const user = await User_1.default.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        res.json({
            success: true,
            message: 'Password reset successful'
        });
    }
    catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during password reset'
        });
    }
};
exports.resetPassword = resetPassword;
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await User_1.default.findOne({ emailVerificationToken: token });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid verification token'
            });
        }
        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        await user.save();
        res.json({
            success: true,
            message: 'Email verified successfully'
        });
    }
    catch (error) {
        console.error('Email verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during email verification'
        });
    }
};
exports.verifyEmail = verifyEmail;
const resendVerification = async (req, res) => {
    try {
        const user = req.user;
        if (user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: 'Email is already verified'
            });
        }
        const emailVerificationToken = (0, jwt_1.generateEmailVerificationToken)(user);
        user.emailVerificationToken = emailVerificationToken;
        await user.save();
        await (0, emailService_1.sendEmail)({
            to: user.email,
            subject: 'Verify your MindSpace account',
            template: 'emailVerification',
            data: {
                name: user.name,
                verificationLink: `${process.env.CLIENT_URL}/verify-email/${emailVerificationToken}`
            }
        });
        res.json({
            success: true,
            message: 'Verification email sent successfully'
        });
    }
    catch (error) {
        console.error('Resend verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during email resend'
        });
    }
};
exports.resendVerification = resendVerification;
const getProfile = async (req, res) => {
    try {
        const user = req.user;
        res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    avatar: user.avatar,
                    age: user.age,
                    isEmailVerified: user.isEmailVerified,
                    preferences: user.preferences,
                    lastActive: user.lastActive,
                    createdAt: user.createdAt
                }
            }
        });
    }
    catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching profile'
        });
    }
};
exports.getProfile = getProfile;
//# sourceMappingURL=authController.js.map