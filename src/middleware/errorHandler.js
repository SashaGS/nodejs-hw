import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    req.log.error({ err }, 'HTTP error occurred');
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }
  const isProd = process.env.NODE_ENV === 'production';
  res.status(500).json({
    message: isProd ? 'Internal Server Error' : err.message,
  });
};
