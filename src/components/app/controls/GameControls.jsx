import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useGameStatus } from '../App.jsx';
import style from '../style.css';

const GameControls = ({
  handleMineClick, 
  handleSmithClick, 
  handleClicks, 
  gold, 
  clicks 
}) => {
  const gameStatus = useGameStatus();
  function handleMineButtonClick(){
    handleMineClick();
    handleClicks();
  }
  return <div className={style.controls}>
    <button>New Game</button>
    <button>Save Game</button>
    <button>Load Game</button>
    <br/>
    <button onClick={handleMineButtonClick}>Mine Gold</button>
    <button onClick={handleSmithClick}>Smith</button>
    <p>Current Gold: {gold} </p>
    <p>Num of clicks: {clicks}</p>

  </div>;

};

GameControls.propTypes = {
  gold: PropTypes.number.isRequired,
  clicks: PropTypes.number.isRequired,
  handleClicks: PropTypes.func.isRequired,
  handleMineClick: PropTypes.func.isRequired,
  handleSmithClick: PropTypes.func.isRequired
};

export default GameControls;
