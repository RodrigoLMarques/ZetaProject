import { Secret, SignOptions } from 'jsonwebtoken';

const secret: Secret = process.env.JWT_SECRET || 'secret';

const options: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1d',
};

export { secret, options };