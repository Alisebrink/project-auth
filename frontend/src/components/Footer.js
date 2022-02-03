import React from 'react';
import styled from 'styled-components'

const StyledFooter = styled.footer `
background:#FFBC80;
color:black;
bottom:0;
position:absolute;
width:100%;
text-align:center;
padding:5px;
`

const Footer = () => {
  return <StyledFooter>This application was made by <a href="https://linneaisebrink.se">Linnea Isebrink</a></StyledFooter>;
};

export default Footer;
