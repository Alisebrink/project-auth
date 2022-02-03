import React, { useState } from 'react';
import { useDispatch, batch, useSelector } from 'react-redux';

import { API_URL } from '../utils/urls';
import collection from '../reducers/collection';
import { AddNewForm, FormInput, FormLabel, FormButton, FormSelect } from './elements/form';

const Collection = ({ setAddNewGame }) => {
  const [genre, setGenre] = useState('');
  const [name, setName] = useState('');
  const [typeOfGame, setTypeOfGame] = useState('');
  const [forAge, setForAge] = useState('0');
  const [gameTime, setGameTime] = useState('0');
  const [numberOfPlayers, setNumberOfPlayers] = useState('');

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  // const errors = useSelector((store) => store.user.error);

  const onFormSubmit = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accessToken: accessToken,
      },
      body: JSON.stringify({ genre, name, typeOfGame, gameTime, numberOfPlayers, forAge }),
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
    <div>
      <AddNewForm onSubmit={onFormSubmit}>
        <FormLabel htmlFor="gamename">Name</FormLabel>
        <FormInput
          id="gamename"
          name="gamename"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormLabel htmlFor="genre">Genre</FormLabel>
        <FormSelect id="genre" name="genre" onChange={(e) => setGenre(e.target.value)}>
          <option disable="true">Choose genre</option>
          <option value="Party game">Party game</option>
          <option value="Family game">Family game</option>
          <option value="Strategy">Strategy</option>
          <option value="Strategy">Cooperative strategy</option>
        </FormSelect>

        <FormLabel htmlFor="typeofgame">Type of game</FormLabel>
        <FormSelect id="typeofgame" name="typeofgame" onChange={(e) => setTypeOfGame(e.target.value)}>
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
        </FormSelect>
        <FormLabel htmlFor="forage">For ages</FormLabel>
        <FormInput
          id="forage"
          name="forage"
          type="number"
          value={forAge}
          onChange={(e) => setForAge(e.target.value)}
        />
        <FormLabel htmlFor="gametime">Estimated gametime (minutes)</FormLabel>
        <FormInput
          id="gametime"
          name="gametime"
          type="number"
          value={gameTime}
          onChange={(e) => setGameTime(e.target.value)}
        />
        <FormLabel htmlFor="numberofplayers">Number of players</FormLabel>
        <FormInput
          id="numberofplayers"
          name="numberofplayers"
          type="text"
          value={numberOfPlayers}
          onChange={(e) => setNumberOfPlayers(e.target.value)}
        />
        <div><FormButton className="no-margin-left" onClick={() => setAddNewGame('false')} type="submit">
          Add game
        </FormButton>
        <FormButton onClick={() => setAddNewGame('false')}>
          Go back
        </FormButton></div>
        
      </AddNewForm>
    </div>
  );
};

export default Collection;
