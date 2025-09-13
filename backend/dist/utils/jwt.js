"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.verifyToken = exports.generatePasswordResetToken = exports.generateEmailVerificationToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
        issuer: 'mindspace-api',
        audience: 'mindspace-client'
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d',
        issuer: 'mindspace-api',
        audience: 'mindspace-client'
    });
};
exports.generateRefreshToken = generateRefreshToken;
const generateEmailVerificationToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '24h',
        issuer: 'mindspace-api',
        audience: 'mindspace-client'
    });
};
exports.generateEmailVerificationToken = generateEmailVerificationToken;
const generatePasswordResetToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
        issuer: 'mindspace-api',
        audience: 'mindspace-client'
    });
};
exports.generatePasswordResetToken = generatePasswordResetToken;
const verifyToken = (token, secret = process.env.JWT_SECRET) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
const decodeToken = (token) => {
    return jsonwebtoken_1.default.decode(token);
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=jwt.js.map