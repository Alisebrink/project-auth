import User from "../models/user.model";

export const authenticateUser = async (req, res, next) => {
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

export const setUser = async (req, res, next) => {
  const accessToken = req.header('accessToken');
  if (accessToken) {
    const currentUser = await User.findOne({ accessToken: accessToken }).exec();
    req.userId = currentUser?._id;
  }
  next();
};
