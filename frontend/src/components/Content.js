import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import user from '../reducers/user';

import Collection from './Collection';
import { FormButton } from './elements/form';
import { FilterSearchAndAddGame, Logout, MainWindow, TopTextBox } from './elements/general-styling';
import Games from './Games';

const Content = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  const [addNewGame, setAddNewGame] = useState('true');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));
      navigate('/');
      console.log('User sucessfully logged out');
    });
  };

  useEffect(() => {
    if (!accessToken) {
      navigate('/signin');
    }
  }, [accessToken, navigate]);

  return (
    <MainWindow>
      <TopTextBox>
        <h1>Your Collection!</h1>
        <Logout onClick={logout}>Log out</Logout>
      </TopTextBox>
      <FilterSearchAndAddGame>
        {addNewGame === 'false' ? (
          <Collection />
        ) : (
          <FormButton onClick={() => setAddNewGame('false')}>Add new game</FormButton>
        )}
      </FilterSearchAndAddGame>

      <Games />
    </MainWindow>
  );
};

export default Content;
