import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    throw createHttpError(401, 'Missing access token');
  }

  const session = await Session.findOne({ accessToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isAccessTokenExpired = session.accessTokenValidUntil < new Date();

  if (isAccessTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await User.findById(session.userId);
  // console.log(session.userId);
  if (!user) {
    createHttpError(401);
  }
  // console.log(user);
  req.user = user;

  next();
};

// PORT=3000
// NODE_ENV=development
// # MONGO_URL = mongodb+srv://fqva_db_user:rjZTZn7keveyexAJ@cluster0.dudqfhw.mongodb.net/?appName=Cluster0

// MONGO_URL= mongodb://fqva_db_user:rjZTZn7keveyexAJ@ac-gwarbxr-shard-00-00.dudqfhw.mongodb.net:27017,ac-gwarbxr-shard-00-01.dudqfhw.mongodb.net:27017,ac-gwarbxr-shard-00-02.dudqfhw.mongodb.net:27017/notes-dev?ssl=true&replicaSet=atlas-11zh2v-shard-0&authSource=admin&retryWrites=true&w=majority
