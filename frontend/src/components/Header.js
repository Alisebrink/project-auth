import React from 'react';
import dice from '../assets/six_sided_dice_d6.svg';

const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img className="d-inline-block align-text-top logo" src={dice} alt="Logo" />
          &nbsp;&nbsp;&nbsp;Board game management system
        </a>
      </div>
    </nav>
  );
};

export default Header;
