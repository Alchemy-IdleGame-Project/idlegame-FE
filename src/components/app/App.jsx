/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import GameControls from '../app/controls/GameControls';
import Canvas from '../app/canvas/Canvas';
import Clock from './hud/Clock';
import { useInterval } from '../../hooks/hooks.js';

import style from './style.css';

export default function App() {
  const [gold, setGold] = useState(0);
  const [goldPerSecond, setgoldPerSecond] = useState(1);
  const [active, setActive] = useState(false);
  const [numClicks, setNumClicks] = useState(0);
  const [gameTime, setGameTime] = useState(0);
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
    wahoo: '6785099',
  });

  const goldRequired = {
    lumberyard: 25,
    windmill: 250,
    mine: 2000,
    watermill: 10000,
    sawmill: 50000,
    farm: 100000,
    blacksmith: 500000,
    tavern: 1000000,
    castle: 10000000,
  };
  const revealPercent = 0.66;

  //anytime we refresh make sure to push the state to the DB
  //window.onbeforeunload= ourFunctionToUpdateDB(user);

  function addToClicks() {
    setNumClicks((prevClicks) => ++prevClicks);
  }

  function mineGold() {
    setGold((prevGold) => {
      //starts game if one is not going
      if (active === false) {
        setActive(true);
      }
      prevGold += goldPerSecond;
      return prevGold;
    });
  }

  function gameClock() {
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
  // function addgoldPerSecond({ target }) {
  //   switch (target.value) {
  //     case 'lumberyard': {
  //       return setgoldPerSecond(2);
  //     }
  //     case 'windmill': {
  //       return setgoldPerSecond(3);
  //     }
  //     case 'mine': {
  //       return setgoldPerSecond(4);
  //     }
  //     case 'watermill': {
  //       return setgoldPerSecond(5);
  //     }
  //     case 'sawmill': {
  //       return setgoldPerSecond(6);
  //     }
  //     case 'farm': {
  //       return setgoldPerSecond(7);
  //     }
  //     case 'blacksmith': {
  //       return setgoldPerSecond(8);
  //     }
  //     case 'tavern': {
  //       return setgoldPerSecond(9);
  //     }
  //     case 'castle': {
  //       return setgoldPerSecond(10);
  //     }
  //     default: {
  //       break;
  //     }
  //   }
  // }
  //upgrades the gold per second
  // function addGoldPerSecond({ target }) {
  //   switch (target.value) {
  //     case 'lumberyard': {
  //       setgoldPerSecond(2);
  //       return;
  //     }
  //     case 'windmill': {
  //       return setgoldPerSecond(3);
  //     }
  //     case 'mine': {
  //       return setgoldPerSecond(4);
  //     }
  //     case 'watermill': {
  //       return setgoldPerSecond(5);
  //     }
  //     case 'sawmill': {
  //       return setgoldPerSecond(6);
  //     }
  //     case 'farm': {
  //       return setgoldPerSecond(7);
  //     }
  //     case 'blacksmith': {
  //       return setgoldPerSecond(8);
  //     }
  //     case 'tavern': {
  //       return setgoldPerSecond(9);
  //     }
  //     case 'castle': {
  //       return setgoldPerSecond(10);
  //     }
  //     default: {
  //       break;
  //     }
  //   }
  // }

  function unlockBuilding({ target }) {
    switch (target.value) {
      case 'lumberyard': {
        if (gold < goldRequired.lumberyard) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.lumberyard);
        setgoldPerSecond(
          (prevGold) => prevGold + goldRequired.lumberyard * 0.1 - 0.5
        );
        break;
      }
      case 'windmill': {
        if (gold < goldRequired.windmill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.windmill);
        setgoldPerSecond((prevGold) => prevGold + goldRequired.windmill * 0.06);
        break;
      }
      case 'mine': {
        if (gold < goldRequired.mine) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.mine);
        setgoldPerSecond((prevGold) => prevGold + goldRequired.mine * 0.01);
        break;
      }
      case 'watermill': {
        if (gold < goldRequired.watermill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.watermill);
        setgoldPerSecond(
          (prevGold) => prevGold + goldRequired.watermill * 0.003
        );
        break;
      }
      case 'sawmill': {
        if (gold < goldRequired.sawmill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.sawmill);
        setgoldPerSecond((prevGold) => prevGold + goldRequired.sawmill * 0.001);
        break;
      }
      case 'farm': {
        if (gold < goldRequired.farm) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.farm);
        setgoldPerSecond((prevGold) => prevGold + goldRequired.farm * 0.002);
        break;
      }
      case 'blacksmith': {
        if (gold < goldRequired.blacksmith) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.blacksmith);
        setgoldPerSecond(
          (prevGold) => prevGold + goldRequired.blacksmith * 0.001
        );
        break;
      }
      case 'tavern': {
        if (gold < goldRequired.tavern) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.tavern);
        setgoldPerSecond((prevGold) => prevGold + goldRequired.tavern * 0.002);
        break;
      }
      case 'castle': {
        if (gold < goldRequired.castle) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.castle);
        setgoldPerSecond((prevGold) => prevGold + goldRequired.castle * 0.1);
        break;
      }
    }
  }


  return (
    <div className={style.tester}>
      <h1>Coolest Idle Game</h1>
      <br />
      <hr></hr>
      <p>
        <img width="40px" src="../../../assets/coin-icon-3830.png" />
        current gold:
      </p>

      <Clock gameTime={gameTime} />
      <GameControls
        handleMineClick={mineGold}
        handleClicks={addToClicks}
        // handleBuildingClick={addgoldPerSecond}
        // handleSmithSecond={addGoldPerSecond}
        gold={gold}
        revealPercent={revealPercent}
        goldRequired={goldRequired}
        clicks={numClicks}
        unlockBuilding={unlockBuilding}
        user={user}
      />
      <br />
      {/* experimenting with being able to have more properties in the user but not passing properties that arent necessary */}
      <Canvas
        gameTime={gameTime}
        user={{ ...user, wahoo: undefined }}
        active={active}
      />
    </div>
  );
}
