import { Router } from 'express';
import createHttpErrors from 'http-errors';
import { Note } from '../models/note.js';

const router = Router();

export default router;

router.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
});

router.get('/notes/:noteId', async (req, res) => {
  const noteid = req.params.noteId;
  const note = await Note.findOne({ _id: noteid });
  if (!note) {
    // return res.status(404).json({ message: 'Note not found' });
    // throw new Error('Note not found');
    throw createHttpErrors(404, 'Note not found');
  }
  res.status(200).json(note);
});
