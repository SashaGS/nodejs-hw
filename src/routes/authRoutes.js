import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerSchema,
  loginUserSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/auth/register', celebrate(registerSchema), registerUser);
authRouter.post('/auth/login', celebrate(loginUserSchema), loginUser);

authRouter.post('/auth/logout', logoutUser);
export default authRouter;
