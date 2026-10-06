import createHttpErrors from 'http-errors';
import { Note } from '../models/note.js';

export const getNNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

export const getNoteById = async (req, res) => {
  const noteid = req.params.noteId;
  const note = await Note.findOne({ _id: noteid });
  if (!note) {
    throw createHttpErrors(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  res.status(201).json({});
};
