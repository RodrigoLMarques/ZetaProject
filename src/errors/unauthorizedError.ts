import { CustomError } from './customError';

class UnauthorizedError extends CustomError {
    constructor(message: string) {
        super(message, 401);
    }
}

export { UnauthorizedError };