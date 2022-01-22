import { createSlice } from '@reduxjs/toolkit';

const boardgame = createSlice({
  name: 'boardgame',
  initialState: {
    genre: null,
    name: null,
    typeOfGame: null,
    forAge: null,
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
    setForAge: (store, action) => {
      store.forAge = action.payload;
    },
    setError: (store, action) => {
        store.errors = action.payload;
    }
  },
});

export default boardgame;
