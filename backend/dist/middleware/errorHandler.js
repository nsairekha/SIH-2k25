"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = require("jsonwebtoken");
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    console.error(err);
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = { message, statusCode: 404 };
    }
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `${field} already exists`;
        error = { message, statusCode: 400 };
    }
    if (err instanceof mongoose_1.Error.ValidationError) {
        const message = Object.values(err.errors).map((val) => val.message).join(', ');
        error = { message, statusCode: 400 };
    }
    if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        const message = 'Invalid token';
        error = { message, statusCode: 401 };
    }
    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        const message = 'Token expired';
        error = { message, statusCode: 401 };
    }
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Server Error';
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map