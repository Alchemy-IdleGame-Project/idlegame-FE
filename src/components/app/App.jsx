/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import GameControls from '../app/controls/GameControls';
import Canvas from '../app/canvas/Canvas';

import style from './style.css';

export const useGameStatus = (init) => {
  const [gold, setGold] = useState(init);
  const [goldPerClick, setGoldPerClick] = useState(1);
  const [active, setActive] = useState(false);
  const [activeUser, setActiveUser] = useState();
  const [signInPrompt, setSignInPrompt] = useState(false); 
  const [numClicks, setNumClicks] = useState(0);

  const [save, setSave] = useState('');
  
  function addToClicks(){
    setNumClicks((prevClicks) => ++prevClicks);
  }
  function mineGold(){
    setGold((prevGold) => {
      console.log(active);
      //starts game if one is not going
      if(!active) {
        console.log(active, 'active');
        setActive(true);
    
      }
      prevGold += goldPerClick;
      return prevGold;
    });
  }

  function userAutoSave(){
    const user = localStorage.getItem('user'); 
    return (!user ? 
      //if there is not a user, show login prompt in addition to game
      setSignInPrompt(true)
      : setActiveUser(user));
  }
  
  useEffect(() => {
    if(active){
      setInterval(mineGold, 1000);
      userAutoSave();
    }
  }, []);

  useEffect(() => {
    if(active){
      setInterval(mineGold, 1000);
    }
  }, [active]);
  
  //upgrades the gold per click
  function addGoldPerClick(/*buildType*/){
    if(gold > 25){
      return setGoldPerClick(5);
    }
    console.log('not enough gold');
    // switch(buildType) {
    //   case 'smith' : {
    //     return setGoldPerClick(5);
    //   }
    //   case 'lumber' : {
    //     return setGoldPerClick(2);
    //   }
    //   default : {
    //     break;
    //   }
    // }
  } 


  return { gold, numClicks, addToClicks,  mineGold, addGoldPerClick };
};

export default function App() {
  const { gold, numClicks, addToClicks,  mineGold, addGoldPerClick } = useGameStatus(0);
  return (
    
    <>
      <GameControls 
      handleMineClick={mineGold}
      handleClicks={addToClicks} 
      handleSmithClick={addGoldPerClick} 
      gold={gold} 
      clicks={numClicks} />
      <h1>Coolest Idle Game</h1>
      <p>current gold is { gold }</p>
      <Canvas />
      
    </>
  );
}
