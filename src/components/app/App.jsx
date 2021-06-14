/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import GameControls from '../app/controls/GameControls';
import Canvas from '../app/canvas/Canvas';
import Clock from './hud/Clock';
import { useInterval } from '../../hooks/hooks.js';
import style from './style.css';
import Prestige from '../app/prestige/Prestige';
import Gold from '../app/hud/Gold';
import Clicks from '../app/hud/Clicks';

export default function App() {

  
  const [gold, setGold] = useState(0);
  const [goldPerClick, setGoldPerClick] = useState(1);
  const [goldPerSecond, setGoldPerSecond] = useState(1);
  const [active, setActive] = useState(false);
  const [numClicks, setNumClicks] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [prestige, setPrestige] = useState(0);

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
    castle: false,
    wahoo: '6785099'
  });

  const goldRequired = {
    lumberyard: 25 * (prestige + .1 * 10),
    windmill: 250 * (prestige + .1 * 10),
    mine: 2000 * (prestige + .1 * 10),
    watermill: 10000 * (prestige + .1 * 10),
    sawmill: 50000 * (prestige + .1 * 10),
    farm: 100000 * (prestige + .1 * 10),
    blacksmith: 500000 * (prestige + .1 * 10),
    tavern: 1000000 * (prestige + .1 * 10),
    castle: 10000000 * (prestige + .1 * 10)
  };
  const revealPercent = .66;


  //anytime we refresh make sure to push the state to the DB
  //window.onbeforeunload= ourFunctionToUpdateDB(user);

  function addToClicks() {
    setNumClicks((prevClicks) => ++prevClicks);
  }

  function mineGold(prestige) {
    const prestigeMultiplier = prestige * .1;
    setGold((prevGold) => {
      //starts game if one is not going
      if(active === false) {
        setActive(true);
      }
      if(prestige > 0){
        prevGold += (goldPerClick * prestigeMultiplier);
        return prevGold;
      } else {
        prevGold += goldPerClick;
        return prevGold;
      }
    });
  }

  function gameClock(){
    setGameTime((prevTime) => {
      prevTime++;
      return prevTime;
    });
  }



  

  //starts the mine gold per second loop on load
  useInterval(mineGold, 1000);

  //starts the gameClock
  useInterval(gameClock, 1000);

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
        setGoldPerClick((prevGold) => prevGold + (goldRequired.lumberyard * .1) - .5);
        break;
      }
      case 'windmill': {
        if(gold < goldRequired.windmill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.windmill);
        setGoldPerClick((prevGold) => prevGold + (goldRequired.windmill * .06));
        break;
      }
      case 'mine': {
        if(gold < goldRequired.mine) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.mine);
        setGoldPerClick((prevGold) => prevGold + (goldRequired.mine * .01));
        break;
      }
      case 'watermill': {
        if(gold < goldRequired.watermill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.watermill);
        setGoldPerClick((prevGold) => prevGold + (goldRequired.watermill * .003));
        break;
      }
      case 'sawmill': {
        if(gold < goldRequired.sawmill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.sawmill);
        setGoldPerClick((prevGold) => prevGold + (goldRequired.sawmill * .001));
        break;
      }
      case 'farm': {
        if(gold < goldRequired.farm) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.farm);
        setGoldPerClick((prevGold) => prevGold + (goldRequired.farm * .002));
        break;
      }
      case 'blacksmith': {
        if(gold < goldRequired.blacksmith) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.blacksmith);
        setGoldPerClick((prevGold) => prevGold + (goldRequired.blacksmith * .001));
        break;
      }
      case 'tavern': {
        if(gold < goldRequired.tavern) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.tavern);
        setGoldPerClick((prevGold) => prevGold + (goldRequired.tavern * .002));
        break;
      }
      case 'castle': {
        if(gold < goldRequired.castle) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.castle);
        setGoldPerClick((prevGold) => prevGold + (goldRequired.castle * .1));
        break;
      }
    }
  }

  function incrementPrestige(){
    if(user.castle){
      setPrestige(prevPrestige => {
        prevPrestige++;
        return prevPrestige;
      });
      setUser({
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
      setGameTime(0);
    }
  }


  const user1 = {
    ...user
  };
  delete user1.wahoo;

  return (
    
    <div className={style.tester}>
     
      <h1>Coolest Idle Game</h1><br/>
      <hr></hr>
      <Prestige handlePrestige={incrementPrestige} prestige={prestige} castle={user.castle}/>
      <Clock gameTime={gameTime} />
      <Gold gold={gold} />
      <Clicks clicks={numClicks} />
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
      {/* experimenting with being able to have more properties in the user but not passing properties that arent necessary */}
      <Canvas gameTime={gameTime} user={{ ...user, wahoo : undefined }} active={active} prestige={prestige}/>
     
    </div>
  );
}
