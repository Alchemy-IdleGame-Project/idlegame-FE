/* eslint-disable no-self-assign */
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
import Detriment from '../components/app/detriment/Detriment';

export default function Game() {
  const [gold, setGold] = useState(444444440);
  const [goldPerSecond, setGoldPerSecond] = useState(1);
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
    arson: { unlocked: false, active: false },
  });

  const goldRequired = {
    lumberyard: 25 * (prestige + 0.1 * 10),
    windmill: 250 * (prestige + 0.1 * 10),
    mine: 2000 * (prestige + 0.1 * 10),
    watermill: 10000 * (prestige + 0.1 * 10),
    sawmill: 50000 * (prestige + 0.1 * 10),
    farm: 100000 * (prestige + 0.1 * 10),
    blacksmith: 500000 * (prestige + 0.1 * 10),
    tavern: 1000000 * (prestige + 0.1 * 10),
    castle: 10000000 * (prestige + 0.1 * 10),
  };
  const revealPercent = 0.66;

  //anytime we refresh make sure to push the state to the DB
  //window.onbeforeunload= ourFunctionToUpdateDB(user);

  function addToClicks() {
    setNumClicks((prevClicks) => ++prevClicks);
  }

  function detrimentRoll() {
    Object.keys(detriment).map((item) => {
      // console.log(detriment);
      // console.log(item);
      if (detriment[item].unlocked && !detriment[item].active) {
        const roll = Math.ceil(Math.random() * 10);
        if (roll >= 8) {
          // console.log(detriment[item]);
          detriment[item].active = true;
          switch (item) {
            case 'termites': {
              setGoldPerSecond((prevGold) => {
                prevGold--;
                return prevGold;
              });
              setActiveTime(gameTime + 5);
              break;
            }
            case 'failedCrops': {
              setGoldPerSecond((prevGold) => {
                prevGold--;
                return prevGold;
              });
              setActiveTime(gameTime + 5);
              break;
            }
            case 'caveIn': {
              setGoldPerSecond((prevGold) => {
                prevGold--;
                return prevGold;
              });
              setActiveTime(gameTime + 5);
              break;
            }
            case 'flood': {
              setGold((prevGold) => {
                prevGold = prevGold - 10000;
                prevGold < 0 ? (prevGold = 0) : (prevGold = prevGold);
                return Math.floor(prevGold);
              });
              setActiveTime(gameTime + 5);
              break;
            }
            case 'osha': {
              setGold((prevGold) => {
                prevGold = prevGold - 50000;
                prevGold < 0 ? (prevGold = 0) : (prevGold = prevGold);
                return Math.floor(prevGold);
              });
              setGoldPerSecond((prevGoldPerSecond) => {
                prevGoldPerSecond = prevGoldPerSecond * 0.8;
                return prevGoldPerSecond;
              });
              setActiveTime(gameTime + 30);
              break;
            }
            case 'peta': {
              setGoldPerSecond((prevGold) => {
                prevGold--;
                return prevGold;
              });
              setActiveTime(gameTime + 5);
              break;
            }
            case 'bandits': {
              setGoldPerSecond((prevGold) => {
                prevGold--;
                return prevGold;
              });
              setActiveTime(gameTime + 5);
              console.log(
                item,
                'insided of roll case',
                goldPerSecond,
                'this is the gold per second'
              );
              break;
            }
            case 'arson': {
              setGoldPerSecond((prevGold) => {
                prevGold--;
                return prevGold;
              });
              setActiveTime(gameTime + 5);
              console.log(
                item,
                'insided of roll case',
                goldPerSecond,
                'this is the gold per second'
              );
              break;
            }
          }
        } else {
          console.log('rolled less than an 8');
        }
      } else if (
        detriment[item].unlocked &&
        detriment[item].active &&
        activeTime === gameTime
      ) {
        switch (item) {
          case 'termites': {
            setGoldPerSecond((prevGold) => {
              prevGold++;
              return prevGold;
            });
            setDetriment({
              ...detriment,
              termites: {
                active: false,
                unlocked: true,
              },
            });
            break;
          }
          case 'failedCrops': {
            setGoldPerSecond((prevGold) => {
              prevGold++;
              return prevGold;
            });
            setDetriment({
              ...detriment,
              failedCrops: {
                active: false,
                unlocked: true,
              },
            });
            break;
          }
          case 'caveIn': {
            setGoldPerSecond((prevGold) => {
              prevGold++;
              return prevGold;
            });
            setDetriment({
              ...detriment,
              caveIn: {
                active: false,
                unlocked: true,
              },
            });
            break;
          }
          case 'flood': {
            setGoldPerSecond((prevGold) => {
              prevGold++;
              return prevGold;
            });
            setDetriment({
              ...detriment,
              flood: {
                active: false,
                unlocked: true,
              },
            });
            break;
          }
          case 'osha': {
            setGoldPerSecond((prevGold) => {
              prevGold++;
              return prevGold;
            });
            setDetriment({
              ...detriment,
              osha: {
                active: false,
                unlocked: true,
              },
            });
            break;
          }
          case 'peta': {
            setGoldPerSecond((prevGold) => {
              prevGold++;
              return prevGold;
            });
            setDetriment({
              ...detriment,
              peta: {
                active: false,
                unlocked: true,
              },
            });
            break;
          }
          case 'bandits': {
            setGoldPerSecond((prevGold) => {
              prevGold++;
              return prevGold;
            });
            setDetriment({
              ...detriment,
              bandits: {
                active: false,
                unlocked: true,
              },
            });
            break;
          }
          case 'arson': {
            setGoldPerSecond((prevGold) => {
              prevGold++;
              return prevGold;
            });
            setDetriment({
              ...detriment,
              arson: {
                active: false,
                unlocked: true,
              },
            });
            break;
          }
        }
        return;
      }
    });
  }

  if (gameTime % 5 === 0) {
    // const currentTime = gameTime;
    detrimentRoll();

    if (gameTime - activeTime >= 5) {
      // console.log(activeTime, 'this is the active time');
      Object.keys(detriment).map((item) => {
        switch (item) {
          case 'termites': {
            setGoldPerSecond(3);
            break;
          }
          case 'failedCrops': {
            setGoldPerSecond(3);
            break;
          }
          case 'caveIn': {
            setGoldPerSecond(3);
            break;
          }
          case 'flood': {
            setGoldPerSecond(3);
            break;
          }
          case 'osha': {
            setGoldPerSecond(3);
            break;
          }
          case 'peta': {
            setGoldPerSecond(3);
            break;
          }
          case 'bandits': {
            setGoldPerSecond(3);
            break;
          }
          case 'arson': {
            setGoldPerSecond(3);
            break;
          }
          default: {
            break;
          }
        }
        if (detriment[item].active) {
          setDetriment({
            ...detriment,
            [item]: {
              ...detriment[item],
              active: false,
            },
          });
        }
      });
    }
  } else {
    // console.log('modulus not 0');
  }

  function mineGold(prestige) {
    setGold((prevGold) => {
      //starts game if one is not going
      if (active === false) {
        setActive(true);
      }

      if (prestige > 0) {
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
            unlocked: true,
          },
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
          failedCrops: {
            active: false,
            unlocked: true,
          },
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
          caveIn: {
            active: false,
            unlocked: true,
          },
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
          flood: {
            active: false,
            unlocked: true,
          },
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
          osha: {
            active: false,
            unlocked: true,
          },
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
          peta: {
            active: false,
            unlocked: true,
          },
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
          bandits: {
            active: false,
            unlocked: true,
          },
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
          arson: {
            active: false,
            unlocked: true,
          },
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

  function incrementPrestige() {
    if (user.castle) {
      setPrestige((prevPrestige) => {
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
        castle: false,
      });
      setGameTime(0);
    }
  }

  return (
    <div>
      <h1>Idle Isle</h1>
      <div className={style.tester}>
        <hr />
        <Prestige
          handlePrestige={incrementPrestige}
          prestige={prestige}
          castle={user.castle}
        />
        <UserControls handleMineClick={mineGold} handleClicks={addToClicks} />
        <Clock gameTime={gameTime} />
        <Gold gold={gold} />
        <Clicks clicks={numClicks} />
      </div>

      <div className={style.bigbam}>
        <Detriment detriment={detriment} />

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
              <li>
                <img width="100px" src="../../assets/gold-coin.png" />
              </li>
            </li>
          </li>
          <li></li>
          <li></li>
          <li></li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li>
            <li>
              <li>
                <img width="100px" src="../../assets/gold-coin.png" />
              </li>
            </li>
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
          <li></li>
          <li>
            <img width="100px" src="../../assets/gold-coin.png" />
          </li>
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
