import React from 'react';
import { useDispatch } from 'react-redux';

import user from 'reducers/user';

// This sets accessToken, userId and username to local storage
const LocalStorage = () => {
  
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username')

  if (accessToken) {
    dispatch(user.actions.setAccessToken(accessToken));
    dispatch(user.actions.setUserId(userId));
    dispatch(user.actions.setUsername(username));
  }
  return <></>;
};

export default LocalStorage;
