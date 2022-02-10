import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Imports components into the page
import Header from '../components/Header';
import { SignUp } from 'components/SignUp';
import { SignIn } from 'components/SignIn';

const Login = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  firstname,
  setFirstname,
  lastname,
  setLastname,
}) => {
  const navigate = useNavigate();

  const accessToken = useSelector((store) => store.user.accessToken);
  const userId = useSelector((store) => store.user.userId);
  
  const [mode, setMode] = useState('signin');

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, [accessToken, navigate]);

  return (
    <main className="set-height bg-light">
      <Header />
      {mode === 'signup' ? (
        <SignUp
          username={username}
          setUsername={setUsername}
          firstname={firstname}
          setFirstname={setFirstname}
          lastname={lastname}
          setLastname={setLastname}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          mode={mode}
          setMode={setMode}
        />
      ) : (
        <SignIn
          username={username}
          setUsername={setUsername}
          mode={mode}
          setMode={setMode}
          userId={userId}
        />
      )}
    </main>
  );
};

export default Login;
