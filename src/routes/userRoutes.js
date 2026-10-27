import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { updateUserAvatar } from '../controllers/userController.js';

const userRouter = Router();

userRouter.patch('/users/me/avatar', authenticate, updateUserAvatar);

export default userRouter;
