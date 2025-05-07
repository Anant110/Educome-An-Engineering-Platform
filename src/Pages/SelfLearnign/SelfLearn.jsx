import React from 'react';
import './SelfLearn.css';
import Queries from '../ChatBot/Queries/Queries';
import Lottie from 'lottie-react';
import animationData3 from '../../Components/Animations/LottieAnimatedIcons/Animation - 1721144826752.json';

function SelfLearn() {
  return (
        <div className="container-1">
      <div className="queries">
        <Queries />
      </div>
    </div>
  )
}

export default SelfLearn