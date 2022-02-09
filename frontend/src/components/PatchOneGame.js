import { React, useState, useParams, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import collection from '../reducers/collection';

import { API_URL } from '../utils/urls';

const PatchOneGame = ({ setLoadingPage, setEditGame }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [oneGame, setOneGame] = useState();

  const [genre, setGenre] = useState('');
  const [name, setName] = useState('');
  const [typeOfGame, setTypeOfGame] = useState('');
  const [forAge, setForAge] = useState('0');
  const [gameTime, setGameTime] = useState('0');
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
      setLoadingPage(true);
      fetch(API_URL(`game/${id}`), options)
        .then((res) => res.json())
        .then((data) => {
          setOneGame(data);
        })
        .finally(() => setLoadingPage(false));
    }
  }, [accessToken, id, setLoadingPage, setOneGame]);

  const updateGame = () => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        accessToken: accessToken,
      },
      body: JSON.stringify({ genre, name, typeOfGame, gameTime, numberOfPlayers, forAge }),
    };

    fetch(API_URL(`game/${id}`), options);
    setLoadingPage(true)
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
      .finally(() => setLoadingPage(false));
  };
  return (
    <div className="d-flex flex-wrap p-3">
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
            />
          </div>
          <div className="row mb-md-3">
            <div className="col-md-6 col-12">
              <label className="form-label" htmlFor="genre">
                Genre
              </label>
              <select
                className="form-select mb-2 mb-md-0"
                id="genre"
                name="genre"
                onChange={(e) => setGenre(e.target.value)}
              >
                <option selected>Choose genre</option>
                <option value="Party game">Party game</option>
                <option value="Family game">Family game</option>
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
              />
            </div>
          </div>
          <div>
            <button className="me-2 btn orange" onClick={() => setEditGame(true)} type="submit">
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
