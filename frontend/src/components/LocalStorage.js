import React from 'react';
import { useDispatch } from 'react-redux';

import user from 'reducers/user';

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
