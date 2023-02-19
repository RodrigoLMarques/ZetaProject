import { CustomError } from './customError';

class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message, 400);
    }
}

export { BadRequestError };