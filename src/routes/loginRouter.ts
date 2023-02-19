import { Router } from 'express';
import { userFactory } from '../factory/userFactory';
import { validateLogin } from '../middlewares/loginMiddleware';
const loginRouter = Router();
const userController = userFactory();

loginRouter.post('/', validateLogin, userController.login);

export { loginRouter };