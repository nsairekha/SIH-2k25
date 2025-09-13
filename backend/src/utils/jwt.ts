import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

export interface TokenPayload {
  id: string;
  email: string;
}

export const generateAccessToken = (user: IUser): string => {
  const payload: TokenPayload = {
    id: user._id,
    email: user.email
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
    issuer: 'mindspace-api',
    audience: 'mindspace-client'
  } as jwt.SignOptions);
};

export const generateRefreshToken = (user: IUser): string => {
  const payload: TokenPayload = {
    id: user._id,
    email: user.email
  };

  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d',
    issuer: 'mindspace-api',
    audience: 'mindspace-client'
  } as jwt.SignOptions);
};

export const generateEmailVerificationToken = (user: IUser): string => {
  const payload: TokenPayload = {
    id: user._id,
    email: user.email
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '24h',
    issuer: 'mindspace-api',
    audience: 'mindspace-client'
  });
};

export const generatePasswordResetToken = (user: IUser): string => {
  const payload: TokenPayload = {
    id: user._id,
    email: user.email
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '1h',
    issuer: 'mindspace-api',
    audience: 'mindspace-client'
  });
};

export const verifyToken = (token: string, secret: string = process.env.JWT_SECRET!): TokenPayload => {
  return jwt.verify(token, secret) as TokenPayload;
};

export const decodeToken = (token: string): any => {
  return jwt.decode(token);
};


