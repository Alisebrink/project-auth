import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from 'utils/urls';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


import { Button, Card } from 'react-bootstrap';

// setting pointer and shadow for the cards
const Game = styled.div`
  border: 1px solid #eeeeec;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  :hover {
    transition: 0.5s;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  }
`;

const Games = ({setLoadingPage}) => {
  const [allGames, setAllGames] = useState([]);

  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accessToken: accessToken,
      },
    };
    if (accessToken) {
      setLoadingPage(true);
      fetch(API_URL('game/'), options)
        .then((res) => res.json())
        .then((data) => setAllGames(data))
        .finally(() => setLoadingPage(false));
    }
  }, [accessToken, setLoadingPage]);

  return (
    <div className="container d-flex flex-wrap p-0">
      {allGames?.map((game) => (
        <div key={game?._id} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-1 p-md-2">
          <Game
            className="p-2 p-md-2 rounded white"
            onClick={() => navigate(`/game/${game?._id}`)}
          >
            <Card.Img
              variant="top"
              className="img-fluid"
              src={
                game?.image?.imageUrl ??
                'https://media.istockphoto.com/photos/components-of-board-games-on-light-blue-background-flat-lay-space-for-picture-id1317588344?b=1&k=20&m=1317588344&s=170667a&w=0&h=pL4NY2xzoSocpmrk1N4CFWqF9bnIXtMIW96gfZWZDKA='
              }
              alt="gloomhaven"
            />
            <h6 className="m-2 m-md-1">{game?.game?.name}</h6>
            <Card.Text text-muted className="m-2 m-md-1">{game?.game?.typeOfGame}</Card.Text>
            <Button className="m-2 m-md-1" variant="dark" onClick={() => navigate(`/game/${game?._id}`)}>
              Details
            </Button>
          </Game>
        </div>
      ))}
    </div>
  );
};
export default Games;
