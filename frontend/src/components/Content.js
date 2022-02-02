import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import user from '../reducers/user';

import Collection from './Collection';
import Games from './Games';

const Content = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);

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
    <main>
      <h1>Welcome {username}!</h1>
      <h2>You are now logged in.</h2>

      {addNewGame === 'false' ? (
        <Collection />
      ) : (
        <button onClick={() => setAddNewGame('false')}>Add new game</button>
      )}
      <p>Here's your collection:</p>
      <Games />
      <button onClick={logout}>Log out</button>
    </main>
  );
};

export default Content;
