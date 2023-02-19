import { PrismaUserRepository } from '../repositories/prisma/PrismaUserRepository';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';

export const userFactory = () => {
    const userRepository = new PrismaUserRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    return userController;
};