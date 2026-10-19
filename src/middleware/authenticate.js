import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    throw createHttpError(401, 'Missing access token');
  }
};
