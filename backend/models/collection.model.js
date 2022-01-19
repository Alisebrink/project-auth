import mongoose from 'mongoose'
import User from './user.model';


const UserCollection = new.mongoose.Schema({
    userId: User._id,
    games: {
    name: {
        type: String,
        required: true,
        unique: true,
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
        type: Number,
      },
      forAge: {
        type: Number,
      },}
      
    },
)
const Collection = mongoose.model('UserCollection', UserCollection);

export default Collection;