import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../utils/urls';
import user from '../reducers/user';

import { LoginForm, FormLabel, FormInput, FormButton } from './elements/form';
import { MainWindow, TopTextBox, TextLink } from './elements/general-styling';

import swal from 'sweetalert';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
          if (mode === 'signin') {
            swal(`You've sucessfully logged in!`, { icon: 'success', button: 'Ok' });
          } else if (mode === 'signup') {
            swal(`You've created your user ${username}!`, { icon: 'success', button: 'Ok' });
          }
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
            <FormLabel htmlFor="username">Create username</FormLabel>
            <FormInput
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormLabel htmlFor="password">Create password</FormLabel>
            <FormInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormButton disabled={username.length < 5} className="login" type="submit">
              Create user
            </FormButton>
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
            <FormInput
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormButton disabled={username.length < 5} className="login" type="submit">
              Login
            </FormButton>
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
