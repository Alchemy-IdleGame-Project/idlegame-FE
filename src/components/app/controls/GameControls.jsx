/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useGameStatus } from '../App.jsx';
import style from '../style.css';

const GameControls = ({
  handleMineClick, 
  handleClicks, 
  gold, 
  clicks,
  unlockBuilding, 
  user
}) => {

  const revealPercent = .66;

  const goldRequired = {
    lumberyard: 5,
    mine: 10,
    windmill: 15,
    watermill: 20,
    sawmill: 25,
    farm: 30,
    blacksmith: 35,
    tavern: 40,
    castle: 45
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
    <p>Current Gold: {gold} </p>
    <p>Number of Clicks: {clicks}</p>

    
    {/* display for the mine button */}
    {
      (gold > (goldRequired.lumberyard * revealPercent)) ?
        <button className={(gold < goldRequired.lumberyard) ? style.almost : ''} value="lumberyard" onClick={unlockBuilding} 
          disabled={((gold < goldRequired.lumberyard || user.lumberyard) ? true : false)}>Purchase Lumberyard (5g)</button> : ''
    }
    {
      (gold > (goldRequired.mine * revealPercent)) ?
        <button className={(gold < goldRequired.mine) ? style.almost : ''} value="mine" onClick={unlockBuilding} 
          disabled={((gold < goldRequired.mine || user.mine) ? true : false)}>Purchase Mine (10g)</button> : ''
    }
    {
      (gold > (goldRequired.windmill * revealPercent)) ?
        <button className={(gold < goldRequired.windmill) ? style.almost : ''} value="windmill" onClick={unlockBuilding} 
          disabled={((gold < goldRequired.windmill || user.windmill) ? true : false)}>Purchase Windmill (15g)</button> : ''
    }
    {
      (gold > (goldRequired.watermill * revealPercent)) ?
        <button className={(gold < goldRequired.watermill) ? style.almost : ''} value="watermill" onClick={unlockBuilding} 
          disabled={((gold < goldRequired.watermill || user.watermill) ? true : false)}>Purchase Watermill (20g)</button> : ''
    }
    {
      (gold > (goldRequired.sawmill * revealPercent)) ?
        <button className={(gold < goldRequired.sawmill) ? style.almost : ''} value="sawmill" onClick={unlockBuilding} 
          disabled={((gold < goldRequired.sawmill || user.sawmill) ? true : false)}>Purchase Sawmill (25g)</button> : ''
    }
    {
      (gold > (goldRequired.farm * revealPercent)) ?
        <button className={(gold < goldRequired.farm) ? style.almost : ''} value="farm" onClick={unlockBuilding} 
          disabled={((gold < goldRequired.farm || user.farm) ? true : false)}>Purchase Farm (30g)</button> : ''
    }
    {
      (gold > (goldRequired.blacksmith * revealPercent)) ?
        <button className={(gold < goldRequired.blacksmith) ? style.almost : ''} value="blacksmith" onClick={unlockBuilding} 
          disabled={((gold < goldRequired.blacksmith || user.blacksmith) ? true : false)}>Purchase Blacksmith (35g)</button> : ''
    }
    {
      (gold > (goldRequired.tavern * revealPercent)) ?
        <button className={(gold < goldRequired.tavern) ? style.almost : ''} value="tavern" onClick={unlockBuilding} 
          disabled={((gold < goldRequired.tavern || user.tavern) ? true : false)}>Purchase Tavern (40g)</button> : ''
    }
    {
      (gold > (goldRequired.castle * revealPercent)) ?
        <button className={(gold < goldRequired.castle) ? style.almost : ''} value="castle" onClick={unlockBuilding} 
          disabled={((gold < goldRequired.castle || user.castle) ? true : false)}>Purchase Castle (45g)</button> : ''
    }

  </div>;

};

GameControls.propTypes = {
  gold: PropTypes.number.isRequired,
  clicks: PropTypes.number.isRequired,
  handleClicks: PropTypes.func.isRequired,
  handleMineClick: PropTypes.func.isRequired,
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
