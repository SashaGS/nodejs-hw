import { Schema } from 'mongoose';
import { model } from 'mongoose';

const noteSchema = new Schema({
  // title: {
  //   type: String,
  //   required: true,
  // },
  // content: {
  //   type: String,
  //   required: true,
  // },
});

export const Note = model('Note', noteSchema);
