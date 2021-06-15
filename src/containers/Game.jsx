/* eslint-disable max-len */
import React, { useState } from 'react';
import GameControls from '../components/app/controls/GameControls';
import Canvas from '../components/app/canvas/Canvas';
import Clock from '../components/app/hud/Clock';
import { useInterval } from '../hooks/hooks.js';
import style from '../components/app/style.css';
import Prestige from '../components/app/prestige/Prestige';
import Gold from '../components/app/hud/Gold';
import Clicks from '../components/app/hud/Clicks';
import UserControls from '../components/app/controls/UserControls';
// import Detriment from '../components/app/detriment/Detriment';

export default function App() {
  const [gold, setGold] = useState(0);
  const [goldPerSecond, setgoldPerSecond] = useState(1);
  const [active, setActive] = useState(false);
  const [numClicks, setNumClicks] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [prestige, setPrestige] = useState(0);
  const [activeTime, setActiveTime] = useState();
  

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

  const [detriment, setDetriment] = useState({
    termites: { unlocked: false, active: false },
    failedCrops: { unlocked: false, active: false }, 
    caveIn: { unlocked: false, active: false },
    flood: { unlocked: false, active: false },
    osha: { unlocked: false, active: false },
    peta: { unlocked: false, active: false },
    bandits: { unlocked: false, active: false },
    arson: { unlocked: false, active: false }
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
  const revealPercent = 0.66;

  //anytime we refresh make sure to push the state to the DB
  //window.onbeforeunload= ourFunctionToUpdateDB(user);

  function addToClicks() {
    setNumClicks((prevClicks) => ++prevClicks);
  }

  function detrimentRoll(){
    // console.log(detriment, ' detriment object');
    Object.keys(detriment).map(item => {
      // console.log([item].value);
      if (detriment[item].unlocked && !detriment[item].active){
        //if detr is active we keep waiting until timeout and set to not active, if its not active we proceed and roll to maybe set active
        // if (!detriment[item].active){
          switch (item) {
            case 'termites' : {
              const roll = Math.ceil(Math.random() * 10);
              if (roll > 7.9){
                setDetriment({
                  ...detriment,
                  [item] :{
                    ...detriment[item],
                    active : true
                  }
                });
                setgoldPerSecond(2);
                setGold(prevGold => {
                  prevGold - 100;
                  return prevGold;
                });
                setActiveTime(gameTime);
                // setTimeout(setgoldPerSecond(prevGoldPerSecond => {
                  //   prevGoldPerSecond = prevGoldPerSecond + 1;
                  //   return prevGoldPerSecond;
                  // }), 5000);
                }
                // console.log(goldPerSecond, 'should be two now');
            }
          }
        // }
      } else if (detriment[item].active && gameTime - activeTime >= 5) {
        console.log(...item);
        setDetriment({
          ...detriment,
          item:{
            ...[item],
            active: false
          }
        });
      }
    });
  }
  

  function mineGold(prestige) {
    
    setGold((prevGold) => {
      //starts game if one is not going
      if(active === false) {
        setActive(true);
      }

      if(prestige > 0){
        prevGold += goldPerSecond;
        return prevGold;
      } else {
        prevGold += goldPerSecond;
        return prevGold;
      }

    });
  }

  function gameClock() {
    setGameTime((prevTime) => {
      prevTime++;
      return prevTime;
    });
  }

  if (gameTime % 5 === 0){
    // const currentTime = gameTime;
    detrimentRoll();
    
    // console.log(gameTime);
    // console.log('fires every 3 seconds');
    if (gameTime - activeTime >= 5){
      // console.log(activeTime, 'this is the active time');
      Object.keys(detriment).map(item => {
        console.log(item, 'iofphdgsuidfgn');
        switch(item){
          case 'termites' :{
            setgoldPerSecond(3);
          }
            if (detriment[item].active){
              setDetriment({
                ...detriment,
                [item] :{
                  ...detriment[item],
                  active : false
                }
              });
  
            }

        }
      });
     
    }
  } else {
    console.log('modulus not 0');
  }

  
  //starts the mine gold per second loop on load
  useInterval(mineGold, 1000);

  //starts the gameClock
  useInterval(gameClock, 1000);


  function unlockBuilding({ target }) {
    switch(target.value) {
      case 'lumberyard': {
        if(gold < goldRequired.lumberyard) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.lumberyard);
        setgoldPerSecond(
          (prevGold) => prevGold + goldRequired.lumberyard * 0.1 - 0.5
        );
        setDetriment({
          ...detriment,
          termites: {
            active: false,
            unlocked: true
          }
        });
        break;
      }
      case 'windmill': {
        if(gold < goldRequired.windmill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.windmill);
        setgoldPerSecond((prevGold) => prevGold + goldRequired.windmill * 0.06);
        setDetriment({
          failedCrops : {
            unlocked: true
          }
        });
        break;
      }
      case 'mine': {
        if(gold < goldRequired.mine) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.mine);
        setgoldPerSecond((prevGold) => prevGold + goldRequired.mine * 0.01);
        setDetriment({
          caveIn : {
            unlocked: true
          }
        });
        break;
      }
      case 'watermill': {
        if(gold < goldRequired.watermill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.watermill);
        setgoldPerSecond(
          (prevGold) => prevGold + goldRequired.watermill * 0.003
        );
        setDetriment({
          flood : {
            unlocked: true
          }
        });
        break;
      }
      case 'sawmill': {
        if(gold < goldRequired.sawmill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.sawmill);
        setgoldPerSecond((prevGold) => prevGold + goldRequired.sawmill * 0.001);
        setDetriment({
          osha : {
            unlocked: true
          }
        });
        break;
      }
      case 'farm': {
        if(gold < goldRequired.farm) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.farm);
        setgoldPerSecond((prevGold) => prevGold + goldRequired.farm * 0.002);
        setDetriment({
          peta : {
            unlocked: true
          }
        });
        break;
      }
      case 'blacksmith': {
        if(gold < goldRequired.blacksmith) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.blacksmith);
        setgoldPerSecond(
          (prevGold) => prevGold + goldRequired.blacksmith * 0.001
        );
        setDetriment({
          bandits : {
            unlocked: true
          }
        });
        break;
      }
      case 'tavern': {
        if(gold < goldRequired.tavern) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.tavern);
        setgoldPerSecond((prevGold) => prevGold + goldRequired.tavern * 0.002);
        setDetriment({
          arson : {
            unlocked: true
          }
        });
        break;
      }
      case 'castle': {
        if(gold < goldRequired.castle) return;
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
    <div >
      <div className={style.tester}>
        <h1>Idle Isle</h1>
        <br />
        <hr></hr>
        <Prestige handlePrestige={incrementPrestige} prestige={prestige} castle={user.castle}/>
        <UserControls handleMineClick={mineGold}
          handleClicks={addToClicks} />
        <Clock gameTime={gameTime} />
        <Gold gold={gold} />
        <Clicks clicks={numClicks} />
      
        <br />

      </div>
      {/* <Detriment detriment={detriment}/> */}
      {/* experimenting with being able to have more properties in the user but not passing properties that arent necessary */}
      <Canvas 
        gameTime={gameTime} 
        user={{ ...user, wahoo : undefined }} 
        active={active} 
        prestige={prestige}
      />
      <div className={style.bigbam}>
        <GameControls 
          handleMineClick={mineGold}
          handleClicks={addToClicks}
          gold={gold}
          revealPercent={revealPercent}
          goldRequired={goldRequired}
          clicks={numClicks}
          unlockBuilding={unlockBuilding}
          user={user}
        />
      </div>
    </div>
  );
}
