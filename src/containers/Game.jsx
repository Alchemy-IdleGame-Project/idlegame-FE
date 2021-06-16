/* eslint-disable no-self-assign */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import GameControls from '../components/app/controls/GameControls';
import Canvas from '../components/app/canvas/Canvas';
import Clock from '../components/app/hud/Clock';
import { useInterval } from '../hooks/hooks.js';
import style from '../components/app/style.css';
import Prestige from '../components/app/prestige/Prestige';
import Gold from '../components/app/hud/Gold';
import Clicks from '../components/app/hud/Clicks';
import Hud from '../components/app/hud/Hud'
import UserControls from '../components/app/controls/UserControls';
import Detriment from '../components/app/detriment/Detriment';

export default function App() {
  const [gold, setGold] = useState(50000000);
  const [goldPerSecond, setGoldPerSecond] = useState(1);
  const [active, setActive] = useState(false);
  const [numClicks, setNumClicks] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [prestige, setPrestige] = useState(0);

  const [activeTime, setActiveTime] = useState({
    termites: { lastActive: 0, duration: 2 },
    failedCrops: { lastActive: 0, duration: 30 }, 
    caveIn: { lastActive: 0, duration: 30 },
    flood: { lastActive: 0, duration: 30 },
    osha: { lastActive: 0, duration: 30 },
    peta: { lastActive: 0, duration: 30 },
    bandits: { lastActive: 0, duration: 30 },
    arson: { lastActive: 0, duration: 30 } 
  });
  

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
    //maps over each key in the detriment object checking for an unlocked value
    Object.keys(detriment).map(item => {
    //if the prop is unlocked, roll for a chance to activate detriment
      if (detriment[item].unlocked && !detriment[item].active){
        const roll = Math.ceil(Math.random() * 10);
        if (roll >= 8){
          detriment[item].active = true;
          //switch case to put into effect in state, our detriment values
          switch (item) {
            //name of detriment
            case 'termites': {
              console.log('activating termites');
              //detriment effect
              setGoldPerSecond(prevGold => {
                prevGold--;
                return prevGold;
              });
              //time for which the detriment is active
              setActiveTime(prevActive => {
                
                prevActive.termites.lastActive = gameTime;
                return {
                  ...prevActive
                } ;
              });
              console.log(activeTime.termites);
              break;
            }

            case 'failedCrops': {
              setGoldPerSecond(prevGold => {
                prevGold = prevGold - 10;
                return prevGold;
              });
              setActiveTime(gameTime + 5);
              break;
            }

            case 'caveIn': {
              setGoldPerSecond(prevGold => {
                prevGold = prevGold - 20;
                return prevGold;
              });
              setActiveTime(gameTime + 5);
              break;
            }

            case 'flood': {
              setGold(prevGold => {
                
                prevGold = prevGold - 10000;
                ((prevGold < 0) ? prevGold = 0 : prevGold = prevGold);
                return Math.floor(prevGold);
              });
              setActiveTime(gameTime + 5);
              break;
            }

            case 'osha': {
              setGold(prevGold => {
                prevGold = prevGold - 50000;
                ((prevGold < 0) ? prevGold = 0 : prevGold = prevGold);
                return Math.floor(prevGold);
              });
              setGoldPerSecond(prevGoldPerSecond => {
                prevGoldPerSecond = prevGoldPerSecond * .8;
                return prevGoldPerSecond;
              });
              setActiveTime(gameTime + 30);
              break;
            }

            case 'peta': {
              setGoldPerSecond(prevGold => {
                prevGold = prevGold * .9;
                return prevGold;
              });
              setActiveTime(gameTime + 5);
              break;
            }

            case 'bandits': {
              setGoldPerSecond(prevGold => {
                prevGold--;
                return prevGold;
              });
              setActiveTime(gameTime + 5);
              console.log(item, 'insided of roll case', goldPerSecond, 'this is the gold per second');
              break;
            }

            case 'arson': {
              setUser({
                ...user,
                tavern: false
              });
              setActiveTime(gameTime + 5);
              console.log(item, 'insided of roll case', goldPerSecond, 'this is the gold per second');
              break;
            }
            default:{
              break;
            }
          }
        } else {
          console.log('rolled less than an 8');
        }
      } 

      //if the prop is unlocked and detriment is active, set the detriment back to inactive and remove negative effects
      // else if (detriment[item].unlocked && detriment[item].active && gameTime - activeTime[item].duration === activeTime[item].lastActive){

      //   console.log('sdfiupgiherpiuhger');
      //   switch (item){
      //     case 'termites' :{
            
      //         setDetriment({
      //           ...detriment,
      //           termites :  {
      //             active: false,
      //             unlocked: true
      //           }
      //         });
      //         setGoldPerSecond(prevGold => {
      //           prevGold++;
      //           return prevGold;
      //         });
            
      //       break;
      //     }
      //     case 'failedCrops' :{
      //       setDetriment({
      //         ...detriment,
      //         failedCrops :  {
      //           active: false,
      //           unlocked: true
      //         }
      //       });
      //       setGoldPerSecond(prevGold => {
      //         prevGold++;
      //         return prevGold;
      //       });
      //       break;
      //     }
      //     case 'caveIn' :{
      //       setDetriment({
      //         ...detriment,
      //         caveIn :  {
      //           active: false,
      //           unlocked: true
      //         }
      //       });
      //       setGoldPerSecond(prevGold => {
      //         prevGold = prevGold + 20;
      //         return prevGold;
      //       });
      //       break;
      //     }
      //     case 'flood' :{
      //       setDetriment({
      //         ...detriment,
      //         flood :  {
      //           active: false,
      //           unlocked: true
      //         }
      //       });
      //       // setGoldPerSecond(prevGold => {
      //       //   prevGold++;
      //       //   return prevGold;
      //       // });
      //       break;
      //     }
      //     case 'osha' :{
      //       setDetriment({
      //         ...detriment,
      //         osha :  {
      //           active: false,
      //           unlocked: true
      //         }
      //       });
      //       setGoldPerSecond(prevGold => {
      //         prevGold = prevGold * 1.25;
      //         return prevGold;
      //       });
      //       break;
      //     }
      //     case 'peta' :{
      //       setDetriment({
      //         ...detriment,
      //         peta :  {
      //           active: false,
      //           unlocked: true
      //         }
      //       });
      //       setGoldPerSecond(prevGold => {
      //         prevGold = prevGold * 1.112;
      //         return Math.floor(prevGold);
      //       });
      //       break;
      //     }
      //     case 'bandits' :{
      //       setDetriment({
      //         ...detriment,
      //         bandits :  {
      //           active: false,
      //           unlocked: true
      //         }
      //       });
      //       setGoldPerSecond(prevGold => {
      //         prevGold++;
      //         return prevGold;
      //       });
      //       break;
      //     }
      //     case 'arson' :{
      //       setDetriment({
      //         ...detriment,
      //         arson :  {
      //           active: false,
      //           unlocked: true
      //         }
      //       });
      //       setGoldPerSecond(prevGold => {
      //         prevGold++;
      //         return prevGold;
      //       });
      //       break;
      //     }
      //   }
      //   return;
      // }
    });
  }
  

  function shutOffEffect(){
    Object.keys(detriment).map(item => {
      if (detriment[item].unlocked && detriment[item].active && gameTime - activeTime[item].duration === activeTime[item].lastActive){

        // console.log('sdfiupgiherpiuhger');
        switch (item){
          case 'termites' :{
          console.log('shutting off termites');
            setDetriment({
              ...detriment,
              termites :  {
                active: false,
                unlocked: true
              }
            });
            setGoldPerSecond(prevGold => {
              prevGold++;
              return prevGold;
            });
          
            break;
          }
          case 'failedCrops' :{
            setDetriment({
              ...detriment,
              failedCrops :  {
                active: false,
                unlocked: true
              }
            });
            setGoldPerSecond(prevGold => {
              prevGold++;
              return prevGold;
            });
            break;
          }
          case 'caveIn' :{
            setDetriment({
              ...detriment,
              caveIn :  {
                active: false,
                unlocked: true
              }
            });
            setGoldPerSecond(prevGold => {
              prevGold = prevGold + 20;
              return prevGold;
            });
            break;
          }
          case 'flood' :{
            setDetriment({
              ...detriment,
              flood :  {
                active: false,
                unlocked: true
              }
            });
            // setGoldPerSecond(prevGold => {
            //   prevGold++;
            //   return prevGold;
            // });
            break;
          }
          case 'osha' :{
            setDetriment({
              ...detriment,
              osha :  {
                active: false,
                unlocked: true
              }
            });
            setGoldPerSecond(prevGold => {
              prevGold = prevGold * 1.25;
              return prevGold;
            });
            break;
          }
          case 'peta' :{
            setDetriment({
              ...detriment,
              peta :  {
                active: false,
                unlocked: true
              }
            });
            setGoldPerSecond(prevGold => {
              prevGold = prevGold * 1.112;
              return Math.floor(prevGold);
            });
            break;
          }
          case 'bandits' :{
            setDetriment({
              ...detriment,
              bandits :  {
                active: false,
                unlocked: true
              }
            });
            setGoldPerSecond(prevGold => {
              prevGold++;
              return prevGold;
            });
            break;
          }
          case 'arson' :{
            setDetriment({
              ...detriment,
              arson :  {
                active: false,
                unlocked: true
              }
            });
            setGoldPerSecond(prevGold => {
              prevGold++;
              return prevGold;
            });
            break;
          }
          default :{
            break;
          }
        }
      
      }
    });
  }
  useEffect(() => {
    if (gameTime % 3 === 0){
    // const currentTime = gameTime;
      detrimentRoll();
    }
    shutOffEffect();
  }, [gameTime]);
  


  function mineGold(prestige) {
    setGold((prevGold) => {
      //starts game if one is not going
      if (active === false) {
        setActive(true);
      }
      if (prestige > 0){
        prevGold += goldPerSecond;
        return Math.floor(prevGold);
      } else {
        prevGold += goldPerSecond;
        return Math.floor(prevGold);
      }
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


  function unlockBuilding({ target }) {
    switch (target.value) {
      case 'lumberyard': {
        if (gold < goldRequired.lumberyard) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.lumberyard);
        setGoldPerSecond(
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
        if (gold < goldRequired.windmill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.windmill);
        setGoldPerSecond((prevGold) => prevGold + goldRequired.windmill * 0.06);
        setDetriment({
          ...detriment,
          failedCrops : {
            active: false,
            unlocked: true
          }
        });
        break;
      }
      case 'mine': {
        if (gold < goldRequired.mine) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.mine);
        setGoldPerSecond((prevGold) => prevGold + goldRequired.mine * 0.01);
        setDetriment({
          ...detriment,
          caveIn : {
            active: false,
            unlocked: true
          }
        });
        break;
      }
      case 'watermill': {
        if (gold < goldRequired.watermill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.watermill);
        setGoldPerSecond(
          (prevGold) => prevGold + goldRequired.watermill * 0.003
        );
        setDetriment({
          ...detriment,
          flood : {
            active: false,
            unlocked: true
          }
        });
        break;
      }
      case 'sawmill': {
        if (gold < goldRequired.sawmill) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.sawmill);
        setGoldPerSecond((prevGold) => prevGold + goldRequired.sawmill * 0.001);
        setDetriment({
          ...detriment,
          osha : {
            active: false,
            unlocked: true
          }
        });
        break;
      }
      case 'farm': {
        if (gold < goldRequired.farm) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.farm);
        setGoldPerSecond((prevGold) => prevGold + goldRequired.farm * 0.002);
        setDetriment({
          ...detriment,
          peta : {
            active: false,
            unlocked: true
          }
        });
        break;
      }
      case 'blacksmith': {
        if (gold < goldRequired.blacksmith) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.blacksmith);
        setGoldPerSecond(
          (prevGold) => prevGold + goldRequired.blacksmith * 0.001
        );
        setDetriment({
          ...detriment,
          bandits : {
            active: false,
            unlocked: true
          }
        });
        break;
      }
      case 'tavern': {
        if (gold < goldRequired.tavern) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.tavern);
        setGoldPerSecond((prevGold) => prevGold + goldRequired.tavern * 0.002);
        setDetriment({
          ...detriment,
          arson : {
            active: false,
            unlocked: true
          }
        });
        break;
      }
      case 'castle': {
        if (gold < goldRequired.castle) return;
        setUser({
          ...user,
          [target.value]: true,
        });
        setGold((prevGold) => prevGold - goldRequired.castle);
        setGoldPerSecond((prevGold) => prevGold + goldRequired.castle * 0.1);
        break;
      }
    }
  }

  function incrementPrestige(){
    if (user.castle){
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


  
  return (
    <div>
      <h1>Idle Isle</h1>
      <div className={style.tester}>
        <hr/>
        <Prestige handlePrestige={incrementPrestige} prestige={prestige} castle={user.castle}/>
        <UserControls handleMineClick={mineGold}
          handleClicks={addToClicks} />
        <Hud gold={gold} clicks={numClicks} gameTime={gameTime} gPS={goldPerSecond} />
      </div>

      <div className={style.bigbam}>
        <Detriment detriment={detriment}/>

        {/* experimenting with being able to have more properties in the user but not passing properties that arent necessary */}
        <Canvas 
          gameTime={gameTime} 
          user={user} 
          active={active} 
          prestige={prestige}
        />
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
        <ul className={style.circles}>
          <li>
            <li>
              <li><img width="100px"src="../../assets/gold-coin.png"/></li>
            </li>
          </li>
          <li></li>
          <li></li>
          <li>
    
          </li>
          <li><img width="100px"src="../../assets/gold-coin.png"/></li>
          <li><img width="100px"src="../../assets/gold-coin.png"/></li>
          <li><img width="100px"src="../../assets/gold-coin.png"/></li>
          <li><img width="100px"src="../../assets/gold-coin.png"/></li>
          <li><img width="100px"src="../../assets/gold-coin.png"/></li>
          <li><img width="100px"src="../../assets/gold-coin.png"/></li>
          <li>
            <li>
              <li><img width="100px"src="../../assets/gold-coin.png"/></li>
            </li>
          </li>
          <li><img width="100px"src="../../assets/gold-coin.png"/></li>
          <li><img width="100px"src="../../assets/gold-coin.png"/></li>
          <li>
    
          </li>
          <li><img width="100px"src="../../assets/gold-coin.png"/></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      
    </div>
  );
}
