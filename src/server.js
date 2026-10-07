import express from 'express';
import 'dotenv/config';
import cors from 'cors';
// import pinoHttp from 'pino-http';
// import helmet from 'helmet';
// import createHttpErrors from 'http-errors';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
// import { Note } from './models/note.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();

// Підключаємо логер
app.use(logger);
// Підключаємо CORS
app.use(cors());
// Підключаємо express.json()
app.use(express.json());
// Підключаємо логер
// app.use(pinoHttp());
// Підключаємо Helmet
// app.use(helmet());

const PORT = process.env.PORT ?? 3000;
// наши роуты
app.use(notesRoutes);
// 404 — якщо маршрут не знайдено
app.use(notFoundHandler);

// Error — якщо під час запиту виникла помилка
app.use(errorHandler);

// підключення до MongoDB
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
