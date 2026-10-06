import { Router } from 'express';
import {
  getNNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

const router = Router();

export default router;

router.get('/notes', getNNotes);

router.get('/notes/:noteId', getNoteById);

router.post('/notes', createNote);

router.delete('/notes/:noteId', deleteNote);

router.patch('/notes/:noteId', updateNote);
