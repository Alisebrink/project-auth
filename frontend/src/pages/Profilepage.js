import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { API_URL } from 'utils/urls';

import Header from '../components/Header';

const Profilepage = () => {
  const navigate = useNavigate();

  const accessToken = useSelector((store) => store.user.accessToken);
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

  return (
    <main className="rounded set-height">
      <Header />
      <div className="container-fluid container-md p-5 d-flex bg-light shadow mt-2 mt-md-5">
        <div className="row p-0">
          <img
            className="col-12 col-sm-6"
            src="https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png"
            alt="Anonymous"
          />
          <div className="col-12 col-sm-6 p-4 p-md-0 ps-0 ps-md-3">
            <h3 className="color">
              {userInfo?.response?.firstname} {userInfo?.response?.lastname}
            </h3>
            <p>Email: {userInfo?.response?.email}</p>
            <button className="btn orange" onClick={() => navigate('/')}>
              Go back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profilepage;
