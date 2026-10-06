import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    req.log.error({ err }, 'HTTP error occurred');
    res.status(err.statusCode).json({
      error: err.message,
    });
  }
};
