import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../animations/dice.json'

// This is a function that runs when the page gets data from the API
const LoadingItem = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderSettings: {
      preserverAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="loading-overlay">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default LoadingItem;
