import mongoose from 'mongoose';

const ImageCollection = mongoose.Schema({
  imageUrl: String,
  gameId: String,
});

const Image = mongoose.model('ImageCollection', ImageCollection);

export default Image;
