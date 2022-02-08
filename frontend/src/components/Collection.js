import React, { useState, useRef } from 'react';
import { useDispatch, batch, useSelector } from 'react-redux';

import { API_URL } from '../utils/urls';
import collection from '../reducers/collection';

const Collection = ({ setAddNewGame }) => {
  const [genre, setGenre] = useState('');
  const [name, setName] = useState('');
  const [typeOfGame, setTypeOfGame] = useState('');
  const [forAge, setForAge] = useState('0');
  const [gameTime, setGameTime] = useState('0');
  const [numberOfPlayers, setNumberOfPlayers] = useState('');

  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();

  const fileInput = useRef();

  const onFormSubmit = () => {

    const formData = new FormData();

    formData.append('name', name);
    formData.append('genre', genre);
    formData.append('typeOfGame', typeOfGame);
    formData.append('gameTime', gameTime);
    formData.append('numberOfPlayers', numberOfPlayers);
    formData.append('forAge', forAge);
    formData.append('image', fileInput.current.files[0]);

    const options = {
      method: 'POST',
      headers: {
        accessToken: accessToken,
      },
      body: formData,
    };

    fetch(API_URL('game/'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(collection.actions.setGenre(data.response.genre));
            dispatch(collection.actions.setName(data.response.name));
            dispatch(collection.actions.setTypeOfGame(data.response.typeOfGame));
            dispatch(collection.actions.setForAge(data.response.forAge));
            dispatch(collection.actions.setNumberOfPlayers(data.response.numberOfPlayers));
            dispatch(collection.actions.setImage(data.response.image));
            dispatch(collection.actions.setGameTime(data.response.gameTime));
            dispatch(collection.actions.setError(null));
          });
        } else {
          dispatch(collection.actions.setGenre(null));
          dispatch(collection.actions.setName(null));
          dispatch(collection.actions.setTypeOfGame(null));
          dispatch(collection.actions.setForAge(null));
          dispatch(collection.actions.setImage(null));
          dispatch(collection.actions.setNumberOfPlayers(null));
          dispatch(collection.actions.setGameTime(null));
          dispatch(collection.actions.setError(data.response));
        }
      });
  };

  return (
    <div>
      <form onSubmit={onFormSubmit} className="p-1 p-md-3">
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
        <div className="mb-3">
          <label className="form-label" htmlFor="addimage">Add image</label>
          <input type="file" className="form-control" id="addimage" ref={fileInput} />
        </div>

        <div>
          <button
            className="btn btn-success me-2"
            onClick={() => setAddNewGame('false')}
            type="submit"
          >
            Add game
          </button>
          <button className="btn btn-warning" onClick={() => setAddNewGame('false')}>
            Go back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Collection;
