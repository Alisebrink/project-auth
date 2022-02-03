import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background: #96CEB4;
  color: white;
  top: 0;
  position: fixed;
  width: 100%;
  text-align: center;
  padding: 5px;
`;

const Header = () => {
  return (
    <StyledHeader>
      Welcome to your board game management system
    </StyledHeader>
  );
};

export default Header;
