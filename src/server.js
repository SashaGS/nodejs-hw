import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pinoHttp from 'pino-http';

const app = express();

// Підключаємо express.json()
app.use(express.json());
// Підключаємо CORS
app.use(cors());
// Підключаємо логер
app.use(pinoHttp());

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port GS ${PORT}`);
});
