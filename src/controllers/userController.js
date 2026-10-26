import { User } from '../models/user.js';

export const requestResetEmail = async (req, res) => {
  const { email } = req.body;

  const user = User.findOne({ email });

  res.status(200).json({ message: 'Password reset email sent successfully' });
};
