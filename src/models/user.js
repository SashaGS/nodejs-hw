import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email.trim();
  }
});

userSchema.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export const User = model('User', userSchema);
