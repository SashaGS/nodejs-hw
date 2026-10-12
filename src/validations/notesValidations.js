import { Joi, Segments } from 'celebrate';
import TAGS from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10).optional(),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
    search: Joi.string().trim().allow('').optional(),
  }),
};
// Кастомний валідатор для перевірки, чи є noteId дійсним ObjectId
const noteIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(noteIdValidator).required(),
  }),
};
//createNoteSchema
//updateNoteSchema
