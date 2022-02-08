import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from 'utils/urls';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import LoadingItem from './Loading';

import { Button, Card } from 'react-bootstrap';

const Game = styled.div`
  border: 1px solid #eeeeec;
  cursor: pointer;
  :hover {
    border: solid 1px grey;
    transition: 0.2s;
  }
`;

const Games = () => {
  const [allGames, setAllGames] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);

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
  }, [accessToken]);

  return (
    <div className="d-flex flex-wrap p-2 p-md-3">
      {loadingPage && <LoadingItem />}
      {allGames?.map((game) => (
        <Game
          className="rounded shadow-sm col-12 col-sm-6 col-md-3 col-lg-2 p-2 p-md-3"
          key={game._id}
          onClick={() => navigate(`/game/${game._id}`)}
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
          <Card.Title className="h6 h6-md mt-2">{game.game.name}</Card.Title>
          <Card.Text>{game.game.typeOfGame}</Card.Text>
          <Button
            variant="dark"
            className="float-end"
            onClick={() => navigate(`/game/${game._id}`)}
          >
            See details
          </Button>
        </Game>
      ))}
    </div>
  );
};
export default Games;
