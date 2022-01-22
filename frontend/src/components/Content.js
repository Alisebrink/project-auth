import React, { useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import user from '../reducers/user';

import Collection from './Collection';

const Content = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));
      console.log('User sucessfully logged out')
    });
  };

  useEffect(() => {
    if (!accessToken) {
      navigate('/signin');
    }
  }, [accessToken, navigate]);

  return (
    <main>
      <h1>This is what you see once you are logged in</h1>
      <Collection />
      <button>
        <Link to="/" onClick={logout}>
          Log out
        </Link>
      </button>
    </main>
  );
};

export default Content;
