import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors/unauthorizedError';
import { BadRequestError } from '../errors/badRequestError';
import { NotFoundError } from '../errors/notFoundError';
import { IUserPayload } from '../interfaces/userInterface';
import { PrismaUserRepository } from '../repositories/prisma/PrismaUserRepository';
import { secret } from './../config/jwtConfig';
import jwt from 'jsonwebtoken';

const userModel = new PrismaUserRepository();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    // Verifica se o id existe e se for válido
    const id = Number(req.params.id);

    if (!id) 
        return next(new BadRequestError('Id is not valid'));

    const result = await userModel.exists(id);

    if (!result) 
        return next(new NotFoundError('No user found'));

        
    // Verifica se o token enviado pelo header na request é válido
    try {
        const { authorization } = req.headers;

        if (!authorization) 
            return next(new UnauthorizedError('Token not found'));
            
        const token = authorization.split(' ')[1];
        const { idToken } = jwt.verify(token, secret) as IUserPayload;

        if (id != idToken) 
            return next(new UnauthorizedError('Unauthorized token'));

        next();
    } catch (error) {
        next(new UnauthorizedError('Invalid token'));
    }
};