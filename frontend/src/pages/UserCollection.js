import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Imports components into the page
import PostOneGame from '../components/PostOneGame';
import LoadAllGames from '../components/LoadAllGames';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingItem from '../components/Loading';

const UserCollection = ({ allGames, setAllGames }) => {
  const navigate = useNavigate();

  const accessToken = useSelector((store) => store.user.accessToken);

  const [addNewGame, setAddNewGame] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      navigate('/signin');
    }
  }, [accessToken, navigate]);

  return (
    <div className="bg-light set-height">
      <Header />
      <div className="container">
        {loadingPage && <LoadingItem />}
        {addNewGame === true ? (
          <>
            <div className="mt-3 mt-md-3 p-0 pb-2">
              <button className="btn btn-dark" onClick={() => setAddNewGame(false)}>
                Close
              </button>
            </div>
            <PostOneGame
              loadingPage={loadingPage}
              setLoadingPage={setLoadingPage}
              setAddNewGame={setAddNewGame}
            />
          </>
        ) : (
          <div className="mt-3 mt-md-3 p-0">
            <button className="btn btn-dark me-2" onClick={() => setAddNewGame(true)}>
              Add new game
            </button>
          </div>
        )}
      </div>
      <LoadAllGames
        allGames={allGames}
        setAllGames={setAllGames}
        loadingPage={loadingPage}
        setLoadingPage={setLoadingPage}
      />
      <Footer />
    </div>
  );
};

export default UserCollection;
