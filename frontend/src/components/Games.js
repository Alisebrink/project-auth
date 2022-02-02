import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from 'utils/urls';
import { useNavigate } from 'react-router-dom';

const Games = () => {
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
      fetch(API_URL('game/'), options)
        .then((res) => res.json())
        .then((data) => setAllGames(data));
    }
  }, [accessToken]);

  return (
    <>
      <p>Alla dina spel</p>
      {allGames?.map((game) => (
        <div key={game._id}>
          <p>Name: {game.game.name}</p>
          <p>Genre: {game.game.genre}</p>
          <button onClick={() => navigate(`/game/${game._id}`)}>See details</button>
        </div>
      ))}
    </>
  );
};
export default Games;
