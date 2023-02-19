import { INewUser, ISafeUser, IUserLogin } from '../interfaces/userInterface';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/UserService';

class UserController {
    
    constructor(
        private service: UserService
    ) {}

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user: IUserLogin = req.body;
            const response = await this.service.login(user);
            res.status(200).json({ code: 200, response, error: '' });
        } catch (error) {
            next(error);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user: INewUser = req.body;
            const newUser = await this.service.create(user);
            res.status(201).json({ code: 201, response: newUser, error: '' });
        } catch (error) {
            next(error);
        }
    };

    public list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const users: ISafeUser[] = await this.service.list();
            res.status(200).json({ code: 200, response: users, error: '' });
        } catch (error) {
            next(error);
        }
    };

    public listById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const user = await this.service.listById(id);
            res.status(200).json({ code: 200, response: user, error: '' });
        } catch (error) {
            next(error);
        }
    };

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = Number(req.params.id);
            await this.service.delete(id);
            res.status(200).json({ code: 200, response: {}, error: '' });
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = Number(req.params.id); 
            const user: INewUser = req.body;
            const userUpdate = await this.service.update(id, user);
            res.status(200).json({ code: 200, response: userUpdate, error: '' });
        } catch (error) {
            next(error);
        }
    };
}

export { UserController };