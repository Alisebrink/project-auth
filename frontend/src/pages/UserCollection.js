import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PostOneGame from '../components/PostOneGame';
import LoadAllGames from '../components/LoadAllGames';
import Header from '../components/Header'
import Footer from '../components/Footer';

const UserCollection = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const [addNewGame, setAddNewGame] = useState('true');
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/signin');
    }
  }, [accessToken, navigate]);

  return (
    <div className="bg-light set-height">
     <Header/>
      <div className="container">
        {addNewGame === 'false' ? (
          <PostOneGame setAddNewGame={setAddNewGame} />
        ) : (
          
          <div className="mt-3 mt-md-5 p-0"><button className="btn btn-dark" onClick={() => setAddNewGame('false')}>
            Add new game
          </button></div>
        )}
      </div>
      <LoadAllGames />
      <Footer/>
    </div>
  );
};

export default UserCollection;
