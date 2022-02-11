import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import collection from '../reducers/collection';

import { API_URL } from '../utils/urls';

const PatchOneGame = ({ setEditGame, setLoadingPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [oneGame, setOneGame] = useState();

  const [genre, setGenre] = useState('');
  const [name, setName] = useState('');
  const [typeOfGame, setTypeOfGame] = useState('');
  const [forAge, setForAge] = useState('');
  const [gameTime, setGameTime] = useState('');
  const [numberOfPlayers, setNumberOfPlayers] = useState('');

  const accessToken = useSelector((store) => store.user.accessToken);

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
          setNumberOfPlayers(data.game.numberOfPlayers);
          setGameTime(data.game.gameTime);
          setForAge(data.game.forAge);
        })
    }
  }, [accessToken, id, setOneGame]);

  const updateGame = () => {

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        accessToken: accessToken,
      },
      body: JSON.stringify({ genre, name, typeOfGame, gameTime, numberOfPlayers, forAge }),
    };
    setLoadingPage(true)
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
      })
      .then(() => setEditGame(true))
      .finally(() => setLoadingPage(false))
  };
  return (
    <div className="d-flex flex-wrap p-3 white shadow mt-3 mt-md-5">
      <img
        className="col-12 col-lg-6"
        src={
          oneGame?.image?.imageUrl ??
          'https://media.istockphoto.com/photos/components-of-board-games-on-light-blue-background-flat-lay-space-for-picture-id1317588344?b=1&k=20&m=1317588344&s=170667a&w=0&h=pL4NY2xzoSocpmrk1N4CFWqF9bnIXtMIW96gfZWZDKA='
        }
        alt={oneGame?.image?.imageUrl}
      />
      <div className="col-12 col-lg-6 p-1 p-lg-3">
        <form onSubmit={updateGame}>
          <h4 className="color mt-2 mt-lg-0">Edit your game</h4>
          <div className="mb-md-3">
            <label className="form-label" htmlFor="gamename">
              Name
            </label>
            <input
              className="form-control mb-2 mb-md-0"
              id="gamename"
              name="gamename"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="row mb-md-3">
            <div className="col-md-6 col-12">
              <label className="form-label" htmlFor="genre">
                Genre
              </label>
              <select
                required
                className="form-select mb-2 mb-md-0"
                id="genre"
                name="genre"
                onChange={(e) => setGenre(e.target.value)}
              >
                <option selected>{genre}</option>
                <option value="Party game">Party game</option>
                <option value="Family game">Family game</option>
                <option value="Card game">Card game</option>
                <option value="Strategy">Strategy</option>
                <option value="Strategy">Cooperative strategy</option>
              </select>
            </div>

            <div className="col-md-6 col-12">
              <label className="form-label" htmlFor="typeofgame">
                Type of game
              </label>
              <select
                className="form-select mb-2 mb-md-0"
                id="typeofgame"
                name="typeofgame"
                onChange={(e) => setTypeOfGame(e.target.value)}
                required
              >
                <option selected>{typeOfGame}</option>
                <option value="Adventure">Adventure</option>
                <option value="Area control">Area control</option>
                <option value="Campaign/Legacy">Campaign/Legacy</option>
                <option value="City Building">City building</option>
                <option value="Deckbuilder">Deckbuilder</option>
                <option value="Drafting">Drafting</option>
                <option value="Dungeon crawler">Dungeon crawler</option>
                <option value="Push-your-luck">Push-your-luck</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Roll-and-move">Roll-and-move</option>
                <option value="Storytelling">Storytelling</option>
                <option value="Wargame">Wargame</option>
              </select>
            </div>
          </div>
          <div className="row mb-md-3">
            <div className="col-md-4 col-12">
              <label className="form-label" htmlFor="forage">
                For ages
              </label>
              <input
                className="form-control mb-2 mb-md-0"
                id="forage"
                name="forage"
                type="number"
                value={forAge}
                onChange={(e) => setForAge(e.target.value)}
                required
                min="1"
              />
            </div>

            <div className="col-md-4 col-12">
              <label className="form-label" htmlFor="gametime">
                Estimated gametime
              </label>{' '}
              <input
                className="form-control mb-2 mb-md-0"
                id="gametime"
                name="gametime"
                type="number"
                value={gameTime}
                onChange={(e) => setGameTime(e.target.value)}
                required
                min="10"
              />
            </div>

            <div className="col-md-4 col-12">
              <label className="form-label" htmlFor="numberofplayers">
                Number of players
              </label>
              <input
                className="form-control mb-2 mb-md-0"
                id="numberofplayers"
                name="numberofplayers"
                type="text"
                value={numberOfPlayers}
                onChange={(e) => setNumberOfPlayers(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <button className="me-2 btn orange" type="submit">
              Update game
            </button>
            <button className="btn orange" onClick={() => navigate(`/game/${id}`)}>
              Go back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatchOneGame;
