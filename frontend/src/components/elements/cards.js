import styled from 'styled-components';

export const AllGames = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: calc(100% - 20px);
  margin: 0 auto;
  align-content: flex-start;
`;
export const OneGame = styled.div`
  border: 1px #eeeeec solid;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const OneGameLink = styled.a`
  cursor: pointer;
  width: 100%;
  @media (min-width: 599px) {
    width: calc(33.33% - 7px);
  }
  @media (min-width: 768px) {
    width: calc(20% - 8px);
  }
`;

export const CardButton = styled.button`
  width: 100%;
  border: none;
  padding: 5px 0px;
  cursor: pointer;
  bottom: 0px;
  position: absolute;
  :hover {
    transition: 0.2s;
    background: lightgrey;
  }
`;

export const GameName = styled.h2`
  text-align: center;
  margin: 5px 20px;
  font-size: 16px;
  width: 100%;
`;

export const OneGameImgAndName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  margin-bottom: 30px;
`;
