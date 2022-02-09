// Importing React functionality
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// importing the user reducer
import user from './reducers/user';

// Importing components
import UserCollection from './pages/UserCollection';
import Login from './pages/Login';
import NotFound from './components/NotFound';
import LocalStorage from 'components/LocalStorage';
import SeeOneGame from 'pages/SeeOneGame';
import Profilepage from 'pages/Profilepage';
import './main.css';

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <>
      <main className="container-fluid p-0 position-relative">
        <Provider store={store}>
          <LocalStorage />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<UserCollection />}></Route>
              <Route path="/signin" element={<Login />}></Route>
              <Route path="/game/:id" element={<SeeOneGame />}></Route>
              <Route path="/user/:userId" element={<Profilepage />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </main>
    </>
  );
};
