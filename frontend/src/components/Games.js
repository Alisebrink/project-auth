import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from 'utils/urls';
import { useNavigate } from 'react-router-dom';

import {
  AllGames,
  OneGame,
  CardButton,
  OneGameLink,
  GameName,
  OneGameImgAndName,
} from './elements/cards';

import gloomhaven from '../assets/gloomhaven.png';

//import Filtering from './Filtering';
//import Search from './Search';

// import collection from '../reducers/collection';

const Games = () => {
  const [allGames, setAllGames] = useState([]);
  //const [searchValue, setSearchValue] = useState('');
  //const [filter, setFilter] = useState('');

  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  // const dispatch = useDispatch();

  //   const search = () => {
  //     const options = {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           accessToken: accessToken,
  //         },
  //       };
  //       if (accessToken) {
  //         fetch(API_URL(`game/search/name=${searchValue}`), options)
  //           .then((res) => res.json())
  //           .then((data) => {if (data.success) {
  //                 console.log(data.response)
  //                 dispatch(collection.actions.setName(data.response))
  //                 dispatch(collection.actions.settError(null))
  //             } else {
  //                 dispatch(collection.actions.setName(null))
  //                 dispatch(collection.actions.settError(true))
  //             }})

  //       }
  //     }, [dispatch];

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
    <AllGames>
      {/* <Filtering setFilter={setFilter} filter={filter} />
      <Search search={search()} setSearchValue={setSearchValue} searchValue={searchValue} /> */}
      {allGames?.map((game) => (
        <OneGameLink onClick={() => navigate(`/game/${game._id}`)}>
          <OneGame key={game._id}>
            <OneGameImgAndName>
              <img src={gloomhaven} alt="gloomhaven" />
              <GameName>{game.game.name}</GameName>
            </OneGameImgAndName>

            <CardButton onClick={() => navigate(`/game/${game._id}`)}>See details</CardButton>
          </OneGame>
        </OneGameLink>
      ))}
    </AllGames>
  );
};
export default Games;
