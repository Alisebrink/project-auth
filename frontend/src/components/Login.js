import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../utils/urls';
import user from '../reducers/user';

import { LoginForm, FormLabel, FormInput, FormButton } from './elements/form'
import { MainWindow, TopTextBox, Warning, TextLink } from './elements/general-styling';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signin');

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector((store) => store.user.error);

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
      body: JSON.stringify({ username, password }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(null));
          });
        } else {
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setError(data.response));
        }
      });
  };

  return (
    <MainWindow>
      <TopTextBox>{mode === 'signin' ? <h1>Login</h1> : <h1>Create user</h1>}</TopTextBox>
      {mode === 'signup' ? (
        <div>
          <LoginForm onSubmit={onFormSubmit}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <FormInput
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormLabel htmlFor="password">
              Password {errors && <Warning>Please enter a password!</Warning>}
            </FormLabel>
            <FormInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormButton disabled={username.length < 5} className="login" type="submit">
              Create user
            </FormButton>

            {username.length < 5 ? (
              <Warning>Your username needs to be longer than 5 characters!</Warning>
            ) : (
              <p></p>
            )}
          </LoginForm>

          <p>
            Already have a user?&nbsp;
            <TextLink onClick={() => setMode('signin')}>Login here</TextLink>
          </p>
        </div>
      ) : (
        <div>
          <LoginForm onSubmit={onFormSubmit}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <p>{errors && <Warning>Please enter a username!</Warning>}</p>
            <FormInput
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormLabel htmlFor="password">
              Password 
            </FormLabel>
            <p>{errors && <Warning>Please enter a password!</Warning>}</p>
            <FormInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormButton disabled={username.length < 5} className="login" type="submit">
              Login
            </FormButton>
            {username.length < 5 ? (
              <Warning>Your username needs to be longer than 5 characters!</Warning>
            ) : (
              <p></p>
            )}
          </LoginForm>
          <p>
            Don't have a user?&nbsp;
            <TextLink onClick={() => setMode('signup')}>Create one here</TextLink>
          </p>
        </div>
      )}
    </MainWindow>
  );
};

export default Login;
