import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Importing the schemas for my models
import User from './models/user.model';
import UserCollection from './models/collection.model';
import Role from './models/roles.model';
import Image from './models/image.model';

// Importing .env with secrets
import dotenv from 'dotenv';

dotenv.config();

// Imports for image upload
import cloudinaryFramework from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const cloudinary = cloudinaryFramework.v2;
cloudinary.config({
  cloud_name: 'lifin4lproj3ct', // this needs to be whatever you get from cloudinary
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'games',
    allowedFormats: ['jpg', 'png', 'JPG', 'jpeg', 'webp'],
    transformation: [{ width: 600, height: 400, crop: 'fill' }],
  },
});
const parser = multer({ storage });

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/alisebrinkFinalProject';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

const setUser = async (req, res, next) => {
  const accessToken = req.header('accessToken');
  if (accessToken) {
    const currentUser = await User.findOne({ accessToken: accessToken }).exec();
    req.userId = currentUser?._id;
  }
  next();
};

app.use(cors());
app.use(express.json());
app.use(setUser);

const authenticateUser = async (req, res, next) => {
  if (req.userId) {
    next();
  } else {
    res.status(401).json({
      response: {
        message: 'Please log in',
      },
      success: false,
    });
  }
};

app.get('/', (req, res) => {
  res.send('Welcome to the API for my final project. This is a board game management system!');
});

// gets all games for the current user
app.get('/game', authenticateUser, async (req, res) => {
  // Borde hämta alla brädspel efter current userId
  const games = await UserCollection.find({ userId: req.userId }).populate('image').exec();

  res.json(games.map((e) => e));
});

// Gets one boardgame
app.get('/game/:id', authenticateUser, async (req, res) => {
  const game = await UserCollection.findOne({ userId: req.userId, _id: req.params.id })
    .populate('image')
    .exec();

  res.json(game);
});

// Create a game to your collection
app.post('/game', authenticateUser, parser.single('image'), async (req, res) => {
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
});

// Update one game
app.patch('/game/:id', authenticateUser, async (req, res) => {
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
      console.log('Sucessfully edited this game');
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
});

// Delete one game
app.delete('/game/:id', authenticateUser, async (req, res) => {
  try {
    await UserCollection.deleteOne({ userId: req.userId, _id: req.params.id }).exec();
    console.log('Successfully deleted one game');
    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
});

// endpoint to create a user
app.post('/signup', async (req, res) => {
  const { username, password, firstname, lastname, email } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 5) {
      throw { message: 'Your password must be atleast 5 characters long!' };
    }
    const newUser = await new User({
      username,
      firstname,
      lastname,
      email,
      role: (await Role.findOne({ role: 'User' }).exec())._id,
      password: bcrypt.hashSync(password, salt),
    }).save();
    console.log('User successfully added');
    // returns json, access token and user id
    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        accessToken: newUser.accessToken,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
});

// Gets one user for a profile page
app.get('/user/:userId', authenticateUser, async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).exec();

    res.status(200).json({ response: user, success: true });
  } catch (error) {
    res.status(404).json({ response: error, success: false });
  }
});

//Endpoint where the user can login with a created user
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
        },
        success: true,
      });
      console.log('User successfully logged in');
    } else {
      res.status(404).json({
        response: "The username or password doesn't match",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
    console.log('Error trying to log in');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
