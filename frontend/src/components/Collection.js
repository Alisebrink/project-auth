import React, { useState } from 'react';
import { useDispatch, batch, useSelector } from 'react-redux';

import { API_URL } from '../utils/urls';
import collection from '../reducers/collection';

const Collection = () => {
  const [genre, setGenre] = useState('');
  const [name, setName] = useState('');
  const [typeOfGame, setTypeOfGame] = useState('');
  const [forAge, setForAge] = useState('');

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  // const errors = useSelector((store) => store.user.error);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accessToken': accessToken
      },
      body: JSON.stringify({ genre, name, typeOfGame, forAge }),
    };

    fetch(API_URL('game'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(collection.actions.setGenre(data.response.genre));
            dispatch(collection.actions.setName(data.response.name));
            dispatch(collection.actions.setTypeOfGame(data.response.typeOfGame));
            dispatch(collection.actions.setForAge(data.response.forAge));
            dispatch(collection.actions.setError(null));
          });
        } else {
          dispatch(collection.actions.setGenre(null));
          dispatch(collection.actions.setName(null));
          dispatch(collection.actions.setTypeOfGame(null));
          dispatch(collection.actions.setForAge(null));
          dispatch(collection.actions.setError(data.response));
        }
      });
  };

  return (
    <main>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="gamename">Game name </label>
        <input id="gamename" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="genre">Genre of game:</label>
        <input id="genre" type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        <label htmlFor="typeofgame">Type of game:</label>
        <select
          id="typeofgame"
          name="typeofgame"
          value={typeOfGame}
          onChange={(e) => {console.log(e); setTypeOfGame(e.target.value);}}
        >
          <option disable="true">Please choose</option>
          <option value="boardgame">Boardgame</option>
          <option value="cardgame">Cardgame</option>
        </select>
        <label htmlFor="forage">For ages:</label>
        <input
          id="forage"
          type="number"
          value={forAge}
          onChange={(e) => setForAge(e.target.value)}
        />
        <button type="submit">Add game</button>
      </form>
    </main>
  );
};

export default Collection;
