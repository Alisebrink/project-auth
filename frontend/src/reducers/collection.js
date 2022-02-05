import { createSlice } from '@reduxjs/toolkit';

const boardgame = createSlice({
  name: 'boardgame',
  initialState: {
    genre: null,
    name: null,
    typeOfGame: null,
    numberOfPlayers: null,
    forAge: null,
    gameTime: null,
    image:null,
  },
  reducers: {
    setGenre: (store, action) => {
      store.genre = action.payload;
    },
    setName: (store, action) => {
      store.name = action.payload;
    },
    setTypeOfGame: (store, action) => {
      store.typeOfGame = action.payload;
    },
    setNumberOfPlayers: (store, action) => {
      store.numberOfPlayers = action.payload;
    },
    setForAge: (store, action) => {
      store.forAge = action.payload;
    },
    setGameTime: (store, action) => {
      store.gameTime = action.payload;
    },
    setImage: (store, action) => {
      store.setImage = action.payload;
    },
    setError: (store, action) => {
      store.errors = action.payload;
    },
  },
});

export default boardgame;
