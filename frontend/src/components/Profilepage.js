import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, batch } from 'react-redux';

import { API_URL } from 'utils/urls';

import styled from 'styled-components';
const Heading = styled.h1`
  font-size: 1rem;
  margin: 0;

  @media (min-width: 599px) {
    font-size: 1.5rem;
  }
`;

const Profilepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector((store) => store.user.accessToken);
  const user = useSelector((store) => store.user);
  const userId = useSelector((store) => store.user.userId);

  const [userInfo, setUserInfo] = useState([]);

  console.log(userInfo?.response?.username);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accessToken: accessToken,
      },
    };
    if (accessToken) {
      fetch(API_URL(`user/${userId}`), options)
        .then((res) => res.json())
        .then((data) => setUserInfo(data));
    }
  }, [accessToken, userId]);

  const logout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));
      dispatch(user.actions.setUserId(null));
      navigate('/');
      console.log('User sucessfully logged out');
    });
  };

  return (
    <main className="bg-white shadow-lg rounded">
      <div className="gradient p-2 d-flex flex-row align-items-center sticky-top">
        <Heading className="text-light flex-grow-1">
          Profile page: {userInfo?.response?.username}
        </Heading>
        <button className="btn btn-light me-2" onClick={() => navigate('/')}>
          Go back
        </button>
        <button className="btn-light btn" onClick={logout}>
          Log out
        </button>
      </div>
      <div className="container-fluid p-1 p-md-3">
          <img
            className="col-12 col-md-6"
            src="https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png"
            alt="Anonymous"
          />
          <div className="col-12 col-md-6 p-1 p-md-3">
            <p>
              Name: {userInfo?.response?.firstname} {userInfo?.response?.lastname}
            </p>
            <p>Email: {userInfo?.response?.email}</p>
          </div>
        </div>
    </main>
  );
};

export default Profilepage;
