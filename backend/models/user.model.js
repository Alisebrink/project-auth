import mongoose, { ObjectId } from 'mongoose';
import crypto from 'crypto';

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  userCollection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserCollection',
  },
  userAchievements: [],
});

const User = mongoose.model('User', UserSchema);

export default User;
