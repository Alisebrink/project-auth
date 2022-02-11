import React, { useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import { API_URL } from '../utils/urls';

import user from '../reducers/user';

import swal from 'sweetalert';

export const SignIn = ({ mode, setMode }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setError(null));
            if (mode === 'signin') {
              swal(`You've sucessfully logged in!`, { icon: 'success', button: 'Ok' });
            }
          });
        } else {
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setError(data.response));
        }
      });
  };

  return (
    <>
      <div className="container col-12 col-lg-4 col-xl-3 p-3 p-md-5 mt-3 mt-md-5 shadow white">
        <form onSubmit={onFormSubmit}>
          <h4 className="color">Login</h4>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              id="floatingInput"
              type="text"
              value={username}
              placeholder="name@example.com"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="form-label" htmlFor="floatingInput">
              Username
            </label>
          </div>
          <div className="form-floating">
            <input
              placeholder="Password"
              className="form-control"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
          </div>

          <button className="btn orange mt-3 mb-3" disabled={username.length < 5} type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have a user?&nbsp;
          <span className="link-danger" onClick={() => setMode('signup')}>
            Create one here
          </span>
        </p>
      </div>
    </>
  );
};
