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
    lumberyard: true,
    windmill: true,
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
    return;
  }

  function mineGold() {
    setGold((prevGold) => {
      //starts game if one is not going
      // if(!active) {
      //   setActive(true);
      // }
      const newGold = prevGold + goldPerClick;
      return newGold;
    });
  }
  useInterval(mineGold, 1000);
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


  //upgrades the gold per click
  function addGoldPerClick(/*buildType*/) {
    if(gold > 25) {
      return setGoldPerClick(5);
    }

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
  //upgrades the gold per second
  function addGoldPerSecond({ target }){
    if(gold > 25){
      return setGoldPerClick(5);
    }
    
    // switch(target.value) {
    //   case 'lumberyard' : {
    //     return setGoldPerClick(5);
    //   }
    //   case 'windmill' : {
    //     return setGoldPerClick(2);
    //   }
    //   case 'mine' : {
    //     return setGoldPerClick(2);
    //   }
    //   case 'watermill' : {
    //     return setGoldPerClick(2);
    //   }
    //   case 'sawmill' : {
    //     return setGoldPerClick(2);
    //   }
    //   case 'farm' : {
    //     return setGoldPerClick(2);
    //   }
    //   case 'blacksmith' : {
    //     return setGoldPerClick(2);
    //   }
    //   case 'windmill' : {
    //     return setGoldPerClick(2);
    //   }
    //   default : {
    //     break;
    //   }
    // }
  } 

  function unlockBuilding({ target }) {
    setUser(prevUser => ({
      ...prevUser,
      [target.value]: true,
    }));
    // switch(target.value) {
    //   case 'smith': {
    //     break;
    //   }
    //   case 'mine': {
    //     setGold((prevGold) => prevGold - 5);
    //     break;
    //   }
    // }
    return;
  }

  return (
    <div className={style.tester}>
      <h1>Coolest Idle Game</h1><br/>
      <p><img width="40px" src="../../../assets/coin-icon-3830.png"></img>current gold is { gold }</p>
      <GameControls 
        handleMineClick={mineGold}
        handleClicks={addToClicks} 
        handleSmithClick={addGoldPerClick} 
        handleSmithSecond={addGoldPerSecond} 
        gold={gold} 

        clicks={numClicks}
        unlockBuilding={unlockBuilding}
        user={user}
      />
      <Canvas user={user} />
    </div>
  );
}
