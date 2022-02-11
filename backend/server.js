import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Importing .env with secrets
import dotenv from 'dotenv';

import { authenticateUser, setUser } from './authorization/authenticateUser';

import { createUser, loginUser, getUser } from './endpoints/userEndpoints';
import {
  getOneGame,
  postOneGame,
  updateOneGame,
  deleteOneGame,
  getAllGames,
} from './endpoints/gameEndpoints';

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
    transformation: [{ width: 600, height: 400, crop: 'fill', gravity: 'north' }],
  },
});
const parser = multer({ storage });

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/alisebrinkFinalProject';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(setUser);

app.get('/', (req, res) => {
  res.send('Welcome to the API for my final project. This is a board game management system!');
});

/* ----------------- ENDPOINTS FOR BOARDGAMES ----------------- */

app.post('/game', authenticateUser, parser.single('image'), postOneGame); // creates a game
app.get('/game', authenticateUser, getAllGames); // gets all games for the current user
app.get('/game/:id', authenticateUser, getOneGame); // gets one game
app.patch('/game/:id', authenticateUser, updateOneGame); // updates one game
app.delete('/game/:id', authenticateUser, deleteOneGame); // deletes one game

/* ----------------- ENDPOINTS FOR USER ----------------- */

app.post('/signup', createUser); // endpoint to create a user
app.post('/signin', loginUser); //Endpoint where the user can login with a created user

app.get('/user/:userId', authenticateUser, getUser); // Gets one user for a profile page

// Listens to the localhost port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
