import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { API_URL } from 'utils/urls';
import swal from 'sweetalert';

const GetOneGame = ({ setLoadingPage, setEditGame }) => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const { id } = useParams();

  const [oneGame, setOneGame] = useState();

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
  return (
    <>
      {oneGame === undefined ? (
        <div className="row container-fluid white">
          <p>The game couldn't render properly, try again!</p>
          <Link to="/">Go back</Link>
        </div>
      ) : (
        <div className="p-3 p-md-5 mt-3 mt-md-5 shadow white">
          <div className="row">
            <img
              className="col-12 col-lg-6 p-0"
              src={
                oneGame?.image?.imageUrl ??
                'https://media.istockphoto.com/photos/components-of-board-games-on-light-blue-background-flat-lay-space-for-picture-id1317588344?b=1&k=20&m=1317588344&s=170667a&w=0&h=pL4NY2xzoSocpmrk1N4CFWqF9bnIXtMIW96gfZWZDKA='
              }
              alt={oneGame?.image?.imageUrl}
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
        </div>
      )}
    </>
  );
};

export default GetOneGame;
