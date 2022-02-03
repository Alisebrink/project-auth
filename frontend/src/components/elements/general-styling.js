import styled from 'styled-components';

export const MainWindow = styled.div`
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  width:100%;
`;

export const Warning = styled.p`
  color: red;
  font-size: 12px;
  font-style: italic;
  margin:10px 0px;
`;

export const TopTextBox = styled.div`
  width: 100%;
  padding: 5px;
  font-size: 10px;
  text-align: center;
  top: 0;
  position: relative;
  background: #D9534F;
  color: white;
`;

export const Logout = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 5px 15px;
  border-radius: 5px;
  border: none;
  color: black;
  background: #eeeeec;
  cursor: pointer;
  :hover {
    background: lightgrey;
    transition: 0.2s;
  }
`;

export const TextLink = styled.p`
  text-decoration: underline;
  cursor: pointer;
  :hover {
    color: #fc4f4f;
  }
`;

export const FilterSearchAndAddGame = styled.div`
  background: #FAFAFA;
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;
