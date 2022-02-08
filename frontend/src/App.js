// Importing React functionality
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// importing the user reducer
import user from './reducers/user';

// Importing components
import Content from './components/Content';
import Login from './components/Login';
import NotFound from './components/NotFound';
import LocalStorage from 'components/LocalStorage';
import Game from 'components/Game';
import Profilepage from 'components/Profilepage';
import './main.css';

import Footer from 'components/Footer';
import Header from 'components/Header';

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {

  return (
    <>
      <Header />
      <main className="container p-0 position-absolute top-50 start-50 translate-middle">
        <Provider store={store}>
          <LocalStorage />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Content />}></Route>
              <Route path="/signin" element={<Login />}></Route>
              <Route path="/game/:id" element={<Game />}></Route>
              <Route path="/user/:userId" element={<Profilepage />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </main>
      <Footer />
    </>
  );
};
