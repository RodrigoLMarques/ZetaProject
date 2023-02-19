import { Router } from 'express';
import { userFactory } from '../factory/userFactory';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateUser, validateUserUpdate } from '../middlewares/userMiddleware';

const userRouter = Router();
const userController = userFactory();

userRouter.post('/', validateUser, userController.create);
userRouter.get('/', userController.list);
userRouter.get('/:id', userController.listById);
userRouter.delete('/:id', authMiddleware, userController.delete);
userRouter.put('/:id', validateUserUpdate, authMiddleware, userController.update);

export { userRouter };