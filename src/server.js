import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { noteFoundHandler } from './middleware/noteFoundHandler.js';
import { Note } from './models/note.js';

const app = express();

app.use(logger);
// Підключаємо CORS
app.use(cors({ origin: '*' }));
// Підключаємо express.json()
app.use(express.json());
// Підключаємо логер
app.use(pinoHttp());

const PORT = process.env.PORT ?? 3000;

app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
});

app.get('/notes/:noteId', async (req, res) => {
  const noteid = req.params.noteId;
  const note = await Note.findOne({ _id: noteid });
  res.status(200).json(note);
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// 404 — якщо маршрут не знайдено
app.use(noteFoundHandler);

// Error — якщо під час запиту виникла помилка
app.use(errorHandler);

// підключення до MongoDB
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
