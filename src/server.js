import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pinoHttp from 'pino-http';
// import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { noteFoundHandler } from './middleware/noteFoundHandler.js';

const app = express();

app.use(logger);
// Підключаємо CORS
app.use(cors({ origin: '*' }));
// Підключаємо express.json()
app.use(express.json());
// Підключаємо логер
app.use(pinoHttp());

const PORT = process.env.PORT ?? 3000;

app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

app.get('/notes/:noteId', (req, res) => {
  res.status(200).json({
    message: `Retrieved note with ID: ${req.params.noteId}`,
  });
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// підключення до MongoDB
// await connectMongoDB();

app.use(noteFoundHandler);

// Middleware для обробки помилок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
