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
    // if (gold > 25) {
    //   return setGoldPerClick(5);
    // }

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
    // if(gold > 25){
    //   return setGoldPerClick(5);
    // }
    
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

  function unlockBuilding({ target }) {
    setUser({
      ...user,
      [target.value]: true,
    });

    switch(target.value) {
      case 'mine': {
        setGold((prevGold) => prevGold - 5);
        break;
      }
      case 'lumberyard': {
        setGold((prevGold) => prevGold - 5);
        break;
      }
      case 'windmill': {
        setGold((prevGold) => prevGold - 5);
        break;
      }
      case 'watermill': {
        setGold((prevGold) => prevGold - 5);
        break;
      }
      case 'sawmill': {
        setGold((prevGold) => prevGold - 5);
        break;
      }
      case 'farm': {
        setGold((prevGold) => prevGold - 5);
        break;
      }
      case 'blacksmith': {
        setGold((prevGold) => prevGold - 5);
        break;
      }
      case 'tavern': {
        setGold((prevGold) => prevGold - 5);
        break;
      }
      case 'castle': {
        setGold((prevGold) => prevGold - 5);
        break;
      }
    }
  }

  return (
    <div className={style.tester}>
      <h1>Coolest Idle Game</h1><br/>
      <hr></hr>
      <p>
        <img width='40px' src='../../../assets/coin-icon-3830.png'/>
          current gold: 
      </p> 
      <GameControls 
        handleMineClick={mineGold}
        handleClicks={addToClicks} 
        handleBuildingClick={addGoldPerClick} 
        handleSmithSecond={addGoldPerSecond} 
        gold={gold} 

        clicks={numClicks}
        unlockBuilding={unlockBuilding}
        user={user}
      />
      <br/>
      <Canvas user={user} active={active}/>
    </div>
  );
}
