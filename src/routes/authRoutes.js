import { router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerSchema,
  loginUserSchema,
} from '../validations/authValidation.js';
import { registerUser, loginUser } from '../controllers/authController.js';

const authRouter = router();

authRouter.post('/auth/register', celebrate(registerSchema), registerUser);
authRouter.post('/auth/login', celebrate(loginUserSchema), loginUser);

export default authRouter;
