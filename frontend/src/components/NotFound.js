import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './Header';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main className="container-fluid p-0 position-relative">
      <div className="bg-light set-height">
        <Header />
        <div className="container white shadow mt-3 mt-md-5 p-5 d-flex align-items-center text-center">
          <div className="row w-100 align-items-center">
            <div className="col-12 col-md-6">
              <h1 className="errorpage color">404</h1>
            </div>
            <div className="col-12 col-md-6">
              <h5 className="pb-2">This page was not found!</h5>
              <button className="btn orange" onClick={() => navigate('/')}>
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
