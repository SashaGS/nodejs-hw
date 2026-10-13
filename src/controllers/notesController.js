import createHttpErrors from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const skip = (page - 1) * perPage;

  const notesQuery = Note.find();

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
  const note = await Note.findOne({ _id: noteid });
  if (!note) {
    throw createHttpErrors(404, 'Note not found');
  }
  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  // try {
  // console.log('req.body:', req.body);
  const note = await Note.create(req.body);
  res.status(201).json(note);
  // } catch (err) {
  //   throw createHttpErrors(500, err.message);
  // }
};

export const deleteNote = async (req, res) => {
  // console.log('req.params:', req.params);
  const noteId = req.params.noteId;
  const delNote = await Note.findOneAndDelete({ _id: noteId });
  if (!delNote) {
    throw createHttpErrors(404, 'Note not found');
  }
  res.status(200).json(delNote);
};

export const updateNote = async (req, res) => {
  const noteId = req.params.noteId;
  const updNote = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    returnDocument: 'after',
  });
  if (!updNote) {
    throw createHttpErrors(404, 'Note not found');
  }
  res.status(200).json(updNote);
};
