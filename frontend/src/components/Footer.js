import React from 'react';
import { Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar bg="dark" fixed="bottom" variant="dark">
      <Navbar.Brand className="text-center d-block w-100" href="https://linneaisebrink.se">
        Made by Linnea Isebrink
      </Navbar.Brand>
    </Navbar>
  );
};

export default Footer;
