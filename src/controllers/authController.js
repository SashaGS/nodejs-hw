// import createError from '../utils/createError.js';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';
import { createSession } from '../services/auth.js';
import { Session } from '../models/session.js';
import { setSessionCookie } from '../services/auth.js';

export const registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  const existUser = await User.findOne({ email });

  if (existUser) {
    throw createHttpError(400, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  const newSession = await createSession(newUser._id);

  setSessionCookie(res, newSession);
  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw createHttpError(401, 'Invalid credentials');
  }

  // Видаляємо стару сесію користувача;
  await Session.deleteOne({ userId: user._id });
  // Створюємо нову сесію
  const newSession = await createSession(user._id);
  setSessionCookie(res, newSession);
  res.status(200).json(user);
};

export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  if (!sessionId || !refreshToken) {
    throw createHttpError(401, 'Session not found');
  }
  const session = await Session.findOne({ _id: sessionId, refreshToken });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  if (session.refreshTokenValidUntil < new Date()) {
    await Session.deleteOne({ _id: sessionId });
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');
    throw createHttpError(401, 'Refresh token expired');
  }

  // Видаляємо стару сесію користувача;
  await Session.deleteOne({ _id: sessionId });

  // Створюємо нову сесію
  const newSession = await createSession(session.userId);
  setSessionCookie(res, newSession);
  res.status(200).json({ message: 'Session refreshed' });
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};
