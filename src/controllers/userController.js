import createHttpError from 'http-errors';
// import { User } from '../models/user.js';

// src/controllers/userController.js

export const updateUserAvatar = async (req, res, next) => {
  if (!req.file) {
    throw createHttpError(400, 'No file');
  }
  res.status(200).json({ url: '' });
};
