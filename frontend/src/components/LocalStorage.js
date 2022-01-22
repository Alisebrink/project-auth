import React from 'react';
import { useDispatch } from 'react-redux';

import user from 'reducers/user';

const LocalStorage = () => {
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    dispatch(user.actions.setAccessToken(accessToken));
  }
  return <></>;
};

export default LocalStorage;
