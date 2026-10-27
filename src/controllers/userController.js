import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
// import { User } from '../models/user.js';

// src/controllers/userController.js

export const updateUserAvatar = async (req, res, next) => {
  const { file, user } = req;

  if (!file) {
    throw createHttpError(400, 'No file');
  }
  // console.log(req.file);
  const result = await saveFileToCloudinary(file.buffer, user._id);
  res.status(200).json({ url: '' });
};
