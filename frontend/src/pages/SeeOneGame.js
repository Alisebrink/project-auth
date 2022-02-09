import React, { useState } from 'react';
import LoadingItem from '../components/Loading';

import Header from '../components/Header';
import PatchOneGame from 'components/PatchOneGame';
import FetchOneGame from 'components/FetchOneGame';

const Game = ({
  name,
  setName,
  genre,
  setGenre,
  forAge,
  setForAge,
  gameTime,
  setGameTime,
  typeOfGame,
  setTypeOfGame,
  numberOfPlayers,
  setNumberOfPlayers,
  oneGame,
  setOneGame
}) => {

  const [editGame, setEditGame] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  return (
    <div className="set-height bg-light">
      <Header />
      {loadingPage && <LoadingItem />}
      <div className="container">
        {editGame === false ? (
          <FetchOneGame
            setLoadingPage={setLoadingPage}
            setEditGame={setEditGame}
          />
        ) : (
          <PatchOneGame
            name={name}
            setName={setName}
            genre={genre}
            setGenre={setGenre}
            forAge={forAge}
            setForAge={setForAge}
            gameTime={gameTime}
            setGameTime={setGameTime}
            typeOfGame={typeOfGame}
            setTypeOfGame={setTypeOfGame}
            numberOfPlayers={numberOfPlayers}
            setNumberOfPlayers={setNumberOfPlayers}
            setLoadingPage={setLoadingPage}
            oneGame={oneGame}
            setOneGame={setOneGame}
          />
        )}
      </div>
    </div>
  );
};

export default Game;
