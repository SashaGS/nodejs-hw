import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import { errors } from 'celebrate';

const PORT = process.env.PORT ?? 3000;

const app = express();

// Підключаємо логер
app.use(logger);
// Підключаємо CORS
app.use(cors());
app.use(cookieParser());
// Підключаємо express.json()
app.use(express.json());
// Підключаємо логер
// app.use(pinoHttp());
// Підключаємо Helmet
// app.use(helmet());

// наши роуты
app.use(authRoutes);
app.use(notesRoutes);
app.use(userRouter);

// 404 — якщо маршрут не знайдено
app.use(notFoundHandler);
// Celebrate error handler
app.use(errors());
// Error — якщо під час запиту виникла помилка
app.use(errorHandler);

// підключення до MongoDB
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
