/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import GameControls from '../app/controls/GameControls';
import Canvas from '../app/canvas/Canvas';
import { useInterval } from '../../hooks/hooks.js';

import style from './style.css';

export default function App() {

  
  const [gold, setGold] = useState(0);
  const [goldPerClick, setGoldPerClick] = useState(1);
  const [goldPerSecond, setGoldPerSecond] = useState(1);
  const [active, setActive] = useState(false);
  const [numClicks, setNumClicks] = useState(0);
  // const [activeUser, setActiveUser] = useState();
  // const [signInPrompt, setSignInPrompt] = useState(false); 
  // const [save, setSave] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState({
    house: true,
    lumberyard: false,
    windmill: false,
    mine: false,
    watermill: false,
    sawmill: false,
    farm: false,
    blacksmith: false,
    tavern: false,
    castle: false
  });

  const goldRequired = {
    lumberyard: 25,
    windmill: 250,
    mine: 500,
    watermill: 1500,
    sawmill: 2000,
    farm: 2500,
    blacksmith: 3000,
    tavern: 3500,
    castle: 5000
  };
  const revealPercent = .66;


  //anytime we refresh make sure to push the state to the DB
  //window.onbeforeunload= ourFunctionToUpdateDB(user);

  function addToClicks() {
    setNumClicks((prevClicks) => ++prevClicks);
  }

  function mineGold() {
    setGold((prevGold) => {
      //starts game if one is not going
      if(!active) {
        setActive(true);
      }
      prevGold += goldPerClick;
      return prevGold;
    });
}

  /*
  function userAutoSave(){
    const user = localStorage.getItem('user'); 
    return (!user ? 
      //if there is not a user, show login prompt in addition to game
      setSignInPrompt(true)
      : setActiveUser(user));
  }
  
  useEffect(() => {
    if(active){
      useInterval(mineGold, 1000);
      // userAutoSave();
    }
  }, []);

  useEffect(() => {
    if(active){
      useInterval(mineGold, 1000);
    }
  }, [active]);
 */


  //starts the mine gold per second loop on load
  useInterval(mineGold, 1000);

  //upgrades the gold per click
  function addGoldPerClick({ target }) {
    switch(target.value) {
      case 'lumberyard' : {
        return setGoldPerClick(2);
      }
      case 'windmill' : {
        return setGoldPerClick(3);
      }
      case 'mine' : {
        return setGoldPerClick(4);
      }
      case 'watermill' : {
        return setGoldPerClick(5);
      }
      case 'sawmill' : {
        return setGoldPerClick(6);
      }
      case 'farm' : {
        return setGoldPerClick(7);
      }
      case 'blacksmith' : {
        return setGoldPerClick(8);
      }
      case 'tavern' : {
        return setGoldPerClick(9);
      }
      case 'castle' : {
        return setGoldPerClick(10);
      }
      default : {
        break;
      }
    }
  } 
  //upgrades the gold per second
  function addGoldPerSecond({ target }){
    switch(target.value) {
      case 'lumberyard' : {
        setGoldPerClick(2);
        return;
      }
      case 'windmill' : {
        return setGoldPerClick(3);
      }
      case 'mine' : {
        return setGoldPerClick(4);
      }
      case 'watermill' : {
        return setGoldPerClick(5);
      }
      case 'sawmill' : {
        return setGoldPerClick(6);
      }
      case 'farm' : {
        return setGoldPerClick(7);
      }
      case 'blacksmith' : {
        return setGoldPerClick(8);
      }
      case 'tavern' : {
        return setGoldPerClick(9);
      }
      case 'castle' : {
        return setGoldPerClick(10);
      }
      default : {
        break;
      }
    }
  } 

  function unlockBuilding({ target }) {
    switch(target.value) {
      case 'lumberyard': {
        if(gold < goldRequired.lumberyard) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.lumberyard);
        break;
      }
      case 'windmill': {
        if(gold < goldRequired.windmill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.windmill);
        break;
      }
      case 'mine': {
        if(gold < goldRequired.mine) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.mine);
        break;
      }
      case 'watermill': {
        if(gold < goldRequired.watermill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.watermill);
        break;
      }
      case 'sawmill': {
        if(gold < goldRequired.sawmill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.sawmill);
        break;
      }
      case 'farm': {
        if(gold < goldRequired.farm) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.farm);
        break;
      }
      case 'blacksmith': {
        if(gold < goldRequired.blacksmith) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.blacksmith);
        break;
      }
      case 'tavern': {
        if(gold < goldRequired.tavern) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.tavern);
        break;
      }
      case 'castle': {
        if(gold < goldRequired.castle) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.castle);
        break;
      }
    }
  }

  return (
    <div className={style.tester}>
      <h1>Coolest Idle Game</h1><br/>
      <hr></hr>
      <p>
        <img width="40px" src="../../../assets/coin-icon-3830.png"/>
          current gold: 
      </p> 
      <GameControls 
        handleMineClick={mineGold}
        handleClicks={addToClicks} 
        handleBuildingClick={addGoldPerClick} 
        handleSmithSecond={addGoldPerSecond} 
        gold={gold} 
        revealPercent={revealPercent}
        goldRequired={goldRequired}
        clicks={numClicks}
        unlockBuilding={unlockBuilding}
        user={user}
      />
      <br/>
      <Canvas user={user} active={active}/>
    </div>
  );
}
