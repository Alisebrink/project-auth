import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, batch, useSelector } from 'react-redux';

import logoutArrow from '../assets/box-arrow-left.svg';
import profileIcon from '../assets/person-fill.svg';
import dice from '../assets/white-dice.svg';

import user from '../reducers/user';

const Header = () => {
  const userId = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setUserId(null));
      dispatch(user.actions.setAccessToken(null));
      navigate('/');
    });
  };

  const profilePage = () => {
    navigate(`/user/${userId}`);
  };

  return (
    <nav className="navbar shadow p-2 gradient w-100 container-fluid d-inline-blog align-text-top sticky-top">
      <div className="d-flex f-direction-row flex-grow-1">
        <img
          className="align-text-top logo me-3"
          src={dice}
          alt="Logo"
          onClick={() => navigate('/')}
        />
        <p className="m-0 align-self-center light mobile" onClick={() => navigate('/')}>
          Board game management system
        </p>
      </div>
      {accessToken ? (
        <>
          <button className="btn btn-light me-2" onClick={profilePage}>
            <img className="icon" src={profileIcon} alt="Log out" />
          </button>
          <button className="btn-light btn" onClick={logout}>
            <img className="icon" src={logoutArrow} alt="Log out" />
          </button>
        </>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Header;
