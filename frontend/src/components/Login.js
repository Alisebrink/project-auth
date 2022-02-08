import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../utils/urls';
import user from '../reducers/user';
import styled from 'styled-components';

import swal from 'sweetalert';

const Heading = styled.h1`
  font-size: 1rem;
  margin: 0;

  @media (min-width: 599px) {
    font-size: 1.5rem;
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState('signin');

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

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
          });
          if (mode === 'signin') {
            swal(`You've sucessfully logged in!`, { icon: 'success', button: 'Ok' });
          } else if (mode === 'signup') {
            swal(`You've created your user ${username}!`, { icon: 'success', button: 'Ok' });
          }
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
    <main className="bg-white shadow-lg rounded m-2 m-sm-0">
      <div className="gradient p-2">
        {mode === 'signin' ? (
          <Heading className="text-light">Login</Heading>
        ) : (
          <Heading className="text-light">Create user</Heading>
        )}
      </div>
      {mode === 'signup' ? (
        <div className="container col-12 col-md-4 p-3">
          <form onSubmit={onFormSubmit}>
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
            <p className="link-danger" onClick={() => setMode('signin')}>
              Login here
            </p>
          </p>
        </div>
      ) : (
        <div className="container col-12 col-md-4 p-3">
          <form onSubmit={onFormSubmit}>
            <div>
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                className="form-control"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label mt-3" htmlFor="password">
                Password
              </label>
              <input
                className="form-control"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn orange mt-3 mb-3" disabled={username.length < 5} type="submit">
              Login
            </button>
          </form>
          <p>
            Don't have a user?&nbsp;
            <p className="link-danger" onClick={() => setMode('signup')}>
              Create one here
            </p>
          </p>
        </div>
      )}
    </main>
  );
};

export default Login;
