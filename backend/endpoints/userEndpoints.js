import User from '../models/user.model.js';
import Role from '../models/roles.model';

import bcrypt from 'bcrypt';

// Endpoint to create a user
export const createUser = async (req, res) => {
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
};

// Endpoint to login with your user
export const loginUser = async (req, res) => {
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
};

// Endpoint to get the logged in users information for a profile page
export const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).exec();

    res.status(200).json({ response: user, success: true });
  } catch (error) {
    res.status(404).json({ response: error, success: false });
  }
};