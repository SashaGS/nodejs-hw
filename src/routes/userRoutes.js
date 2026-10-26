import { Router } from 'express';
import { celebrate } from 'celebrate';
import { requestResetEmailSchema } from '../validations/authValidation.js';
import { requestResetEmail } from '../controllers/userController.js';

const userRouter = Router();

userRouter.use(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);
export default userRouter;
