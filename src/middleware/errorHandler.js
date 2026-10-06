export const errorHandler = (err, req, res, next) => {
  req.log.error({ err }, 'Виникла помилка');
  res.status(500).json({
    message: 'повідомлення про помилку',
    error: err.message,
  });
};
