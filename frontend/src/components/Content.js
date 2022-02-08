import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import user from '../reducers/user';

import Collection from './Collection';
import Games from './Games';

import styled from 'styled-components';
const Heading = styled.h1`
  font-size: 1rem;
  margin: 0;

  @media (min-width: 599px) {
    font-size: 1.5rem;
  }
`;

const Content = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);

  const [addNewGame, setAddNewGame] = useState('true');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setUserId(null));
      dispatch(user.actions.setAccessToken(null));
      navigate('/');
      console.log('User sucessfully logged out');
    });
  };

  const profilePage = () => {

    navigate(`/user/${userId}`);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate('/signin');
    }
  }, [accessToken, navigate]);

  return (
    <main className="bg-white shadow-lg rounded container p-0 max-height">
      <div className="gradient p-2 d-flex flex-row align-items-center sticky-top">
        <Heading className="text-light flex-grow-1">Your Collection!</Heading>
        <button className="btn btn-light me-2" onClick={profilePage}>
          Profile page
        </button>
        <button className="btn-light btn" onClick={logout}>
          Log out
        </button>
      </div>
      <div style={{ padding: 10 }}>
        {addNewGame === 'false' ? (
          <Collection setAddNewGame={setAddNewGame} />
        ) : (
          <button className="btn btn-dark" onClick={() => setAddNewGame('false')}>
            Add new game
          </button>
        )}
      </div>
      <Games />
    </main>
  );
};

export default Content;
