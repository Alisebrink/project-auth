import UserCollection from '../models/collection.model';
import Image from '../models/image.model';

// Gets one game from the users collection
export const getOneGame = async (req, res) => {
  const game = await UserCollection.findOne({ userId: req.userId, _id: req.params.id })
    .populate('image')
    .exec();

  res.json(game);
};

// Posts one game to the users collection
// Image is baked into this endpoint so that the image gets connected to the posted game
export const postOneGame = async (req, res) => {
  const { genre, name, typeOfGame, numberOfPlayers, gameTime, forAge } = req.body;
  try {
    // Create a new game
    const newGame = await new UserCollection({
      userId: req.userId,
      game: {
        name,
        genre,
        typeOfGame,
        numberOfPlayers,
        gameTime,
        forAge,
      },
    }).save();

    // if there is a image provided create a new image in the DB
    if (req.file.path) {
      const uploadedImage = await new Image({
        imageUrl: req.file.path,
        gameId: newGame._id,
      }).save();
      newGame.image = uploadedImage;

      // append the game with the uploaded image
      await UserCollection.findByIdAndUpdate(newGame._id, {
        $set: { image: uploadedImage._id },
      }).exec();
    }
    // returns json, access token and user id
    res.status(201).json({
      response: newGame,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
};

// Updates one game in the users collection
export const updateOneGame = async (req, res) => {
  const { id } = req.params;
  const game = req.body;

  try {
    const updatedGame = await UserCollection.findByIdAndUpdate(
      id,
      { $set: { game: game } },
      { new: true }
    ).exec();
    if (updatedGame) {
      res.status(200).json({ response: updatedGame, sucess: true });
    } else {
      res.status(404).json({
        message: 'Could not find game',
        sucess: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: 'Invalid request',
      response: error,
      success: false,
    });
  }
};

// Deletes one game from the users collection
export const deleteOneGame = async (req, res) => {
  try {
    await UserCollection.deleteOne({ userId: req.userId, _id: req.params.id }).exec();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
};

// Gets all games from the users collection
export const getAllGames = async (req, res) => {
  const games = await UserCollection.find({ userId: req.userId }).populate('image').exec();

  res.json(games.map((e) => e));
};
