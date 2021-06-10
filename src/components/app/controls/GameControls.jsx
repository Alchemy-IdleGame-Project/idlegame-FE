/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useGameStatus } from '../App.jsx';
import style from '../style.css';

const GameControls = ({
  handleMineClick, 
  handleSmithClick, 
  handleClicks, 
  gold, 
  clicks,
  unlockBuilding, 
  user
}) => {
  
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

    
    {
    (gold > (10 * .66)) ?
      <button value="mine" onClick={unlockBuilding} 
        disabled={((gold < 10 || user.mine) ? true : false) /*|| (user.mine ? true : false)*/}>mine level</button> : ''
    }

  </div>;

};

GameControls.propTypes = {
  gold: PropTypes.number.isRequired,
  clicks: PropTypes.number.isRequired,
  handleClicks: PropTypes.func.isRequired,
  handleMineClick: PropTypes.func.isRequired,
  handleSmithClick: PropTypes.func.isRequired,
  unlockBuilding: PropTypes.func.isRequired,
  user: PropTypes.shape({
    house: PropTypes.bool.isRequired,
    lumberyard: PropTypes.bool.isRequired,
    windmill: PropTypes.bool.isRequired,
    mine: PropTypes.bool.isRequired,
    watermill: PropTypes.bool.isRequired,
    sawmill: PropTypes.bool.isRequired,
    farm: PropTypes.bool.isRequired,
    blacksmith: PropTypes.bool.isRequired,
    tavern: PropTypes.bool.isRequired,
    castle: PropTypes.bool.isRequired,
  }).isRequired,
};

export default GameControls;
