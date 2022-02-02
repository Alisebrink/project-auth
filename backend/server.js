import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Importing the schemas for my models
import User from './models/user.model';
import UserCollection from './models/collection.model';
import Role from './models/roles.model';

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
  const games = await UserCollection.find({ userId: req.userId }).exec();
  // Borde hämta alla brädspel efter current userId

  res.json(games.map((e) => e));
});

// Gets one boardgame
app.get('/game/:id', authenticateUser, async (req, res) => {
  const game = await UserCollection.findOne({ userId: req.userId, _id: req.params.id }).exec();

  res.json(game);
});

// Create a game to your collection
app.post('/game', authenticateUser, async (req, res) => {
  const { genre, name, typeOfGame, numberOfPlayers, gameTime, forAge } = req.body;

  try {
    const newGame = await new UserCollection({
      userId: req.userId,
      game: {
        genre,
        name,
        typeOfGame,
        numberOfPlayers,
        gameTime,
        forAge,
      },
    }).save();
    console.log(`You've added a boardgame to your collection`);
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

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 5) {
      throw { message: 'Your password must be atleast 5 characters long!' };
    }
    const newUser = await new User({
      username,
      role: (await Role.findOne({ role: 'User' }).exec())._id,
      password: bcrypt.hashSync(password, salt),
    }).save();
    console.log('User successfully added');
    // returns json, access token and user id
    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
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
