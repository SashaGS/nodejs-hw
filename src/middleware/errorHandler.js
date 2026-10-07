import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    req.log.error({ err }, 'HTTP error occurred');
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }
  const isProd = process.env.NODE_ENV === 'production';
  res.status(500).json({
    message: isProd ? 'Internal Server Error' : err.message,
  });
};
