import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/badRequestError';
import { INewUser } from '../interfaces/userInterface';
import { userSchema, updateUserSchema } from '../schemas/userSchema';
import { joiOptions } from '../config/joiConfig';

export const validateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Valida se os dados enviado pelo Body está no formato do userSchema
    const user: INewUser = req.body;
    const { error }  = userSchema.validate(user, joiOptions);

    if (error) {
        const customError = new BadRequestError(error.message);
        return next(customError);
    }

    next();
};

export const validateUserUpdate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Valida se os dados enviado pelo Body está no formato do updateUserSchema
    const user: INewUser = req.body;
    const { error } = updateUserSchema.validate(user, joiOptions);

    if (error) {
        const customError = new BadRequestError(error.message);
        return next(customError);
    }

    next();
};
