import React from 'react';
import styled from 'styled-components'

const StyledFooter = styled.footer `
background:#96CEB4;
color:white;
bottom:0;
position:fixed;
width:100%;
text-align:center;
padding:5px;
`

const Footer = () => {
  return <StyledFooter>This application was made by <a href="https://linneaisebrink.se">Linnea Isebrink</a></StyledFooter>;
};

export default Footer;
