import { Router } from 'express';
import {
  getNNotes,
  getNoteById,
  createNote,
} from '../controllers/notesController.js';

const router = Router();

export default router;

router.get('/notes', getNNotes);

router.get('/notes/:noteId', getNoteById);

router.post('/notes', createNote);
