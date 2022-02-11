import React, { useState } from 'react';
import { useDispatch, batch } from 'react-redux';

import { API_URL } from '../utils/urls';
import swal from 'sweetalert';

import user from '../reducers/user';

export const SignUp = ({ mode, setMode }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, firstname, lastname, email }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setFirstname(data.response.firstname));
            dispatch(user.actions.setLastname(data.response.lastname));
            dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
            if (mode === 'signup') {
              swal(`You've created your user ${username}!`, { icon: 'success', button: 'Ok' });
            }
          });
        } else {
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setFirstname(null));
          dispatch(user.actions.setLastname(null));
          dispatch(user.actions.setEmail(null));
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setError(data.response));
        }
      });
  };
  return (
    <>
      <div className="container col-12 col-md-4 p-3 p-md-5 mt-3 mt-md-5 shadow white">
        <form onSubmit={onFormSubmit}>
          <h4 className="color">Create a user</h4>
          <div className="row">
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="firstname">
                First name
              </label>
              <input
                className="form-control mb-3"
                id="firstname"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="lastname">
                Last name
              </label>
              <input
                className="form-control mb-3"
                id="lastname"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-control mb-3"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              className="form-control mb-3"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-control mb-3"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button disabled={username.length < 5} className="btn orange mb-3" type="submit">
            Create user
          </button>
        </form>

        <p>
          Already have a user?&nbsp;
          <span className="link-danger" onClick={() => setMode('signin')}>
            Login here
          </span>
        </p>
      </div>
    </>
  );
};
