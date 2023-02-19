import { Secret, SignOptions } from 'jsonwebtoken';

export const secret: Secret = process.env.JWT_SECRET || 'secret';

export const options: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1d',
};