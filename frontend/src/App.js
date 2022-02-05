// Importing React functionality
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import styled from 'styled-components';

// importing the user reducer
import user from './reducers/user';

// Importing components
import Content from './components/Content';
import Login from './components/Login';
import NotFound from './components/NotFound';
import LocalStorage from 'components/LocalStorage';
import Game from 'components/Game';
import './main.css';

import Footer from 'components/Footer';
import Header from 'components/Header';

const MainContainer = styled.main`
  margin: auto auto;
  width:100vh;
  height: 100vh;
  display:flex;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
   
  @media (min-width:599px) {
    height:70vh;
  }
`;

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {

  return (
    <>
      <Header />
      <MainContainer>
        <Provider store={store}>
          <LocalStorage />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Content />}></Route>
              <Route path="/signin" element={<Login />}></Route>
              <Route path="/game/:id" element={<Game />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </MainContainer>
      <Footer />
    </>
  );
};
