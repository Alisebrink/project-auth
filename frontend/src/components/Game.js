import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from 'utils/urls';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, batch } from 'react-redux';
import collection from '../reducers/collection';

const Game = () => {
  const [oneGame, setOneGame] = useState();
  const [editGame, setEditGame] = useState('false');

  const [genre, setGenre] = useState('');
  const [name, setName] = useState('');
  const [typeOfGame, setTypeOfGame] = useState('');
  const [forAge, setForAge] = useState('0');
  const [gameTime, setGameTime] = useState('0');
  const [numberOfPlayers, setNumberOfPlayers] = useState('');

  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accessToken: accessToken,
      },
    };
    if (accessToken) {
      fetch(API_URL(`game/${id}`), options)
        .then((res) => res.json())
        .then((data) => {
          setOneGame(data);
          setName(data.game.name);
          setGenre(data.game.genre);
          setTypeOfGame(data.game.typeOfGame);
          setForAge(data.game.forAge);
          setGameTime(data.game.gameTime);
          setNumberOfPlayers(data.game.numberOfPlayers);
        });
    }
  }, [accessToken, id]);

  const deleteGame = () => {
    if (window.confirm('Do you really want to delete this game?')) {
      console.log(`You've deleted this game from the database`);
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          accessToken: accessToken,
        },
      };
      if (accessToken) {
        fetch(API_URL(`game/${id}`), options).then(navigate('/'));
      }
    } else {
      console.log(`You've chosen not to delete this object`);
    }
  };

  const updateGame = () => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        accessToken: accessToken,
      },
      body: JSON.stringify({ genre, name, typeOfGame, gameTime, numberOfPlayers, forAge }),
    };

    fetch(API_URL(`game/${id}`), options)
      .then((res) => res.json())
      .then((data) => {
        setOneGame(data.response);
        if (data.success) {
          batch(() => {
            dispatch(collection.actions.setGenre(data.response.genre));
            dispatch(collection.actions.setName(data.response.name));
            dispatch(collection.actions.setTypeOfGame(data.response.typeOfGame));
            dispatch(collection.actions.setForAge(data.response.forAge));
            dispatch(collection.actions.setNumberOfPlayers(data.response.numberOfPlayers));
            dispatch(collection.actions.setGameTime(data.response.gameTime));
            dispatch(collection.actions.setError(null));
          });
        } else {
          dispatch(collection.actions.setGenre(null));
          dispatch(collection.actions.setName(null));
          dispatch(collection.actions.setTypeOfGame(null));
          dispatch(collection.actions.setForAge(null));
          dispatch(collection.actions.setNumberOfPlayers(null));
          dispatch(collection.actions.setGameTime(null));
          dispatch(collection.actions.setError(data.response));
        }
      });
  };

  return (
    <main>
      {editGame === 'false' ? (
        <div>
          {oneGame === undefined ? (
            <div>
              <p>The game couldn't render properly, try again!</p>
              <Link to="/">Go back</Link>
            </div>
          ) : (
            <div>
              <h2>{oneGame?.game?.name}</h2>
              <p>Genre: {oneGame?.game?.genre}</p>
              <p>Type of game:{oneGame?.game?.typeOfGame}</p>
              <p>Number of players: {oneGame?.game?.numberOfPlayers}</p>
              <p>For ages: {oneGame?.game?.forAge} +</p>
              <p>Estimated playtime: {oneGame?.game?.gameTime} minutes</p>
              <button onClick={deleteGame}>Delete this object</button>
              <button onClick={() => setEditGame('true')}>Edit this game</button>
              <button onClick={() => navigate('/')}>Go back</button>
            </div>
          )}
        </div>
      ) : (
        <>
          <div>
            <h2>{oneGame?.game?.name}</h2>
            <p>Genre: {oneGame?.game?.genre}</p>
            <p>Type of game:{oneGame?.game?.typeOfGame}</p>
            <p>Number of players: {oneGame?.game?.numberOfPlayers}</p>
            <p>For ages: {oneGame?.game?.forAge} +</p>
            <p>Estimated playtime: {oneGame?.game?.gameTime} minutes</p>
          </div>
          <form onSubmit={updateGame}>
            <label htmlFor="gamename" placeholder={name}>
              Game name:{' '}
            </label>
            <input
              id="gamename"
              name="gamename"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="genre">Genre of game:</label>
            <select id="genre" name="genre" onChange={(e) => setGenre(e.target.value)}>
              <option disable="true">Choose genre</option>
              <option value="Party game">Party game</option>
              <option value="Family game">Family game</option>
              <option value="Strategy">Strategy</option>
              <option value="Strategy">Cooperative strategy</option>
            </select>

            <label htmlFor="typeofgame">Type of game: </label>
            <select
              id="typeofgame"
              name="typeofgame"
              onChange={(e) => setTypeOfGame(e.target.value)}
            >
              <option disable="true">Select type</option>
              <option value="Abstract">Abstract</option>
              <option value="Area control">Area control</option>
              <option value="Campaign/Legacy">Campaign/Legacy</option>
              <option value="Deckbuilder">Deckbuilder</option>
              <option value="Deck construction">Deck construction</option>
              <option value="Dexterity">Dexterity</option>
              <option value="Drafting">Drafting</option>
              <option value="Dungeon crawler">Dungeon crawler</option>
              <option value="Engine builder">Engine builder</option>
              <option value="Push-your-luck">Push-your-luck</option>
              <option value="Roll-and-move">Roll-and-move</option>
              <option value="Push-your-write">Push-your-write</option>
              <option value="Social deduction">Social deduction</option>
              <option value="Storytelling">Storytelling</option>
              <option value="Worker placement">Worker placement</option>
              <option value="Wargame">Wargame</option>
            </select>
            <label htmlFor="forage">For ages {forAge} and up:</label>
            <input
              id="forage"
              name="forage"
              type="number"
              value={forAge}
              onChange={(e) => setForAge(e.target.value)}
            />
            <label htmlFor="gametime">Estimated gametime:</label>
            <input
              id="gametime"
              name="gametime"
              type="number"
              value={gameTime}
              onChange={(e) => setGameTime(e.target.value)}
            />
            <label htmlFor="numberofplayers">Number of players:</label>
            <input
              id="numberofplayers"
              name="numberofplayers"
              type="text"
              value={numberOfPlayers}
              onChange={(e) => setNumberOfPlayers(e.target.value)}
            />
            <button onClick={() => setEditGame('true')} type="submit">
              Edit game
            </button>
            <button onClick={() => navigate(`/game/${id}`)}>Go back</button>
          </form>
        </>
      )}
    </main>
  );
};

export default Game;
