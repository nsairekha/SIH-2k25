"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = exports.requirePremium = exports.requireEmailVerification = exports.optionalAuth = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_1.default.findById(decoded.id).select('-password');
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Token is not valid. User not found.'
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).json({
                success: false,
                message: 'Invalid token.'
            });
            return;
        }
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({
                success: false,
                message: 'Token expired.'
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: 'Server error during authentication.'
        });
    }
};
exports.authenticate = authenticate;
const optionalAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = await User_1.default.findById(decoded.id).select('-password');
            if (user) {
                req.user = user;
            }
        }
        next();
    }
    catch (error) {
        next();
    }
};
exports.optionalAuth = optionalAuth;
const requireEmailVerification = (req, res, next) => {
    if (!req.user?.isEmailVerified) {
        res.status(403).json({
            success: false,
            message: 'Email verification required.'
        });
        return;
    }
    next();
};
exports.requireEmailVerification = requireEmailVerification;
const requirePremium = (req, res, next) => {
    next();
};
exports.requirePremium = requirePremium;
const adminOnly = (req, res, next) => {
    if (!req.user || req.user.email !== 'admin@mindspace.com') {
        res.status(403).json({
            success: false,
            message: 'Admin access required.'
        });
        return;
    }
    next();
};
exports.adminOnly = adminOnly;
//# sourceMappingURL=auth.js.map