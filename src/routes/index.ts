import bodyParser from 'body-parser';
import { Router } from 'express';
import { loginRouter } from './loginRouter';
import { userRouter } from './userRouter';

const router = Router();
const jsonParser = bodyParser.json();

router.use('/api/users', jsonParser, userRouter);
router.use('/api/login', jsonParser, loginRouter);

export default router;