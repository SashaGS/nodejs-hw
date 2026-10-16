import createError from '../utils/createError.js';
import { User } from '../models/user.js';

export const register = async (req, res, next) => {
  const { email, password } = req.body;

  const existUser = await User.findOne({ email });

  if (!existUser) {
    throw createError(409, 'User with this email already exists');
  }

  res.status(201).json({});
};
