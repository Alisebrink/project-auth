import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    accessToken: null,
    error: null,
  },
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload;
      localStorage.setItem('userId', store.userId)
    },
    setUsername: (store, action) => {
      store.username = action.payload;
      localStorage.setItem('username', store.username)
    },
    setFirstname: (store, action) => {
      store.firstname = action.payload;
    },
    setLastname: (store, action) => {
      store.lastname = action.payload;
    },
    setEmail: (store, action) => {
      store.email = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
      localStorage.setItem('accessToken', store.accessToken)
    },
    setError: (store, action) => {
      store.error  = action.payload;
    },
  },
});

export default user;

