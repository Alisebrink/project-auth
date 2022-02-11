import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { API_URL } from 'utils/urls';

// Using swal for the alert
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
    // Using swal for the alert
    swal({
      title: 'Are you sure?',
      text: 'Do you really want to delete this game from your collection?',
      icon: 'warning',
      buttons: {
        confirm: { text: 'Yes', result: true, closeModal: true, value: true, visible: true },
        cancel: { text: 'Cancel', result: false, closeModal: true, value: null, visible: true },
      },
    })
      .then((result) => {
        if (result) {
          swal(`Poof! You've deleted your game!`, { icon: 'success' });
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
        }
      })
      .then(() => window.location.reload(false));
  };
  return (
    <>
      {oneGame === undefined ? (
        <div className="row container-fluid white">
          <p>The game couldn't render properly, try again!</p>
          <Link to="/">Go back</Link>
        </div>
      ) : (
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
            <h2 className="color">{oneGame?.game?.name}</h2>
            <p>
              <span className="color">Genre: </span>
              {oneGame?.game?.genre}
            </p>
            <p>
              <span className="color">Type of game: </span>
              {oneGame?.game?.typeOfGame}
            </p>
            <p>
              <span className="color">For ages: </span>
              {oneGame?.game?.forAge} +
            </p>
            <p>
              <span className="color">Estimated playtime: </span>
              {oneGame?.game?.gameTime} minutes
            </p>
            <p>
              <span className="color">Number of players: </span>
              {oneGame?.game?.numberOfPlayers}
            </p>
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
    </>
  );
};

export default GetOneGame;
