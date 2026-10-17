import createError from '../utils/createError.js';
import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';
import { createSession } from '../services/auth.js';
import { Session } from '../models/session.js';

export const register = async (req, res, next) => {
  const { email, password } = req.body;

  const existUser = await User.findOne({ email });

  if (existUser) {
    throw createError(409, 'User with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  const newSession = await createSession(newUser._id);

  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createError(404, 'User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw createError(401, 'Invalid credentials');
  }

  // Видаляємо стару сесію користувача;
  await Session.deleteOne({ userId: user._id });
  // Створюємо нову сесію
  const newSession = await createSession(user._id);

  res.status(200).json(user);
};
