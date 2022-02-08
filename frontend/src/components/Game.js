import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from 'utils/urls';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, batch } from 'react-redux';
import collection from '../reducers/collection';
import user from '../reducers/user';

import LoadingItem from './Loading';

import styled from 'styled-components';
import swal from 'sweetalert';
import gloomhaven from '../assets/gloomhaven.png';

const Heading = styled.h1`
  font-size: 1rem;
  margin: 0;

  @media (min-width: 599px) {
    font-size: 1.5rem;
  }
`;

const Game = () => {
  const [oneGame, setOneGame] = useState();
  const [editGame, setEditGame] = useState('false');

  const [loadingPage, setLoadingPage] = useState(false);

  const [genre, setGenre] = useState('');
  const [name, setName] = useState('');
  const [typeOfGame, setTypeOfGame] = useState('');
  const [forAge, setForAge] = useState('0');
  const [gameTime, setGameTime] = useState('0');
  const [numberOfPlayers, setNumberOfPlayers] = useState('');

  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  // const fileInput = useRef();
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
      setLoadingPage(true);
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
        })
        .finally(() => setLoadingPage(false));
    }
  }, [accessToken, id]);

  const deleteGame = () => {
    swal({
      title: 'Are you sure?',
      text: 'Do you really want to delete this game from your collection?',
      icon: 'warning',
      buttons: {
        confirm: { text: 'Yes', result: true, closeModal: true, value: true, visible: true },
        cancel: { text: 'Cancel', result: false, closeModal: true, value: null, visible: true },
      },
    }).then((result) => {
      if (result) {
        swal(`Poof! You've deleted your game!`, { icon: 'success' });
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
    });
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

  const logout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));
      navigate('/');
      console.log('User sucessfully logged out');
    });
  };

  return (
    <div className="bg-white shadow-lg rounded max-height">
      <div className="gradient p-2 d-flex flex-row align-items-center">
        <Heading className="text-light flex-grow-1">{oneGame?.game.name}</Heading>
        <button className="btn-light btn" onClick={logout}>
          Log out
        </button>
      </div>
      {loadingPage && <LoadingItem />}
      <div>
        {editGame === 'false' ? (
          <div className="d-flex p-3">
            {oneGame === undefined ? (
              <div className="row container-fluid">
                <p>The game couldn't render properly, try again!</p>
                <Link to="/">Go back</Link>
              </div>
            ) : (
              <div className="row container-fluid g-0">
                <img
                  className="col-12 col-lg-6"
                  src={
                    oneGame?.image?.imageUrl ??
                    'https://media.istockphoto.com/photos/components-of-board-games-on-light-blue-background-flat-lay-space-for-picture-id1317588344?b=1&k=20&m=1317588344&s=170667a&w=0&h=pL4NY2xzoSocpmrk1N4CFWqF9bnIXtMIW96gfZWZDKA='
                  }
                  alt={gloomhaven}
                />
                <div className="col-12 col-lg-6 mt-3 mt-lg-0 p-md-3 p-1">
                  <h2>{oneGame?.game?.name}</h2>
                  <p>Genre: {oneGame?.game?.genre}</p>
                  <p>Type of game: {oneGame?.game?.typeOfGame}</p>
                  <p>Number of players: {oneGame?.game?.numberOfPlayers}</p>
                  <p>For ages: {oneGame?.game?.forAge} +</p>
                  <p>Estimated playtime: {oneGame?.game?.gameTime} minutes</p>
                  <div>
                    <button className="btn orange me-2" onClick={deleteGame}>
                      Delete
                    </button>
                    <button className="btn orange me-2" onClick={() => setEditGame('true')}>
                      Edit
                    </button>
                    <button className="btn orange" onClick={() => navigate('/')}>
                      Go back
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="d-flex flex-wrap p-3">
            <img
              className="col-12 col-lg-6"
              src={
                oneGame?.image?.imageUrl ??
                'https://media.istockphoto.com/photos/components-of-board-games-on-light-blue-background-flat-lay-space-for-picture-id1317588344?b=1&k=20&m=1317588344&s=170667a&w=0&h=pL4NY2xzoSocpmrk1N4CFWqF9bnIXtMIW96gfZWZDKA='
              }
              alt={gloomhaven}
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
                  <button
                    className="me-2 btn orange"
                    onClick={() => setEditGame('true')}
                    type="submit"
                  >
                    Update game
                  </button>
                  <button className="btn orange" onClick={() => navigate(`/game/${id}`)}>
                    Go back
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
