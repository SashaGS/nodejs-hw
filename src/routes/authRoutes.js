import { router } from 'express';
import { celebrate } from 'celebrate';
import { registerSchema } from '../validations/authValidation.js';
import { registerUser } from '../controllers/authController.js';

const authRouter = router();

authRouter.post('/auth/register', celebrate(registerSchema), registerUser);

export default authRouter;
