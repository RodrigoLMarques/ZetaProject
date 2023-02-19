import { NextFunction, Request, Response } from 'express';
import { loginSchema } from '../schemas/loginSchema';
import { IUserLogin } from '../interfaces/userInterface';
import { BadRequestError } from '../errors/badRequestError';
import { joiOptions } from '../config/joiConfig';

export const validateLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Valida se os dados enviado pelo Body está no formato do loginSchema
    const user: IUserLogin = req.body;
    const { error } = loginSchema.validate(user, joiOptions);

    if (error) {
        const customError = new BadRequestError(error.message);
        return next(customError);
    }

    next();
};