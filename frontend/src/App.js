// Importing React functionality
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Importing components
import Content from './components/Content';
import Login from './components/Login';
import NotFound from './components/NotFound';
import LocalStorage from 'components/LocalStorage';
import Game from 'components/Game'

// Importing my reducer
import user from './reducers/user';

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {

  return (
    <Provider store={store}>
      <LocalStorage/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Content/>}></Route>
          <Route path="/signin" element={<Login/>}></Route>
          <Route path="/game/:id" element={<Game/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
