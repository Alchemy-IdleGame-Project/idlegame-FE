/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useGameStatus } from '../App.jsx';
import style from '../style.css';

const GameControls = ({
  handleMineClick, 
  handleBuildingClick, 
  handleClicks, 
  gold, 
  clicks,
  unlockBuilding, 
  user
}) => {

  const revealPercent = .66;

  const goldRequired = {
    lumberyard: 25,
    windmill: 250,
    mine: 50,
    watermill: 1500,
    sawmill: 2000,
    farm: 2500,
    blacksmith: 3000,
    tavern: 3500,
    castle: 5000
  };

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
    <button value='blacksmith' onClick={handleBuildingClick}>Smith</button>
    <p>Current Gold: {gold} </p>
    <p>Num of clicks: {clicks}</p>

    
    {/* display for the mine button */}
    {
      (gold > (goldRequired.mine * revealPercent)) ?
        <button 
          className={(gold < goldRequired.mine) ? 
            style.almost : ''} 
          value="mine" 
          onClick={unlockBuilding} 
          disabled={((gold < goldRequired.mine || user.mine) ? 
            true : false)}
        >mine level</button> : ''
    }

    <button value="lumberyard" onClick={unlockBuilding, handleBuildingClick} disabled={((gold < 5 || user.lumberyard) ? true : false) /*|| (user.lumberyard ? true : false)*/}>lumberyard level</button>
    <button value="windmill" onClick={unlockBuilding} disabled={((gold < 5 || user.windmill) ? true : false) /*|| (user.windmill ? true : false)*/}>windmill level</button>
    <button value="watermill" onClick={unlockBuilding} disabled={((gold < 5 || user.watermill) ? true : false) /*|| (user.watermill ? true : false)*/}>watermill level</button>
    <button value="sawmill" onClick={unlockBuilding} disabled={((gold < 5 || user.sawmill) ? true : false) /*|| (user.sawmill ? true : false)*/}>sawmill level</button>
    <button value="farm" onClick={unlockBuilding} disabled={((gold < 5 || user.farm) ? true : false) /*|| (user.farm ? true : false)*/}>farm level</button>
    <button value="blacksmith" onClick={unlockBuilding} disabled={((gold < 5 || user.blacksmith) ? true : false) /*|| (user.blacksmith ? true : false)*/}>blacksmith level</button>
    <button value="tavern" onClick={unlockBuilding} disabled={((gold < 5 || user.tavern) ? true : false) /*|| (user.tavern ? true : false)*/}>tavern level</button>
    <button value="castle" onClick={unlockBuilding} disabled={((gold < 5 || user.castle) ? true : false) /*|| (user.castle ? true : false)*/}>castle level</button>

  </div>;

};

GameControls.propTypes = {
  gold: PropTypes.number.isRequired,
  clicks: PropTypes.number.isRequired,
  handleClicks: PropTypes.func.isRequired,
  handleMineClick: PropTypes.func.isRequired,
  handleBuildingClick: PropTypes.func.isRequired,
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
