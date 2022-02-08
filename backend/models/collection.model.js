import mongoose from 'mongoose';

const UserCollection = mongoose.Schema({
  userId: String,
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ImageCollection',
  },
  game: {
    name: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    typeOfGame: {
      type: String,
      required: true,
    },
    numberOfPlayers: {
      type: String,
    },
    forAge: {
      type: String,
    },
    gameTime: {
      type: String,
    },
  },
});

const Collection = mongoose.model('UserCollection', UserCollection);

export default Collection;
