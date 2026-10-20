import createHttpErrors from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const skip = (page - 1) * perPage;

  const notesQuery = Note.find();

  notesQuery.where('userId').equals(req.user._id);

  if (tag) {
    notesQuery.where('tag').equals(tag);
  }

  if (search) {
    notesQuery.where({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    });
  }

  const [totalNotes, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPage),
  ]);

  // console.log(notes);

  if (notes.length === 0) {
    throw createHttpErrors('404', 'Note not found');
  }

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const noteid = req.params.noteId;
  const note = await Note.findOne({ _id: noteid, userId: req.user._id });
  if (!note) {
    throw createHttpErrors(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create({
    ...req.body,
    userId: req.user._id,
  });
  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  // console.log('req.params:', req.params);
  const noteId = req.params.noteId;
  const delNote = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user._id,
  });
  if (!delNote) {
    throw createHttpErrors(404, 'Note not found');
  }
  res.status(200).json(delNote);
};

export const updateNote = async (req, res) => {
  const noteId = req.params.noteId;
  const updNote = await Note.findOneAndUpdate(
    { _id: noteId, userId: req.user._id },
    req.body,
    {
      returnDocument: 'after',
    },
  );
  if (!updNote) {
    throw createHttpErrors(404, 'Note not found');
  }
  res.status(200).json(updNote);
};
