import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import User from './models/user.model';
import Role from './models/user.model';
// import Collection from './models/collection.model';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/alisebrinkFinalProject';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

const authenticateUser = async (req, res, next) => {
  if (user) {
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

app.get('/content', authenticateUser);
app.get('/content', (req, res) => {
  res.json({ secret: "You've accessed the secret content, congratulations!" });
});

// Use to populate the Role collection
app.post('/role', async (req, res) => {
  const { roles } = req.body;

  try {
    const newRole = await new Role({ roles }).save();
    res.status(201).json({ response: newRole, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
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
      role: 'User',
      password: bcrypt.hashSync(password, salt),
    }).save();

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
    } else {
      res.status(404).json({
        response: "The username or password doesn't match",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
